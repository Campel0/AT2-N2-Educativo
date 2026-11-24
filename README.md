# Chronos — organização de estudos

O Chronos é um sistema web de apoio à rotina de estudos. Ele reúne matérias, tarefas com prazo e sessões cronometradas em um só lugar, ajudando o estudante a decidir o que estudar e acompanhar sua consistência.

## Proposta e problema atendido

Estudantes costumam espalhar prazos e planos de estudo entre listas, calendários e anotações. O Chronos centraliza essas informações e transforma o planejamento em ações: cadastrar uma matéria, associar tarefas e metas, iniciar um período de foco e visualizar o progresso.

## Funcionalidades implementadas

- **Dashboard:** resumo de tarefas pendentes, concluídas e atrasadas; tempo de estudo dos últimos sete dias; sequência de estudo; metas semanais por matéria; gráfico diário e próximos prazos.
- **Matérias:** cadastro com nome, cor e meta semanal de horas; edição e remoção. Ao remover uma matéria, suas tarefas e sessões relacionadas também são excluídas após confirmação.
- **Tarefas:** cadastro associado a uma matéria e a um prazo; edição, conclusão, remoção e filtros por todas, pendentes ou concluídas. A lista é ordenada pelo prazo.
- **Foco:** temporizador associado a uma matéria, com opções de 15, 25 e 45 minutos e uma opção de 1 minuto para demonstração. É possível pausar, continuar, finalizar registrando o tempo ou descartar a sessão. O histórico mostra sessões recentes.
- **Preferências e feedback:** tema claro/escuro, avisos de ações e persistência dos dados no armazenamento local do navegador.

## Tecnologias e execução

- React 19 e React Router para as telas e navegação.
- Vite para desenvolvimento e geração do pacote web.
- Recharts para o gráfico do dashboard.
- CSS próprio, com layout responsivo, estados vazios e suporte a preferência de movimento reduzido.
- `localStorage` para guardar matérias, tarefas, sessões e preferência de tema neste navegador.

Para executar localmente, com Node.js instalado:

```bash
npm install
npm run dev
```

Os dados não são sincronizados entre navegadores ou dispositivos; não há servidor ou conta de usuário nesta versão. O projeto inclui dados iniciais de demonstração no primeiro acesso. Para começar com uma base limpa, limpe os dados do site no navegador.

## Relação com a AT2-N2

| Critério | Evidências no sistema | Leitura atual |
|---|---|---|
| Resolução de problema real | Centraliza planejamento, prazos, metas e registro do tempo de estudo. | A proposta tem utilidade clara para estudantes. A validação com usuários reais pode fortalecer a apresentação, mas não é demonstrada pelo código. |
| UI/UX | Navegação por quatro áreas, formulários com validação, filtros, feedback, tema claro/escuro, gráfico e estados vazios. | Há uma experiência navegável e organizada. A avaliação visual final depende de apresentar a aplicação em execução e conferir o layout no dispositivo usado. |
| Funcionamento | CRUD de matérias e tarefas, temporizador e registro de sessões, cálculos de progresso e persistência local. | As funcionalidades estão implementadas no código. Esta documentação não substitui uma verificação manual de cada fluxo antes da gravação. |
| Requisito React JS | Aplicação construída com React e React Router. | Atendido pela implementação. |
| Entrega e apresentação | A atividade pede vídeo de aproximadamente 30 segundos no AVA e apresentação em sala na data combinada. | São etapas externas ao código: ainda é necessário gravar/enviar o vídeo e comparecer à apresentação. |

## Roteiro sugerido para o vídeo (30 segundos)

1. **0–5 s:** apresentar o nome Chronos e o dashboard com metas e resumo.
2. **5–11 s:** mostrar uma matéria e uma tarefa com prazo.
3. **11–22 s:** abrir Foco, escolher matéria, iniciar o temporizador e demonstrar pausa ou a opção de 1 minuto.
4. **22–27 s:** mostrar o registro/histórico e voltar ao dashboard para destacar o progresso.
5. **27–30 s:** encerrar com a proposta: organizar matérias, prazos e tempo de estudo em um só lugar.

Antes da gravação, confira se os dados de demonstração estão coerentes, se o navegador está em uma janela limpa e se o fluxo escolhido funciona do início ao fim. Na apresentação em sala, explique o problema, demonstre um fluxo principal e comente como as metas e o histórico ajudam o estudante.
