# Project Structure

```
/
├── .agent/                  # Agent configuration and skills
│   ├── rules/
│   ├── skills/
│   └── workflows/
├── .vscode/                 # VSCode settings
├── public/                  # Static assets
├── src/
│   ├── assets/              # Images, fonts, and global CSS
│   │   ├── images/
│   │   └── main.css
│   ├── components/          # Vue components
│   │   ├── layout/          # Layout specific components (Header, Hero, etc.)
│   │   └── ui/              # Reusable UI components (shadcn-vue/headlessui)
│   ├── composables/         # Vue composables (logic reuse)
│   │   └── useAmbientSound.ts
│   ├── i18n/                # Internationalization
│   │   └── language/
│   ├── lib/                 # Utilities
│   │   └── utils.ts
│   ├── router/              # Vue Router configuration
│   ├── views/               # Page views
│   │   ├── HomeView.vue
│   │   └── PathNotFound.vue
│   ├── App.vue              # Root component
│   └── main.ts              # Entry point
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```
