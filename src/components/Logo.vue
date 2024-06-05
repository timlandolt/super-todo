<script setup>

</script>

<template>
  <header>
    <img src="/super-todo-logo.svg" alt="" draggable="false">
    <h1>Super ToDo</h1>
  </header>
</template>

<style scoped lang="scss">
@import "../assets/scss/_variables.scss";

header {
  display: flex;
  gap: 0.8rem;
  align-items: center;
  width: 100vw;
  justify-content: center;
  margin-block: 1rem;

  img {
    margin-bottom: 1rem;
    width: 4rem;
  }

  h1 {
    font-family: Kadwa, monospace;
    color: $color-dark;
    font-size: 4rem;
    margin: 0;
  }
}
</style>
