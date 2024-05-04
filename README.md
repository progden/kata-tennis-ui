# Vue 3 + TypeScript + Vite + Vitest

## Domain Model + UI Component

針對核心的業務邏輯，使用 Domain Model 來描述，並且使用 Unit Tests 來驗證。

明確 UI 元件與 Domain Model 的分工，讓 UI 元件專注於 UI 的呈現，而 Domain Model 專注於業務邏輯的實作。

在這邊的例子，可以說減少對 Vue 元件的倚賴，若系統需要切換到其他框架，只需要調整 UI 元件即可。

## Unit Test in Vitest

使用 Vitest 來撰寫 Unit Test
也適用了不少 Vitest API 特性來撰寫測試

## Vue 3 Component Unit Test

使用 @vue/test-utils 來撰寫 Vue 3 Component Unit Test

減少倚賴後的元件單元測試也是相當簡單

觀察倚賴的 Domain Model 是否有正確的被呼叫，以及 UI 元件的行為是否符合預期。

且不用考慮 Domain Model 狀態，僅需考慮互動是否正確進行即可。

## Recommended Setup

執行以下指令，安裝相依套件，並且啟動開發伺服器

```shell
yarn
yarn dev
``` 

執行以下指令，執行單元測試

```shell
yarn test
```