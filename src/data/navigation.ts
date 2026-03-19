export const navigationKeys = [
  "products",
  "solutions",
  "about",
  "contact",
  "demo",
] as const;

export type NavigationKey = (typeof navigationKeys)[number];
