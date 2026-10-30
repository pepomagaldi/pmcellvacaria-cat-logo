import type { Metadata } from "next";
export const metadata: Metadata = { title: "Catálogo de smartphones | PM Cell Vacaria", alternates: { canonical: "/catalogo" } };
import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  ArrowUpRight,
  MapPin,
  CreditCard,
  MessageCircle,
  HeartHandshake,
  Check,
  Smartphone,
} from "lucide-react";
import Header from "@/components/Header";
import Catalog from "@/components/Catalog";
import WhatsAppLink from "@/components/WhatsAppLink";
import { store } from "@/lib/catalog";
const benefits = [
  {
    icon: HeartHandshake,
    title: "Atendimento personalizado",
    text: "Uma conversa para encontrar o celular certo para você.",
  },
  {
    icon: CreditCard,
    title: "Em até 12x no cartão",
    text: "Consulte as condições e escolha como pagar.",
  },
  {
    icon: MapPin,
    title: "Aqui em Vacaria/RS",
    text: "Tecnologia com a proximidade de uma empresa local.",
  },
  {
    icon: MessageCircle,
    title: "Suporte pelo WhatsApp",
    text: "Tire suas dúvidas diretamente com a PM Cell.",
  },
];
export default function Home() {
  return (
    <>
      <a className="skip-link" href="#aparelhos">
        Pular para aparelhos
      </a>
      <Header />
      <main id="inicio">
        <section className="hero container">
          <div className="hero-copy">
            <p className="eyebrow">
              <span className="status-dot" /> TECNOLOGIA PERTO DE VOCÊ
            </p>
            <h1>
              Seu próximo
              <br />
              smartphone
              <br />
              <span>está aqui.</span>
            </h1>
            <p className="hero-description">
              Encontre seu novo celular com ótimas condições de pagamento e
              atendimento de confiança em Vacaria.
            </p>
            <div className="hero-actions">
              <a className="button primary" href="#aparelhos">
                Ver aparelhos <ArrowDown size={18} />
              </a>
              <WhatsAppLink className="button secondary-button" />
            </div>
            <div className="hero-proof">
              <span>
                <Check size={15} />
                Até 12x no cartão
              </span>
              <span>
                <MapPin size={15} />
                Vacaria, RS
              </span>
            </div>
          </div>
          <div className="hero-art">
            <div className="brand-stage">
              <Image
                src="/brand/logo.webp"
                alt="PM Cell Vacaria — logotipo original"
                fill
                priority
                sizes="(max-width: 767px) 90vw, 45vw"
              />
            </div>
            <div className="hero-caption">
              <span>ESCOLHA COM CONFIANÇA</span>
              <p>
                Seu próximo passo.
                <br />
                <b>Começa com uma conversa.</b>
              </p>
              <ArrowUpRight size={27} />
            </div>
          </div>
        </section>
        <div className="brand-strip">
          <div className="container">
            <span>Encontre no catálogo</span>
            <b>Xiaomi</b>
            <b>Motorola</b>
            <b>realme</b>
            <b>SAMSUNG</b>
            <b>HONOR</b>
          </div>
        </div>
        <Catalog />
        <section className="buy-section" id="como-comprar">
          <div className="container">
            <p className="eyebrow">SIMPLES, DO INÍCIO AO FIM</p>
            <h2>Seu novo celular em 3 passos.</h2>
            <div className="steps">
              {[
                {
                  icon: Smartphone,
                  title: "Escolha seu smartphone.",
                  text: "Explore os modelos e compare os preços no catálogo.",
                },
                {
                  icon: MessageCircle,
                  title: "Consulte disponibilidade pelo WhatsApp.",
                  text: "Clique em “Tenho interesse” e fale diretamente com a PM Cell.",
                },
                {
                  icon: HeartHandshake,
                  title: "Combine pagamento e entrega com a PM Cell.",
                  text: "Confirme os detalhes com a nossa equipe antes de comprar.",
                },
              ].map((s, i) => (
                <article key={s.title}>
                  <div className="step-top">
                    <span>0{i + 1}</span>
                    <s.icon size={24} />
                  </div>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </article>
              ))}
            </div>
            <div className="benefits">
              {benefits.map((b) => (
                <article key={b.title}>
                  <b.icon size={23} />
                  <h3>{b.title}</h3>
                  <p>{b.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section className="contact-section container" id="contato">
          <div>
            <p className="eyebrow">PODE CHAMAR A PM CELL</p>
            <h2>
              Ficou em dúvida?
              <br />A gente ajuda você a escolher.
            </h2>
            <p>Atendimento de verdade, direto pelo WhatsApp.</p>
          </div>
          <WhatsAppLink />
        </section>
      </main>
      <footer>
        <div className="container footer-top">
          <a href="#inicio" className="brand">
            <Image
              src="/brand/logo.webp"
              width={48}
              height={72}
              alt="PM Cell Vacaria"
            />
            <span>
              PM CELL<small>VACARIA · RS</small>
            </span>
          </a>
          <p>
            Assistência técnica e smartphones.
            <br />
            Vacaria — Rio Grande do Sul
          </p>
          <div>
            <a
              href={`https://wa.me/${store.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              (54) 99689-9213 <ArrowUpRight size={14} />
            </a>
            {store.instagramUrl && (
              <a
                href={store.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram
              </a>
            )}
          </div>
        </div>
        <div className="container footer-bottom">
          © {new Date().getFullYear()} PM Cell Vacaria. Todos os direitos
          reservados.
          <span>
            Escolha online. Converse com a gente.{" "}
            <Link href="/creditos" className="underline">
              Créditos das fotos
            </Link>
          </span>
        </div>
      </footer>
      <WhatsAppLink className="floating-whatsapp">WhatsApp</WhatsAppLink>
    </>
  );
}

