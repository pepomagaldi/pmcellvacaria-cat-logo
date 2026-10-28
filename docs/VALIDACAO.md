# Validação — 28/10/2026

## Checks executados

- Dependências instaladas; package-lock.json entregue.
- `npm run build`: aprovado, Next.js 16.4.3, páginas principal/créditos, favicon, robots e sitemap gerados.
- `npm run typecheck`: aprovado.
- `npm run lint`: aprovado sem warnings.
- `npm test`: 6 testes aprovados, nenhum erro. Inclui todos os preços finais importados, unicidade dos 28 IDs, filtros combinados, faixas, três ordenações, regra de taxa, soma das parcelas e mensagens WhatsApp para todos os 28 SKUs.

## Navegador

Usada a versão de produção na prévia local. Busca por Moto G35 retornou 1 item; filtro somente 5G manteve esse item; Motorola retornou 6 itens; ordenação por maior preço mostrou G35, G15, G06 256, G06 128, G04 e E15; Motorola acima de R$ 2.000 exibiu zero resultados; limpar filtros restaurou catálogo. Conferida URL real com o número oficial, modelo e preço do G35. Não foi enviada mensagem.

Menu mobile abriu e fechou em viewport estreito no navegador direto. A prévia em iframe não executou de forma confiável as interações; por isso foi usada apenas para medições de layout. O modo Next dev nesta infraestrutura também apresentou controles sem resposta; o teste funcional foi concluído em `next start` com build de produção.

## Responsividade

Documentos renderizados em iframes de 360, 390, 768 e 1280 px. A barra vertical do Chromium ocupa 15 px; larguras úteis medidas foram 345, 375, 753 e 1265 px. Em cada medição, `documentElement.scrollWidth` foi igual a `clientWidth`, sem overflow horizontal do documento interno. Capturas desktop/mobile estão em `docs/previews/`. A inspeção visual é amostral e não equivale a testes em aparelhos físicos.

Não houve teste em Safari/iPhone real, Android físico, rede 4G simulada, auditoria Lighthouse ou domínio publicado. Não afirmar pontuação de performance nem compatibilidade integral nesses ambientes.

## Pendências de lançamento

- 25 cards ainda sem fotografia ativa; há 3 famílias com arquivo licenciado, das quais Redmi 15C aguarda confirmação e não é exibido. A pesquisa sem foto licenciada cobre 23 SKUs; os 2 SKUs 15C completam os 25 cards pendentes.
- Fotografias existentes são amadoras, com fundo real. Não equivalem a packshots profissionais com fundo branco/transparente. O hero usa logotipo original em composição provisória.
- Confirmar variantes, ano do Galaxy A7, NFC do Honor X5c, estoque e taxa InfinitePay real.
- Confirmar URL do Instagram e domínio final; sem domínio configurado o site não é indexável.
- GitHub autenticado como `pepomagaldi`, sem ferramenta disponível para criar/push de repositório nesta sessão. Consulta Vercel retornou nenhuma equipe; nenhum projeto ou deployment criado. Preparação entregue em arquivos, sem publicação.
