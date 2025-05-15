# Chess Game

Um jogo de xadrez moderno implementado em React com TypeScript. Este projeto oferece uma experiência única de xadrez com diferentes variações de tabuleiro e regras simplificadas.

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)

## Funcionalidades

- 🎮 Diferentes tamanhos de tabuleiro (8x8 tradicional, 6x6, 6x8, 6x12, 12x12, 10x7)
- ⚔️ Sistema de captura de peças
- 👑 Condição de vitória ao capturar o rei
- 📊 Sistema de pontuação
- 🔄 Turnos alternados
- 💻 Interface moderna e responsiva

## Tecnologias Utilizadas

- React 18
- TypeScript
- Next.js
- CSS Modules

## Estrutura do Projeto

```
src/
  components/
    GameBoard.tsx      # Componente principal do tabuleiro
    GameContext.tsx    # Gerenciamento de estado com Context API
    GameBoard.module.css # Estilos do tabuleiro
```

## Arquitetura

- **Context API**: Gerenciamento de estado global do jogo
- **Reducer Pattern**: Lógica de atualização de estado centralizada
- **CSS Modules**: Estilos modulares e isolados
- **TypeScript**: Tipagem estática para maior segurança

## Boas Práticas

- Código limpo e bem documentado
- Componentes reutilizáveis
- Tipos e interfaces bem definidos
- Gerenciamento de estado eficiente
- UI/UX intuitiva e moderna

## Pré-requisitos

- Node.js 18.0.0 ou superior
- npm ou yarn

## Instalação

1. Clone o repositório
```bash
git clone https://github.com/seu-usuario/chess-game.git
cd chess-game
```

2. Instale as dependências
```bash
npm install
# ou
yarn install
```

3. Inicie o servidor de desenvolvimento
```bash
npm run dev
# ou
yarn dev
```

4. Abra [http://localhost:3000](http://localhost:3000) no seu navegador para ver o resultado.

## Como Jogar

1. Escolha o tamanho do tabuleiro desejado (6x6, 6x8, 6x12, 12x12, 10x7)
2. O jogo segue as regras básicas do xadrez com algumas simplificações:
   - Cada peça se move conforme as regras tradicionais do xadrez
   - O objetivo é capturar o rei adversário
   - Não há regras especiais como roque ou en passant
3. Os jogadores se alternam nos turnos
4. A pontuação é calculada com base nas peças capturadas

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy

Este projeto pode ser facilmente implantado na [Vercel Platform](https://vercel.com/new) ou em qualquer outro serviço de hospedagem que suporte Next.js.

## Contribuindo

Contribuições são sempre bem-vindas! Por favor, sinta-se à vontade para abrir uma issue ou enviar um pull request.

## Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para mais detalhes.
