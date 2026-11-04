# Proposta de pull request

**Título:** Organiza a plataforma em torno de educação e autocuidado em todas as fases da vida

A home agora destaca informação e hábitos, com quatro eixos: estética/autoestima, saúde mental, prevenção e envelhecimento saudável. A biblioteca `/conteudos` permite busca sem acentos e filtros combinados por tema e fase da vida. Oito guias têm páginas próprias, passos práticos e referências institucionais, geradas estaticamente para GitHub Pages.

`/apoio` reúne caminhos para UBS, CAPS e CVV, distinguindo escuta emocional de atendimento de urgência (SAMU 192). O menu, os metadados e o rodapé direcionam para os conteúdos e o apoio. Planejamentos e área local de hábitos/pontos permanecem disponíveis.

## Validação

- Lint, TypeScript e exportação estática para GitHub Pages.
- Testes Playwright: busca e filtros, estado vazio, oito guias com fontes/passos, slug desconhecido, orientação de apoio e responsividade em 320px.
- Regressão dos cinco testes existentes de planejamentos e hábitos.

## Limites

Orientações gerais, sem diagnóstico, prescrição, avaliação de sintomas ou revisão clínica declarada. Referências externas não representam endosso institucional. Os registros pessoais continuam locais e compartilhados no navegador; Firebase não foi provisionado. Nenhuma reserva real é confirmada.
