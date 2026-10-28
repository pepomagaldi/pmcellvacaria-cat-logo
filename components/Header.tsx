"use client";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import WhatsAppLink from "./WhatsAppLink";
const links = [
  ["#inicio", "Início"],
  ["#aparelhos", "Aparelhos"],
  ["#como-comprar", "Como comprar"],
  ["#contato", "Contato"],
];
export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="header">
      <div className="container header-inner">
        <a
          className="brand"
          href="#inicio"
          aria-label="PM Cell Vacaria — início"
        >
          <Image
            src="/brand/logo.webp"
            width={48}
            height={72}
            alt="Logotipo original PM Cell Vacaria"
            priority
          />
          <span>
            PM CELL<small>VACARIA · RS</small>
          </span>
        </a>
        <nav className="desktop-nav" aria-label="Menu principal">
          {links.map(([href, label]) => (
            <a key={href} href={href}>
              {label}
            </a>
          ))}
        </nav>
        <div className="header-contact">
          <WhatsAppLink>Atendimento</WhatsAppLink>
        </div>
        <button
          type="button"
          className="menu-toggle"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      <nav
        id="mobile-menu"
        className="mobile-nav"
        aria-label="Menu mobile"
        hidden={!open}
        onKeyDown={(e) => {
          if (e.key === "Escape") setOpen(false);
        }}
      >
        {links.map(([href, label]) => (
          <a key={href} href={href} onClick={() => setOpen(false)}>
            {label}
          </a>
        ))}
        <WhatsAppLink />
      </nav>
    </header>
  );
}
