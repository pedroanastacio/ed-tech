# EdTech - Teste Técnico

## Como Rodar

Você tem duas opções para visualizar o projeto:

1. **Servidor local**:
   - Execute `npx serve .`
   - Acesse: http://localhost:3000

2. **Acesso direto**:
   - Abra o arquivo `index.html` diretamente no navegador

## Decisões Técnicas

- **HTML5** semântico, sem frameworks
- **CSS puro** (sem Bootstrap, Tailwind)
- **JavaScript vanilla** (sem React, Vue, Angular)
- **sessionStorage** para persistência de dados
- **Componentes nativos** (details/summary para accordion)
- **Howler.js** (v2.2.4) - Biblioteca para controle de áudio

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
│   │   ├── audio-player.css
│   │   ├── button.css
│   │   ├── card.css
│   │   └── ...
│   └── pages/         # Estilos específicos de páginas
│       ├── course.css
│       └── home.css
├── js/                 # Scripts de interação
│   ├── accordion.js
│   ├── audio-player.js
│   ├── slider.js
│   └── ...
└── assets/
    ├── icons/         # SVGs
    └── images/        # Imagens
```
