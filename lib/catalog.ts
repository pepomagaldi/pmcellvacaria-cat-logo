import catalog from "@/data/catalog.json";
export type Product = {
  id: string;
  brand: string;
  name: string;
  storage: string;
  cashPrice: number;
  is5G: boolean;
  availability: string;
  image: string | null;
  imageAlt: string;
  verificationNote?: string;
};
export const products: Product[] = catalog.products;
export const store = catalog.store;
export const payment = catalog.payment;
export const money = (n: number) =>
  n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
export function installments(cashPrice: number, config = payment) {
  if (
    !(cashPrice > 0) ||
    config.fee < 0 ||
    config.fee >= 1 ||
    !Number.isInteger(config.installments) ||
    config.installments < 1 ||
    config.roundTotalTo <= 0
  )
    throw new Error("Configuração de preço/parcelamento inválida");
  const raw = cashPrice / (1 - config.fee) / config.roundTotalTo;
  const rounded =
    (config.rounding === "nearest" ? Math.round(raw) : Math.ceil(raw)) *
    config.roundTotalTo;
  // Parcelas iguais em centavos: arredonda para cima e informa o total efetivo.
  const installmentCents = Math.ceil(
    Math.round(rounded * 100) / config.installments,
  );
  return {
    installment: installmentCents / 100,
    total: (installmentCents * config.installments) / 100,
  };
}
export function whatsapp(message: string) {
  return `https://wa.me/${store.whatsapp}?text=${encodeURIComponent(message)}`;
}
export const contactUrl = whatsapp(
  "Olá! Gostaria de conhecer os smartphones da PM Cell Vacaria.",
);
export function productUrl(p: Product) {
  return whatsapp(
    `Olá! Vi no catálogo da PM Cell e gostaria de saber mais sobre o ${p.name}, anunciado por ${money(p.cashPrice)}. Está disponível?`,
  );
}
export type Filters = {
  query: string;
  brand: string;
  price: string;
  only5G: boolean;
  sort: string;
};
export const defaultFilters: Filters = {
  query: "",
  brand: "Todas",
  price: "all",
  only5G: false,
  sort: "featured",
};
const normalize = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("pt-BR");
export function filterProducts(list: Product[], f: Filters) {
  const result = list.filter(
    (p) =>
      normalize(p.name + " " + p.brand).includes(normalize(f.query.trim())) &&
      (f.brand === "Todas" || p.brand === f.brand) &&
      (!f.only5G || p.is5G) &&
      (f.price === "all" ||
        (f.price === "under1500"
          ? p.cashPrice <= 1500
          : f.price === "1500to2000"
            ? p.cashPrice > 1500 && p.cashPrice <= 2000
            : p.cashPrice > 2000)),
  );
  if (f.sort === "low") result.sort((a, b) => a.cashPrice - b.cashPrice);
  if (f.sort === "high") result.sort((a, b) => b.cashPrice - a.cashPrice);
  if (f.sort === "az")
    result.sort((a, b) => a.name.localeCompare(b.name, "pt-BR"));
  return result;
}
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || store.siteUrl || undefined;
