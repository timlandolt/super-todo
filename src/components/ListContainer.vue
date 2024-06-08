<script setup>

</script>

<template>
  <div class="container list-container">
    <div class="list-head">
      <form id="search-form">
        <input type="search" name="search" id="todo-search" placeholder="Search To-dos...">
        <button type="submit" id="search-button"></button>
      </form>
      <p>80%</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "../assets/scss/_variables.scss";

.list-container {
  .list-head {
    display: flex;
    justify-content: space-between;

    form {
      input[type=search] {
        background-color: $color-light;
        border: 4px solid $accent-yellow;
        border-radius: 100px;
        font-size: 1.1rem;
        outline: $color-light solid 0;
        font-weight: bold;
        padding-inline: 1rem;
        padding-top: 5px;
        height: 2.2rem;


        &:focus {
          outline: $color-gray solid 2px;
          transition: outline 100ms linear;
        }

        &::placeholder {
          color: $color-gray;
          opacity: 1;
        }
      }
    }
  }
}
</style>