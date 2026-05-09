// Shopify Storefront API client + helpers
// API version 2025-07 (required)

export const SHOPIFY_API_VERSION = "2025-07";
export const SHOPIFY_STORE_PERMANENT_DOMAIN = "b1n0vv-nt.myshopify.com";
export const SHOPIFY_STOREFRONT_URL = `https://${SHOPIFY_STORE_PERMANENT_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`;
export const SHOPIFY_STOREFRONT_TOKEN = "52061f4fbc19b021f9216bebb7f2a9ec";

/* ============================================================
 * Types
 * ============================================================ */

export interface ShopifyImage {
  url: string;
  altText: string | null;
}

export interface ShopifyMoney {
  amount: string;
  currencyCode: string;
}

export interface ShopifyVariant {
  id: string;
  title: string;
  price: ShopifyMoney;
  availableForSale: boolean;
  selectedOptions: Array<{ name: string; value: string }>;
}

export interface ShopifyProductNode {
  id: string;
  title: string;
  description: string;
  handle: string;
  priceRange: { minVariantPrice: ShopifyMoney };
  images: { edges: Array<{ node: ShopifyImage }> };
  variants: { edges: Array<{ node: ShopifyVariant }> };
  options: Array<{ name: string; values: string[] }>;
}

export interface ShopifyProduct {
  node: ShopifyProductNode;
}

/* ============================================================
 * Storefront API request helper
 * ============================================================ */

export async function storefrontApiRequest<T = any>(
  query: string,
  variables: Record<string, any> = {},
): Promise<{ data?: T; errors?: any } | undefined> {
  const response = await fetch(SHOPIFY_STOREFRONT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });

  if (response.status === 402) {
    console.error("Shopify: Payment required — upgrade your Shopify plan.");
    return;
  }

  if (!response.ok) {
    throw new Error(`Shopify API error: ${response.status}`);
  }

  const json = await response.json();
  if (json.errors) {
    throw new Error(`Shopify error: ${json.errors.map((e: any) => e.message).join(", ")}`);
  }
  return json;
}

/* ============================================================
 * Product queries
 * ============================================================ */

const PRODUCT_FRAGMENT = `
  id
  title
  description
  handle
  priceRange { minVariantPrice { amount currencyCode } }
  images(first: 8) {
    edges { node { url altText } }
  }
  variants(first: 50) {
    edges {
      node {
        id
        title
        price { amount currencyCode }
        availableForSale
        selectedOptions { name value }
      }
    }
  }
  options { name values }
`;

const PRODUCTS_QUERY = `
  query GetProducts($first: Int!, $query: String) {
    products(first: $first, query: $query) {
      edges { node { ${PRODUCT_FRAGMENT} } }
    }
  }
`;

const PRODUCT_BY_HANDLE_QUERY = `
  query GetProductByHandle($handle: String!) {
    productByHandle(handle: $handle) { ${PRODUCT_FRAGMENT} }
  }
`;

export async function fetchProducts(first = 50, query?: string): Promise<ShopifyProduct[]> {
  const result = await storefrontApiRequest<{ products: { edges: ShopifyProduct[] } }>(
    PRODUCTS_QUERY,
    { first, query },
  );
  return result?.data?.products?.edges ?? [];
}

export async function fetchProductByHandle(handle: string): Promise<ShopifyProductNode | null> {
  const result = await storefrontApiRequest<{ productByHandle: ShopifyProductNode | null }>(
    PRODUCT_BY_HANDLE_QUERY,
    { handle },
  );
  return result?.data?.productByHandle ?? null;
}

/* ============================================================
 * Cart mutations
 * ============================================================ */

const CART_QUERY = `
  query cart($id: ID!) {
    cart(id: $id) { id totalQuantity }
  }
`;

const CART_CREATE_MUTATION = `
  mutation cartCreate($input: CartInput!) {
    cartCreate(input: $input) {
      cart {
        id
        checkoutUrl
        lines(first: 100) { edges { node { id merchandise { ... on ProductVariant { id } } } } }
      }
      userErrors { field message }
    }
  }
`;

const CART_LINES_ADD_MUTATION = `
  mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        id
        lines(first: 100) { edges { node { id merchandise { ... on ProductVariant { id } } } } }
      }
      userErrors { field message }
    }
  }
`;

const CART_LINES_UPDATE_MUTATION = `
  mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart { id }
      userErrors { field message }
    }
  }
`;

const CART_LINES_REMOVE_MUTATION = `
  mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart { id }
      userErrors { field message }
    }
  }
`;

