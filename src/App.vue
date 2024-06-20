<script>
import Logo from "@/components/Logo.vue";
import ListContainer from "@/components/ListContainer.vue";
import AddContainer from "@/components/AddContainer.vue";

export default {
  name: 'app',
  components: {AddContainer, ListContainer, Logo},
  created() {
    document.title = "Super ToDo";
    document.getElementsByTagName("html")[0].lang = "de";
  }
}
</script>

<template>
  <Logo/>
  <main>
    <ListContainer />
    <AddContainer />
  </main>
</template>

<style scoped lang="scss">
@import "assets/scss/_variables.scss";

main {
  display: flex;
  justify-content: center;
  gap: 6rem;
  margin-inline: 10%;

  @media screen and (max-width: 1550px){
    flex-direction: column;
    align-items: center;
  }
}
</style>
