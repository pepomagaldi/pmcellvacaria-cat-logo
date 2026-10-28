"use client";
import Image from "next/image";
import { useState } from "react";
import { ImageOff } from "lucide-react";
import {
  installments,
  money,
  payment,
  productUrl,
  type Product,
} from "@/lib/catalog";
import WhatsAppLink from "./WhatsAppLink";
export default function ProductCard({ product: p }: { product: Product }) {
  const [failed, setFailed] = useState(false);
  const terms = installments(p.cashPrice);
  return (
    <article className="product-card">
      <div className="product-visual">
        {p.is5G && <span className="tag">5G</span>}
        {p.image && !failed ? (
          <Image
            src={p.image}
            unoptimized
            alt={p.imageAlt}
            fill
            sizes="(max-width: 599px) 90vw, (max-width: 999px) 45vw, 25vw"
            onError={() => setFailed(true)}
          />
        ) : (
          <div className="photo-pending">
            <ImageOff size={28} strokeWidth={1} />
            <span>Fotografia em atualização</span>
          </div>
        )}
      </div>
      <div className="product-info">
        <div className="product-meta">
          <span>{p.brand}</span>
          <span>{p.storage}</span>
        </div>
        <h3>{p.name}</h3>
        <p className="stock">
          {p.availability === "indisponivel"
            ? "Indisponível no momento"
            : p.availability === "disponivel"
              ? "Disponível"
              : "Consulte disponibilidade"}
        </p>
        <div className="pricing">
          <span>À vista</span>
          <strong>{money(p.cashPrice)}</strong>
          <p>
            ou até{" "}
            <b>
              {payment.installments}x de {money(terms.installment)}
            </b>
          </p>
          <small>Total no cartão: {money(terms.total)}</small>
        </div>
        {p.availability === "indisponivel" ? (
          <button disabled className="button unavailable">
            Indisponível
          </button>
        ) : (
          <WhatsAppLink href={productUrl(p)} className="button interest">
            Tenho interesse
          </WhatsAppLink>
        )}
      </div>
    </article>
  );
}