export function formatCheckoutUrl(checkoutUrl: string): string {
  try {
    const url = new URL(checkoutUrl);
    url.searchParams.set("channel", "online_store");
    return url.toString();
  } catch {
    return checkoutUrl;
  }
}

function isCartNotFoundError(userErrors: Array<{ message: string }>): boolean {
  return userErrors.some(
    (e) =>
      e.message.toLowerCase().includes("cart not found") ||
      e.message.toLowerCase().includes("does not exist"),
  );
}

export async function createShopifyCart(variantId: string, quantity: number) {
  const data = await storefrontApiRequest(CART_CREATE_MUTATION, {
    input: { lines: [{ quantity, merchandiseId: variantId }] },
  });
  const result = data?.data?.cartCreate;
  if (!result || result.userErrors?.length > 0) {
    console.error("Cart create failed:", result?.userErrors);
    return null;
  }
  const cart = result.cart;
  if (!cart?.checkoutUrl) return null;
  const lineId = cart.lines.edges[0]?.node?.id;
  if (!lineId) return null;
  return {
    cartId: cart.id as string,
    checkoutUrl: formatCheckoutUrl(cart.checkoutUrl),
    lineId: lineId as string,
  };
}

export async function addLineToShopifyCart(
  cartId: string,
  variantId: string,
  quantity: number,
): Promise<{ success: boolean; lineId?: string; cartNotFound?: boolean }> {
  const data = await storefrontApiRequest(CART_LINES_ADD_MUTATION, {
    cartId,
    lines: [{ quantity, merchandiseId: variantId }],
  });
  const userErrors = data?.data?.cartLinesAdd?.userErrors || [];
  if (isCartNotFoundError(userErrors)) return { success: false, cartNotFound: true };
  if (userErrors.length > 0) return { success: false };
  const lines = data?.data?.cartLinesAdd?.cart?.lines?.edges || [];
  const newLine = lines.find((l: any) => l.node.merchandise.id === variantId);
  return { success: true, lineId: newLine?.node?.id };
}

export async function updateShopifyCartLine(
  cartId: string,
  lineId: string,
  quantity: number,
): Promise<{ success: boolean; cartNotFound?: boolean }> {
  const data = await storefrontApiRequest(CART_LINES_UPDATE_MUTATION, {
    cartId,
    lines: [{ id: lineId, quantity }],
  });
  const userErrors = data?.data?.cartLinesUpdate?.userErrors || [];
  if (isCartNotFoundError(userErrors)) return { success: false, cartNotFound: true };
  if (userErrors.length > 0) return { success: false };
  return { success: true };
}

export async function removeLineFromShopifyCart(
  cartId: string,
  lineId: string,
): Promise<{ success: boolean; cartNotFound?: boolean }> {
  const data = await storefrontApiRequest(CART_LINES_REMOVE_MUTATION, {
    cartId,
    lineIds: [lineId],
  });
  const userErrors = data?.data?.cartLinesRemove?.userErrors || [];
  if (isCartNotFoundError(userErrors)) return { success: false, cartNotFound: true };
  if (userErrors.length > 0) return { success: false };
  return { success: true };
}

export async function fetchCartStatus(cartId: string) {
  const data = await storefrontApiRequest(CART_QUERY, { id: cartId });
  return data?.data?.cart as { id: string; totalQuantity: number } | null | undefined;
}

/* ============================================================
 * Adapter: Shopify product → site Product type (visual reuse)
 * ============================================================ */

import type { Product, Variant } from "@/data/products";

export function shopifyToProduct(node: ShopifyProductNode): Product {
  const imgs = node.images.edges.map((e) => ({
    src: e.node.url,
    alt: e.node.altText || node.title,
  }));
  if (imgs.length === 0) {
    imgs.push({ src: "/placeholder.svg", alt: node.title });
  }
  if (imgs.length === 1) imgs.push(imgs[0]);

  const variants: Variant[] = node.variants.edges.map((e) => ({
    id: e.node.id, // real Shopify GID
    title: e.node.title,
    shade: e.node.selectedOptions.find((o) => /shade/i.test(o.name))?.value,
    price: parseFloat(e.node.price.amount),
    available: e.node.availableForSale,
  }));

  return {
    id: node.id,
    handle: node.handle,
    title: node.title,
    subtitle: node.options[0]?.name ? `${node.options[0].name} options` : "",
    vendor: "Aurelia Glow",
    productType: "Shopify",
    tags: [],
    description: node.description,
    images: imgs,
    price: parseFloat(node.priceRange.minVariantPrice.amount),
    rating: 0,
    reviewCount: 0,
    options: node.options.map((o) => ({ name: o.name, values: o.values })),
    variants,
    howToUse: [],
  };
}
