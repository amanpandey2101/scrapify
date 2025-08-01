export enum PackId {
  SMALL = "SMALL",
  MEDIUM = "MEDIUM",
  LARGE = "LARGE",
}

export type CreditsPack = {
  id: PackId;
  name: string;
  label: string;
  credits: number;
  price: number;
  priceId: string | null;
};

export const CreditsPack: CreditsPack[] = [
  {
    id: PackId.SMALL,
    name: "Small Pack",
    label: "1,000 Credits",
    credits: 1000,
    price: 999,
    priceId: process.env.STRIPE_SMALL_PACK_PRICE_ID || null,
  },
  {
    id: PackId.MEDIUM,
    name: "Medium Pack",
    label: "5,000 Credits",
    credits: 5000,
    price: 3999,
    priceId: process.env.STRIPE_MEDIUM_PACK_PRICE_ID || null,
  },
  {
    id: PackId.LARGE,
    name: "Large Pack",
    label: "10,000 Credits",
    credits: 10000,
    price: 6999,
    priceId: process.env.STRIPE_LARGE_PACK_PRICE_ID || null,
  },
];

export function getCreditsPack(id: PackId) {
  return CreditsPack.find((p) => p.id === id);
}

// Helper function to check if Stripe is configured
export function isStripeConfigured(): boolean {
  return !!(process.env.STRIPE_SECRET_KEY && 
           process.env.STRIPE_WEBHOOK_SECRET && 
           process.env.STRIPE_SMALL_PACK_PRICE_ID && 
           process.env.STRIPE_MEDIUM_PACK_PRICE_ID && 
           process.env.STRIPE_LARGE_PACK_PRICE_ID);
}
