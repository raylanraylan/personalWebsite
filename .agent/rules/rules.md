---
trigger: always_on
---

## Language

YOU MUST respond in 繁體中文 (zh-TW). NEVER use 簡體中文 (zh-CN).

## Coding Standards

1. **一次只做一件事**: 不要順便重構無關的程式碼。
2. **保持簡單**: 不需要過度設計，先求有功能再求完美。

## Interaction Protocol

1. **嚴格聽從指令**:
   - 在 Phase 1 (Dev) 結束時，絕對不要自己跑測試。
   - 在 Phase 2 (Test) 結束時，絕對不要自己 Commit。
2. **等待 User 確認**: 每個階段結束後，必須明確告知 User 下一步指令是什麼。

## CRITICAL RULES

### UI/UX

每當你編輯或生成 `.vue` 檔案的 `<template>` 部分時，**必須無條件**遵守以下準則。不需要使用者特別提醒。

#### 1. 語意化與無障礙 (A11y) - 絕對優先

- **禁止 Div Button**: 絕對不允許使用 `<div @click="...">` 或 `<span @click="...">`。
  - **必須** 使用 `<button type="button" @click="...">`。
  - 如果是導航連結，**必須** 使用 `<a href="...">` 或 `<RouterLink to="...">`。
- **圖片 Alt**: 所有 `<img>` 標籤必須包含 `alt` 屬性。如果是裝飾性圖片，使用 `alt=""`。
- **表單標籤**: 每個 `<input>` 都必須有對應的 `<label>` 或 `aria-label`。

#### 2. Vue Template 最佳實踐

- **v-for Key**: 禁止使用 index 作為 `:key` (除非確定列表靜態且不變)。必須使用唯一 ID (如 `:key="item.id"`)。
- **v-if/v-for 分離**: 嚴禁在同一個元素上同時使用 `v-if` 和 `v-for`。請使用 `<template>` 標籤包覆或 Computed Property。
- **Props 命名**: Template 中一律使用 kebab-case (例如 `:user-id="id"` 而非 `:userId="id"`).

#### 3. Element UI / Component Library 特定規則

- **Icon 使用**: 如果使用 Element Plus Icon，確保加上 `aria-hidden="true"` 以避免讀屏軟體讀出無意義內容。

### Development

- ALWAYS Tailwind classes, NEVER manual CSS
- ALWAYS named exports, NEVER default exports
- ALWAYS Composition API + <script setup>, NEVER Options API
