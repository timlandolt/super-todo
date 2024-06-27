<template>
  <Logo/>
  <main>
    <ListContainer/>
    <AddContainer/>
  </main>
</template>

<script setup>
import {provide, ref} from "vue";
import Logo from "@/components/Logo.vue";
import ListContainer from "@/components/ListContainer.vue";
import AddContainer from "@/components/AddContainer.vue";

const editTodoFunction = ref(() => {
});

provide("editTodoFunction", editTodoFunction);

</script>

<style scoped lang="scss">
@import "assets/scss/_variables.scss";

main {
  display: flex;
  justify-content: center;
  gap: 6rem;
  margin-inline: 10%;

  @media screen and (max-width: 1550px) {
    flex-direction: column;
    align-items: center;
  }
}
</style>
