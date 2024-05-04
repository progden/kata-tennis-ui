<script setup lang="ts">
import TennisGame from "./components/TennisGameUI.vue";

// import.meta 只能在模組腳本中使用，模組腳本是指 type="module" 的script標籤，或者是在 .vue 文件中的 <script setup> 中。
const msg = `${import.meta.env.VITE_APP_TITLE}`;
</script>

<template>
  <h1>{{ msg }}</h1>
  <TennisGame/>
</template>

