<script setup></script>

<template>
  <div class="home">
    <section class="form-column"></section>
    <section class="preview-column"></section>
  </div>
</template>

<style scoped>
.home {
  display: flex;
  min-height: 100svh;
}

.form-column {
  flex: 1 1 45%;
  padding: 48px;
  border-right: 1px solid var(--border);
}

.preview-column {
  flex: 1 1 55%;
  padding: 48px;
  background: var(--surface);
}
</style>
