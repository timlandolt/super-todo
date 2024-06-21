<template>
  <div class="container list-container">
    <div class="list-head">
      <form id="search-form">
        <input type="search" name="search" id="todo-search" class="focus-default" placeholder="Search To-dos...">
        <button type="submit" id="search-button" class="focus-default"></button>
      </form>
      <p class="completed-percentage">{{ completedPercentage }}%</p>
    </div>
    <p>{{ todoList }}</p>
  </div>
</template>

<script setup>

import {useTodoListStore} from "@/stores/todo-list.js";

const todoListStore = useTodoListStore();
const todoList = todoListStore.todoList;

let completedPercentage = 80;
let color = getColor(completedPercentage);


function getColor(completedPercentage) {
  const redAccent = "#E07A5F";
  const yellowAccent = "#F2CC8F";
  const greenAccent = "#81B29A";

  if (completedPercentage < 33.33) {
    return redAccent;
  } else if (completedPercentage < 66.66) {
    return yellowAccent;
  } else {
    return greenAccent;
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