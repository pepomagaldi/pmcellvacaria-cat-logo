# PM Cell Vacaria

Catálogo real em Next.js App Router, React, TypeScript, Tailwind CSS 4 e Lucide. Sem banco, login, checkout ou APIs pagas. Compra concluída por conversa no WhatsApp oficial **5554996899213**.

## Estado da entrega

Os 28 SKUs e preços finais à vista do HTML foram importados. Busca, filtros combinados, ordenação, mensagens de WhatsApp, menu mobile, disponibilidade e cálculo de parcelamento estão implementados. Os custos e as margens do fornecedor não fazem parte deste projeto.

**Pendência editorial:** 25 cards ainda não exibem fotografia. Existem 3 fotografias locais licenciadas: Redmi 15 (2 cards), Moto G35 (1 card) e Redmi 15C (reservada até confirmação da nomenclatura). Não são packshots profissionais; não atendem integralmente ao pedido de fundo branco/transparente. O hero usa o logotipo original como composição provisória, sem imagem inventada. Complete a fotografia antes do lançamento comercial. Consulte `docs/IMAGENS-E-PENDENCIAS.md` e `docs/VALIDACAO.md`.

O Instagram não é exibido porque a URL ainda não foi confirmada. Estoque inicia como “consulte disponibilidade”. Não há avaliações, garantias, frete ou especificações inventadas. Só o Moto G35 recebe selo 5G, conforme o HTML; os demais dependem da confirmação da versão do estoque.

## Executar

Requer Node.js 22.13+ (validado com Node 24) e npm.

```bash
npm ci
npm run dev
```

Abra http://localhost:3000. Não abra os arquivos TSX diretamente no navegador.

```bash
npm run typecheck
npm run lint
npm test
npm run build
npm start
```

## Atualizar o catálogo

Edite apenas **`data/catalog.json`**. Todos os preços, estoque, imagens, taxa e dados de contato ficam nesse arquivo. Os componentes não precisam mudar.

Exemplo de um produto (substitua os valores pelo aparelho real):

```json
{
  "id": "pm-29",
  "brand": "Motorola",
  "name": "Nome completo do modelo 256 GB",
  "storage": "256 GB",
  "cashPrice": 1500,
  "is5G": false,
  "availability": "consultar",
  "image": "/products/nome-do-modelo.webp",
  "imageAlt": "Fotografia do modelo correto",
  "verificationNote": ""
}
```

- **Adicionar:** copie um objeto dentro de `products`, coloque vírgula entre objetos e use um `id` exclusivo. A marca entra automaticamente nos filtros.
- **Preço:** altere `cashPrice` em reais, como `1499.90` (ponto para centavos; sem R$ e sem separador de milhar). O preço à vista é exatamente esse valor; nenhuma margem é aplicada.
- **Fotografia:** coloque arquivo autorizado em `public/products/` e informe `/products/arquivo.webp` em `image`. Nunca inclua `/public` no campo. Prefira imagem entre 800 e 1200 px e com boa composição. `null` ou arquivo que falha exibe o aviso honesto de foto em atualização. Use nome novo de arquivo ao substituir foto para evitar cache antigo.
- **Indisponível:** `availability: "indisponivel"` mantém o card e desabilita o botão. `"disponivel"` só após confirmar estoque. `"consultar"` mantém consulta no WhatsApp.
- **Remover:** exclua o objeto inteiro e ajuste a vírgula do JSON.
- **5G:** altere `is5G` somente depois de confirmar a variante.
- **Instagram:** após confirmar a URL oficial, substitua `store.instagramUrl: null` por URL HTTPS completa. O link aparece automaticamente no rodapé.
- **Domínio:** preencha `store.siteUrl` com a URL HTTPS final, sem barra no fim; alternativamente use `NEXT_PUBLIC_SITE_URL`. Sem URL, robots bloqueia indexação e sitemap fica vazio para não anunciar domínio fictício.

