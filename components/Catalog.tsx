"use client";
import { useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import {
  defaultFilters,
  filterProducts,
  products,
  type Filters,
} from "@/lib/catalog";
import ProductCard from "./ProductCard";
export default function Catalog() {
  const [filters, setFilters] = useState(defaultFilters);
  const update = <K extends keyof Filters>(key: K, value: Filters[K]) =>
    setFilters((f) => ({ ...f, [key]: value }));
  const shown = filterProducts(products, filters);
  const active = JSON.stringify(filters) !== JSON.stringify(defaultFilters);
  return (
    <section id="aparelhos" className="catalog-section container">
      <div className="section-heading">
        <div>
          <p className="eyebrow">ENCONTRE O SEU</p>
          <h2>
            Um novo celular.
            <br className="mobile-break" /> Novas possibilidades.
          </h2>
        </div>
        <p>Compare. Escolha. Fale com a gente.</p>
      </div>
      <div className="filter-panel">
        <div className="filter-top">
          <label className="search-field">
            <Search size={20} aria-hidden="true" />
            <span className="sr-only">Buscar aparelho</span>
            <input
              type="search"
              value={filters.query}
              onChange={(e) => update("query", e.target.value)}
              placeholder="Qual celular você procura?"
            />
          </label>
          <label className="sort-field">
            <span className="sr-only">Ordenar aparelhos</span>
            <select
              value={filters.sort}
              onChange={(e) => update("sort", e.target.value)}
            >
              <option value="featured">Ordem do catálogo</option>
              <option value="low">Menor preço</option>
              <option value="high">Maior preço</option>
              <option value="az">Nome: A a Z</option>
            </select>
          </label>
        </div>
        <div className="filter-bottom">
          <div className="brand-filters" aria-label="Filtrar por marca">
            {["Todas", ...new Set(products.map((p) => p.brand))].map((b) => (
              <button
                type="button"
                key={b}
                onClick={() => update("brand", b)}
                aria-pressed={filters.brand === b}
                className={filters.brand === b ? "chip selected" : "chip"}
              >
                {b}
              </button>
            ))}
          </div>
          <div className="extra-filters">
            <label className="price-filter">
              <SlidersHorizontal size={16} aria-hidden="true" />
              <span className="sr-only">Faixa de preço à vista</span>
              <select
                value={filters.price}
                onChange={(e) => update("price", e.target.value)}
              >
                <option value="all">Todos os preços</option>
                <option value="under1500">Até R$ 1.500</option>
                <option value="1500to2000">R$ 1.500,01 a R$ 2.000</option>
                <option value="over2000">Acima de R$ 2.000</option>
              </select>
            </label>
            <label className="check-filter">
              <input
                type="checkbox"
                checked={filters.only5G}
                onChange={(e) => update("only5G", e.target.checked)}
              />
              Somente 5G
            </label>
          </div>
        </div>
      </div>
      <div className="result-line">
        <p role="status" aria-live="polite">
          <b>{shown.length}</b>{" "}
          {shown.length === 1 ? "aparelho encontrado" : "aparelhos encontrados"}
        </p>
        {active && (
          <button className="clear" onClick={() => setFilters(defaultFilters)}>
            <X size={14} />
            Limpar filtros
          </button>
        )}
      </div>
      {shown.length ? (
        <div className="product-grid">
          {shown.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <Search size={32} />
          <h3>Nenhum aparelho por aqui.</h3>
          <p>Tente outro nome ou ajuste os filtros.</p>
          <button
            className="button primary"
            onClick={() => setFilters(defaultFilters)}
          >
            Ver todos os aparelhos
          </button>
        </div>
      )}
      <p className="catalog-note">
        Preços e disponibilidade sujeitos à confirmação. Consulte as condições
        de pagamento no WhatsApp. As cores dos aparelhos podem variar.
      </p>
    </section>
  );
}
