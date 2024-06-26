<template>
  <div class="container list-container">
    <div class="list-head">
      <form id="search-form">
        <input type="search" name="search" id="todo-search" class="focus-default" placeholder="Search To-dos...">
        <button type="submit" id="search-button" class="focus-default"></button>
      </form>
      <p class="completed-percentage">{{ todoListStore.completedPercentage }}%</p>
    </div>
    <div class="list-items">
      <div v-for="todo in todoListStore.todoList" class="todo-container">
        <input type="checkbox" :name="'done-checkbox-' + todo.id" :id="'done-checkbox-' + todo.id">
        <div class="todo-left-wrapper">
          <h4 class="todo-title">{{ todo.title }}</h4>
          <p v-if="todo.creator !== ''" class="todo-creator">{{ todo.creator }}</p>
          <p v-if="todo.content !== ''" class="todo-content">{{ todo.content }}</p>
        </div>
        <div class="todo-middle-wrapper">
          <select :name="'todo-category-' + todo.id" :id="'todo-category-' + todo.id">
            <option value="Arbeit" :selected="todo.category === 'Arbeit'">Arbeit</option>
            <option value="Bürokratie" :selected="todo.category === 'Bürokratie'">Bürokratie</option>
            <option value="Einkaufen" :selected="todo.category === 'Einkaufen'">Einkaufen</option>
            <option value="Familie" :selected="todo.category === 'Familie'">Familie</option>
            <option value="Sport" :selected="todo.category === 'Sport'">Sport</option>
          </select>
          <p :class="'priority-' + todo.priority">{{ getPriorityText(todo.priority) }}</p>
        </div>
        <p v-html="formatStartAndEndDate(todo.start, todo.end)" class="todo-date"></p>
        <div class="button-wrapper">
          <button @click="todoListStore.deleteTodo(todo.id)" class="todo-delete-button"></button>
          <button @click="editTodoFunction(todo.id)" class="todo-edit-button"></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

import {useTodoListStore} from "@/stores/todo-list.js";
import {Color, getPriorityText} from "@/priority.js";
import {ref, watch, inject} from "vue";

const todoListStore = useTodoListStore();

const editTodoFunction = inject('editTodoFunction');

let completedPercentage = todoListStore.completedPercentage;
let color = ref(getColor(completedPercentage));

watch([todoListStore.todoList], () => {
  color.value = getColor(completedPercentage);
});

function formatStartAndEndDate(startDate, endDate) {
  let formattedEndDate = (endDate) ? "<br>- " + formatDate(endDate) : "";
  return formatDate(startDate) + formattedEndDate;
}

function formatDate(date) {
  let splitDate = date.split("-");
  splitDate = splitDate.reverse();
  return splitDate.join("/");
}

function getColor(completedPercentage) {

  if (completedPercentage < 50) {
    return Color.Accent.RED;
  } else if (completedPercentage < 75) {
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
    margin-bottom: 0.5rem;

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

  .list-items {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: scroll;

    .todo-container {
      position: relative;

      min-height: 5rem;
      padding: 1rem 1rem;
      border: 4px solid $color-gray;
      border-radius: 7px;

      display: flex;
      align-items: center;
      gap: 0.7rem;

      input[type="checkbox"] {
        appearance: none;
        border: 3px solid $color-gray;
        border-radius: 3px;
        width: 1.2rem;
        height: 1.2rem;

        &:checked {
          background-color: $color-gray;
          background-image: url("../assets/img/check_small.svg");
          background-repeat: no-repeat;
          background-size: cover;
          background-position: bottom;
        }
      }

      .todo-left-wrapper {
        max-width: 40%;

        display: flex;
        flex-direction: column;

        .todo-title {
          margin: 0;

          font-size: 1.5rem;
          line-height: 1.5rem;
        }

        .todo-creator {
          margin: 0;

          font-size: 0.7rem;
          line-height: 0.7rem;

          color: $color-gray;
        }

        .todo-content {
          margin: 0.3rem 0 0;

          line-height: 1rem;
        }
      }

      .todo-middle-wrapper {
        margin-inline: auto;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;

        select {
          height: 1.8rem;
          padding: 0;
          border: none;

          font-size: 1.2rem;
          font-weight: bold;

          background-color: transparent;
          cursor: pointer;

          option {
            cursor: pointer;
            font-family: "Kadwa", monospace;
            font-weight: normal;
            background-color: $color-light;
            border: none;
            outline: none;

            &:hover {
              background-color: $color-light;
              outline: $color-gray;
            }
          }
        }

        p {
          margin: 0;

          font-size: 1.2rem;
          line-height: 1.2rem;
        }

        .priority-0 {
          color: $accent-green;
        }

        .priority-1, .priority-2 {
          color: $accent-yellow;
        }

        .priority-3 {
          color: $accent-red;
        }
      }

      .todo-date {
        margin: 0;

        font-size: 0.7rem;
        line-height: 1rem;
        font-weight: bold;
        text-align: right;

        color: $color-gray;

      }

      .button-wrapper {
        position: absolute;
        bottom: 1rem;
        right: 1rem;
        display: flex;
        gap: 0.3rem;

        button {
          appearance: none;

          width: 1rem;
          height: 1rem;
          padding: 0;
          border: none;

          background-color: transparent;
          cursor: pointer;

          background-repeat: no-repeat;
          background-position: center;
        }

        .todo-delete-button {
          background-image: url("../assets/img/delete.svg");
        }

        .todo-edit-button {
          background-image: url("../assets/img/edit.svg");
        }

      }
    }
  }
}
</style>