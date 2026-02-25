# Personal Website

這是一個使用 Vue 3、Vite 和 Tailwind CSS 構建的個人網站專案。

## 🛠 Tech Stack (技術棧)

- **框架**: [Vue 3](https://vuejs.org/) (Composition API, `<script setup>`)
- **建置工具**: [Vite](https://vitejs.dev/)
- **型別檢查**: [TypeScript](https://www.typescriptlang.org/)
- **路由管理**: [Vue Router](https://router.vuejs.org/)
- **多語系支持**: [Vue I18n](https://vue-i18n.intlify.dev/)
- **CSS 框架**: [Tailwind CSS v4](https://tailwindcss.com/)
- **UI 元件與動畫**:
  - [Reka UI](https://github.com/radix-vue/radix-vue)
  - [Headless UI](https://headlessui.com/)
  - [Lucide Vue Next](https://lucide.dev/) (Icons)
  - [tailwindcss-animate](https://github.com/jamiebuilds/tailwindcss-animate)
- **工具庫**:
  - [VueUse](https://vueuse.org/)
  - `clsx` & `tailwind-merge` & `class-variance-authority` (動態樣式管理)

## 📁 Project Structure (專案結構)

```text
src/
├── assets/          # 靜態資源 (圖片、字體等)
├── components/      # Vue 組件
│   ├── layout/      # 頁面區塊組件 (Hero, About, Experience, Skill, Contact, SideProjects, 等)
│   └── ui/          # 通用基礎組件 (button, card, slider 等)
├── composables/     # 共用邏輯 (useAmbientSound, useImgAspectRatio 等)
├── i18n/            # 多語系設定檔案
├── lib/             # 工具函式庫 (如 utils 等)
├── router/          # Vue Router 路由設定
├── views/           # 頁面層級組件 (HomeView, PathNotFound)
├── App.vue          # 根組件
└── main.ts          # 程式進入點
```

## 🚀 Getting Started (開始使用)

### Recommended IDE Setup

推薦使用 [VSCode](https://code.visualstudio.com/) 搭配 [Vue - Official (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) 擴充套件。

### 安裝依賴

```sh
npm install
```

### 開發模式 (Development)

啟動具有熱重載 (Hot-Reload) 支援的本地開發伺服器：

```sh
npm run dev
```

### 生產建置 (Production Build)

進行型別檢查並編譯最小化程式碼：

```sh
npm run build
```

其他部署模式建置：

```sh
npm run build:github  # GitHub Pages 部署模式
npm run build:aws     # AWS 部署模式
```

### 型別檢查 (Type-Check)

手動執行 TypeScript 型別檢查：

```sh
npm run type-check
```

## 📜 腳本指令說明

在 `package.json` 中可用的腳本：

- `dev`: 啟動開發伺服器
- `build`: 完整執行型別檢查和生產環境建置
- `preview`: 預覽本地建置後的生產版本網頁
- `build-only`: 僅執行 Vite 編譯
- `type-check`: 使用 `vue-tsc` 執行型別檢查
