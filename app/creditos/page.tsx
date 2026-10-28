import Link from "next/link";
export default function Credits() {
  return (
    <main className="container py-16 max-w-3xl">
      <Link className="text-blue-400" href="/">
        ← Voltar ao catálogo
      </Link>
      <h1 className="mt-10 text-4xl">Créditos das fotografias</h1>
      <p className="mt-8">
        As fotografias são referências dos modelos. Não representam a unidade ou
        a cor disponível na loja.
      </p>
      <ul className="mt-8 space-y-8">
        <li>
          Redmi 15:{" "}
          <a
            className="underline"
            href="https://commons.wikimedia.org/wiki/File:Redmi_15_back.jpg"
          >
            Maksdroider / Wikimedia Commons
          </a>
          ,{" "}
          <a
            className="underline"
            href="https://creativecommons.org/licenses/by-sa/4.0/"
          >
            CC BY-SA 4.0
          </a>
          . Redimensionada e convertida para WebP. O arquivo derivado permanece
          sob a mesma licença:{" "}
          <a className="underline" href="/products/redmi-15.webp">
            baixar fotografia
          </a>
          .
        </li>
        <li>
          Moto G35 5G:{" "}
          <a
            className="underline"
            href="https://commons.wikimedia.org/wiki/File:Motorola_Moto_G35_5G.jpg"
          >
            Savantup / Wikimedia Commons
          </a>
          ,{" "}
          <a
            className="underline"
            href="https://creativecommons.org/publicdomain/zero/1.0/"
          >
            CC0 1.0
          </a>
          . Redimensionada e convertida para WebP.
        </li>
      </ul>
      <p className="mt-8">
        Logotipo original fornecido pela PM Cell Vacaria. Os autores das
        fotografias e fabricantes não patrocinam este catálogo.
      </p>
    </main>
  );
}
