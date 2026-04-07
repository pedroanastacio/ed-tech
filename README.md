# EdTech - Teste Técnico

## Como Rodar

Você tem duas opções para visualizar o projeto:

1. **Servidor local (Node.js)**:
   - Execute `npx serve .`
   - Acesse: http://localhost:3000

2. **Servidor local (Python)**:
   - Execute `python -m http.server 8000`
   - Acesse: http://localhost:8000

## Decisões Técnicas

- **HTML5** semântico, sem frameworks
- **CSS puro** (sem Bootstrap, Tailwind)
- **JavaScript vanilla** (sem React, Vue, Angular)
- **sessionStorage** para persistência de dados
- **Componentes nativos** (details/summary para accordion)
- **Howler.js** - Biblioteca para controle de áudio

## Estrutura do Projeto

```
/projeto
├── index.html          # Página inicial
├── course.html         # Página do curso
├── README.md
├── css/
│   ├── theme.css           # Variáveis e reset
│   ├── components/         # Componentes reutilizáveis
│   │   ├── accordion.css
│   │   ├── activity-card.css
│   │   ├── alternative.css
│   │   ├── answer-feedback.css
│   │   ├── audio-player.css
│   │   ├── button.css
│   │   ├── card.css
│   │   ├── highlight-card.css
│   │   ├── slider.css
│   │   ├── textarea.css
│   │   ├── typography.css
│   │   └── video-player.css
│   └── pages/         # Estilos específicos de páginas
│       ├── course.css
│       └── home.css
├── js/                 # Scripts de interação
│   ├── accordion.js
│   ├── audio-player.js
│   ├── discursive-activity.js
│   ├── highlight-cards.js
│   ├── objective-activity.js
│   ├── slider.js
│   └── video-player.js
└── assets/
    ├── icons/         # SVGs
    └── images/        # Imagens
```
