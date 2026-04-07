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

### Stack Principal

- **HTML5** semântico, sem frameworks
- **CSS puro** (sem Bootstrap, Tailwind)
- **JavaScript vanilla** (sem React, Vue, Angular)
- **sessionStorage** para persistência de dados

### Componentes Nativos

- Uso de elementos HTML semânticos nativos (`<details>`, `<summary>`) para o accordion.
- **Benefícios:** funcionalidade básica sem JavaScript, acessível por padrão e sem JavaScript adicional.
- **Trade-offs:** A funcionalidade base (abrir/fechar) funciona sem JS. A animação fluida é um upgrade opcional.

### Howler.js para Áudio

- **Por que não `<audio>` nativo?**: Howler resolve inconsistências entre navegadores e limitações do HTML5 Audio.
- **Recursos utilizados**:
  - Modo `html5: true` para streaming de áudio grande sem carregar tudo na memória.
  - Controle de velocidade (`rate`) e volume via API.
  - Callbacks para estados (`onplay`, `onpause`, `onend`, `onload`).
  - Integração com `requestAnimationFrame` para UI fluida do progresso.

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
