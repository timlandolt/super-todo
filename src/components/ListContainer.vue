<template>
  <div class="container list-container">
    <div class="list-head">
      <form id="search-form">
        <input type="search" name="search" id="todo-search" class="focus-default" placeholder="Search To-dos...">
        <button type="submit" id="search-button" class="focus-default"></button>
      </form>
      <p class="completed-percentage">{{ todoListStore.completedPercentage }}%</p>
    </div>
    <p>{{ todoListStore.todoList }}</p>
  </div>
</template>

<script setup>

import {useTodoListStore} from "@/stores/todo-list.js";
import {Color} from "@/priority.js";
import {ref, watch} from "vue";

const todoListStore = useTodoListStore();

let completedPercentage = todoListStore.completedPercentage;
let color = ref(getColor(completedPercentage));

watch([todoListStore.todoList], () => {
  color.value = getColor(completedPercentage);
});


function getColor(completedPercentage) {

  if (completedPercentage < 33.33) {
    return Color.Accent.RED;
  } else if (completedPercentage < 66.66) {
    return Color.Accent.YELLOW;
  } else {
    return Color.Accent.GREEN;
  }
}
</script>

<style scoped lang="scss">
@import "../assets/scss/_variables.scss";

.list-container {
  .list-head {
    display: flex;
    justify-content: space-between;

    form {
      display: flex;
      align-items: center;
      gap: 1rem;

      input[type=search] {
        background-color: transparent;
        border: 4px solid $accent-yellow;
        border-radius: 100px;
        font-size: 1.1rem;
        outline: $color-light solid 0;
        font-weight: bold;
        padding-inline: 1rem;
        padding-top: 5px;
        height: 2.2rem;


        &::placeholder {
          color: $color-gray;
          opacity: 1;
        }
      }

      button {
        background-color: transparent;
        outline: none;
        border: none;
        background-image: url("../assets/img/search.svg");
        background-repeat: no-repeat;
        background-size: contain;
        width: 2rem;
        height: 2rem;
      }
    }

    .completed-percentage {
      font-weight: bold;
      font-size: 1.5rem;
      color: v-bind(color);
      margin: 0;
    }
  }
}
</style>