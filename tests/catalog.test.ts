import test from "node:test";
import assert from "node:assert/strict";
import {
  defaultFilters,
  filterProducts,
  installments,
  money,
  productUrl,
  products,
  payment,
} from "../lib/catalog";
test("28 SKUs únicos e preços de venda importados", () => {
  assert.equal(products.length, 28);
  assert.equal(new Set(products.map((p) => p.id)).size, 28);
  assert.deepEqual(
    products.map((p) => p.cashPrice),
    [
      1120, 1210, 1470, 1830, 1470, 1000, 1120, 960, 1550, 1260, 1120, 1990,
      1730, 1720, 1440, 2200, 2530, 1430, 1210, 960, 1370, 1480, 1100, 1140,
      1290, 960, 1040, 960,
    ],
  );
  assert.ok(products.every((p) => !("cost" in p)));
});
test("busca, marca, faixa e 5G se combinam sem alterar dados", () => {
  assert.equal(
    filterProducts(products, {
      ...defaultFilters,
      query: "  MOTO G35 ",
      brand: "Motorola",
      price: "under1500",
      only5G: true,
    }).length,
    1,
  );
  assert.equal(
    filterProducts(products, {
      ...defaultFilters,
      brand: "Samsung",
      only5G: true,
    }).length,
    0,
  );
  assert.equal(
    filterProducts(products, { ...defaultFilters, query: "inexistente" })
      .length,
    0,
  );
  assert.equal(filterProducts(products, defaultFilters).length, 28);
});
test("faixas não se sobrepõem e cobrem o catálogo", () => {
  const count = ["under1500", "1500to2000", "over2000"].map(
    (price) => filterProducts(products, { ...defaultFilters, price }).length,
  );
  assert.equal(
    count.reduce((a, b) => a + b),
    28,
  );
});
test("ordenações por preço e alfabética", () => {
  for (const sort of ["low", "high", "az"]) {
    const r = filterProducts(products, { ...defaultFilters, sort });
    for (let i = 1; i < r.length; i++) {
      assert.ok(
        sort === "az"
          ? r[i - 1].name.localeCompare(r[i].name, "pt-BR") <= 0
          : sort === "low"
            ? r[i - 1].cashPrice <= r[i].cashPrice
            : r[i - 1].cashPrice >= r[i].cashPrice,
      );
    }
  }
  assert.equal(products[0].id, "pm-01");
});
test("parcelas iguais somam o total exibido; taxa configurável", () => {
  const r = installments(1120);
  assert.equal(r.installment, 106.67);
  assert.equal(r.total, 1280.04);
  for (const p of products) {
    const t = installments(p.cashPrice);
    assert.equal(
      Math.round(t.installment * payment.installments * 100),
      Math.round(t.total * 100),
    );
    assert.ok(t.total >= p.cashPrice / (1 - payment.fee));
  }
  assert.equal(installments(1200, { ...payment, fee: 0 }).total, 1200);
  assert.throws(() => installments(100, { ...payment, fee: 1 }));
});
test("todos os links têm número oficial, modelo e preço exatos", () => {
  for (const p of products) {
    const u = new URL(productUrl(p));
    assert.equal(u.origin, "https://wa.me");
    assert.equal(u.pathname, "/5554996899213");
    assert.equal(
      u.searchParams.get("text"),
      `Olá! Vi no catálogo da PM Cell e gostaria de saber mais sobre o ${p.name}, anunciado por ${money(p.cashPrice)}. Está disponível?`,
    );
  }
});
