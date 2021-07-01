# Vite Todo

[![Photo](https://raw.githubusercontent.com/rayc2045/vite-todo/master/src/image/production.png)](https://vite-todo.netlify.app/)

[> Vite Todo](https://vite-todo.netlify.app/) / [設計稿](https://hexschool.github.io/js-todo/)

### 簡介
這次的專案為六角學院在 2021 年疫情期間舉辦的「程式體驗營」最終作業，其中使用了最近接觸的 Vite 作為專案開發和打包的工具，以及因為對 Utility-First CSS 頗感興趣，因此將 Tailwind 納入專案並初次使用它做開發。

### 外觀與互動設計
- 使用圓體無襯線字體 [Baloo Tamma 2](https://fonts.google.com/specimen/Baloo+Tamma+2) 作為標題字體
- 使用深灰而非黑色字體以達到閱讀和諧
- 每次更新觸發輸入框的集中 (focus)，省去額外點擊
- 將過長或連字的段落 (例如 `THISISAPARAGRAPHWITHOUTSPACE`) 強制換行，維持待辦清單任務的一致性
- 除了將勾選完成的任務以灰色字和刪除線表示，另外使用灰階對 Emoji 做去色處理
- 加大勾選框和刪除按鈕的點選範圍，增進操作體驗和容錯率
- 完成勾選所有任務，或是清除所有已完成任務後，自動回到「全部」任務區塊中以優化使用體驗

### 開發紀錄
- 使用 [Vite](https://vitejs.dev/) 進行專案開發和打包
- 使用 Utility-First CSS 框架 [Tailwind](https://tailwindcss.com/) 開發外觀、滑鼠觸碰效果與 RWD 響應式設計
- 透過 [Purge 過濾未使用的 CSS](https://tailwindcss.com/docs/optimizing-for-production#removing-unused-css)，優化專案打包
- 透過官方插件 [@tailwindcss/forms](https://github.com/tailwindlabs/tailwindcss-forms) 實現客製化勾選框 (checkbox)
- 使用 `dataset` 標記任務 id
- 使用箭頭函式、三元運算子、forEach、filter、find 等 ES6 JavaScript 開發功能
- 加入 Local Storage 儲存功能，關掉瀏覽器也不怕任務丟失
- 使用 [Prettier](https://prettier.io/) 格式化程式碼，保持程式的整齊和一致性
- 使用 [Netlify](https://www.netlify.com) 部署網站