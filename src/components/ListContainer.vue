<template>
  <div class="container list-container">
    <div class="list-head">
      <div class="search-form">
        <img src="../assets/img/search.svg" alt="Read search icon" id="search-icon">
        <input
            type="search"
            name="search"
            id="todo-search"
            class="focus-default"
            placeholder="Search To-dos..."
            v-model="searchQuery"
        >
      </div>
      <p class="completed-percentage">{{ todoListStore.completedPercentage }}%</p>
    </div>
    <div class="list-items">
      <div
          v-for="todo in filteredTodos"
          class="todo-container">
        <input type="checkbox" :name="'done-checkbox-' + todo.id" :id="'done-checkbox-' + todo.id"
               :checked="todo.completed"
               @change="todoListStore.toggleCompleted(todo.id)">
        <div class="todo-left-wrapper">
          <EditableTitle v-model="todo.title"/>
          <p v-if="todo.creator" class="todo-creator">{{ todo.creator }}</p>
          <EditableContent v-if="todo.content" v-model="todo.content"/>
        </div>
        <div class="todo-middle-wrapper">
          <select v-model="todo.category" :name="'todo-category-' + todo.id" :id="'todo-category-' + todo.id">
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
import {Color, getPriorityText, resolvePriority} from "@/priority.js";
import {ref, watch, inject, computed} from "vue";
import EditableTitle from "@/components/EditableTitle.vue";
import EditableContent from "@/components/EditableContent.vue";

const todoListStore = useTodoListStore();
const editTodoFunction = inject('editTodoFunction');
const searchQuery = ref('');

const filteredTodos = computed(() => {
  const query = searchQuery.value.toLowerCase().trim();
  if (!query) return todoListStore.todoList;
  return todoListStore.todoList.filter(todo =>
      `${todo.title};${todo.category};${todo.creator};${getPriorityText(todo.priority)}`.toLowerCase().includes(query)
  );
});

let color = ref(getColor(todoListStore.completedPercentage));

watch(() => todoListStore.completedPercentage, (newVal) => {
  color.value = getColor(newVal);
});

function formatStartAndEndDate(startDate, endDate) {
  let formattedEndDate = endDate ? "<br>- " + formatDate(endDate) : "";
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

    .search-form {
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

      img {
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


        .todo-creator {
          margin: 0;

          font-size: 0.7rem;
          line-height: 0.7rem;

          color: $color-gray;
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