Depois de editar: rode os checks, faça commit e push. Os testes de importação guardam os 28 preços originais como referência: ao mudar o catálogo intencionalmente, atualize esse teste ou substitua a referência por seu novo inventário validado.

## Parcelamento e arredondamento

Em `payment`:

- `installments`: quantidade de parcelas, inicialmente `12`.
- `fee`: taxa sobre a venda, inicialmente `0.124` (12,4%, referência do HTML, **não consulta a taxa vigente da InfinitePay**).
- `roundTotalTo`: múltiplo em reais, inicialmente `10`.
- `rounding`: `"up"` arredonda total para cima, `"nearest"` para o mais próximo.

A regra importada é `totalBase = preçoÀVista / (1 - taxa)`, arredondado para o múltiplo configurado. O valor de cada parcela é arredondado para cima no centavo; o total anunciado é **parcela × quantidade**. Exemplo: R$ 1.120,00 → base arredondada R$ 1.280,00 → 12 × R$ 106,67 → total mostrado R$ 1.280,04. O HTML arredondava apenas a apresentação, podendo mostrar uma parcela cuja soma divergia do total. A entrega corrige essa diferença, de no máximo 11 centavos em 12x. Nenhum texto promete “sem juros”.

A taxa é configurável e deve corresponder ao plano real da loja. Para mudar a quantidade anunciada além de 12, revise também os textos comerciais que mencionam 12x.

## GitHub e Vercel

Nenhum repositório remoto ou deployment foi publicado nesta entrega.

1. Extraia o ZIP e abra a pasta `pm-cell`.
2. Crie um repositório vazio na sua conta GitHub. Não envie `node_modules`, `.next` ou `.env`.
3. Execute, usando a URL real do repositório:

```bash
git init
git add .
git commit -m "Cria catálogo PM Cell Vacaria"
git branch -M main
git remote add origin URL_DO_SEU_REPOSITORIO
git push -u origin main
```

4. Na Vercel, **Add New → Project → Import Git Repository**. Escolha o repositório; framework **Next.js**; raiz a pasta que contém `package.json`; install `npm ci`; build `npm run build`; output padrão.
5. Defina `NEXT_PUBLIC_SITE_URL` com a URL final (por exemplo, a URL atribuída ao seu projeto). Se ainda não souber a URL, deixe indexação desativada no primeiro deploy e faça redeploy após configurar.
6. Revise fotos/nomes/estoque/taxa, confirme a publicação e use **Deploy**. Adicione o domínio próprio se houver.
7. Verifique `/robots.txt`, `/sitemap.xml`, WhatsApp, filtros e imagens no domínio publicado. Toda mudança futura no GitHub gera novo build conforme configuração da Vercel.

O código não exige serviços pagos. Condições e elegibilidade do plano de hospedagem são definidas pelo provedor; não é necessário contratar banco ou autenticação.

Referências técnicas: https://nextjs.org/docs/app/getting-started/installation e https://vercel.com/docs/frameworks/full-stack/nextjs

## Organização

- `app/`: página, layout, CSS, metadados, sitemap, robots, favicon e créditos.
- `components/`: cabeçalho, catálogo, cards e link WhatsApp.
- `data/catalog.json`: manutenção comercial.
- `lib/catalog.ts`: filtros, preço, parcelas e URLs.
- `public/brand/`: original fornecido e versão WebP otimizada sem redesenho.
- `public/products/`: fotografias locais; confira créditos/licenças.
- `tests/`: verificação de preços, filtros, ordenações e WhatsApp.
- `docs/`: fontes das imagens, pendências e validação.

## Imagens e autoria

Créditos públicos em `/creditos`. Redmi 15 e Redmi 15C: Maksdroider, CC BY-SA 4.0; Moto G35: Savantup, CC0. O redimensionamento e conversão WebP mantêm a licença das fotografias derivadas. Os arquivos JPG são os originais pesquisados. O Redmi 15C ainda não está vinculado aos cards. Não copie imagens comerciais de varejistas sem autorização. Não há marca-d'água adicionada nem logo gerado por IA.
