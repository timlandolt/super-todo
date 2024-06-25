<template>

  <div class="container edit-container">
    <form id="edit-form" @submit.prevent="onTodoSubmit()">
      <div>
        <input type="text" name="todo-title" v-model="todoTitleField" id="todo-title-input" class="underlined-input"
               placeholder="Todo Title*" required>
        <input type="text" name="todo-creator" v-model="todoCreatorField" id="todo-creator-input"
               class="underlined-input" placeholder="Your Name">
      </div>
      <textarea name="todo-content" v-model="todoContentField" id="todo-content-input" class="focus-default"
                rows="3"></textarea>
      <select name="todo-category" v-model="todoCategoryField" id="todo-category" required>
        <option selected disabled class="invisible" value="">Kategorie *</option>
        <option value="helo">Helo</option>
        <option value="world">World</option>
      </select>
      <div class="priority-wrapper">
        <div class="importance-wrapper">
          <label for="todo-importance-input">Wichtig</label>
          <input type="checkbox" name="todo-importance" v-model="todoImportanceField" id="todo-importance-input">
        </div>
        <div class="urgency-wrapper">
          <label for="todo-urgency-input">Dringend</label>
          <input type="checkbox" name="todo-urgency" v-model="todoUrgencyField" id="todo-urgency-input">
        </div>
        <img src="../assets/img/arrow_short.svg" alt="" draggable="false">
        <p>{{ priorityText }}</p>
      </div>
      <div class="date-wrapper">
        <span id="start-date-wrapper">
        <input type="date" name="todo-start-date" v-model="todoStartDateField" id="todo-start-date-input"
               class="underlined-input" required>*</span>
        <img src="../assets/img/arrow_short.svg" alt="" draggable="false">
        <input type="date" name="todo-end-date" v-model="todoEndDateField" id="todo-end-date-input"
               class="underlined-input"
               :class="{'illegal-date': !isLegalDate}">
      </div>

      <p>* zwingend benötigt</p>
      <div class="button-wrapper">
        <button id="cancel-button" @click="clearTodoForm">Abbrechen</button>
        <button id="add-button">Hinzufügen</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import {getPriority, getPriorityColor, getPriorityText} from "@/priority.js";
import {ref, watch, reactive} from "vue";
import {useTodoListStore} from "@/stores/todo-list.js";

const todoListStore = useTodoListStore();

const todoTitleField = ref('');
const todoCreatorField = ref('');
const todoContentField = ref('');
const todoCategoryField = ref('');
const todoImportanceField = ref(false);
const todoUrgencyField = ref(false);
const todoStartDateField = ref('');
const todoEndDateField = ref('');

// Priority
const priority = ref(getPriority(todoImportanceField.value, todoUrgencyField.value));
const priorityText = ref(getPriorityText(priority.value));
const priorityTextColor = ref(getPriorityColor(priority.value));

watch([todoImportanceField, todoUrgencyField], () => {
  priority.value = getPriority(todoImportanceField.value, todoUrgencyField.value);
  priorityText.value = getPriorityText(priority.value);
  priorityTextColor.value = getPriorityColor(priority.value);
});

// Date
const isLegalDate = ref(true);
watch([todoStartDateField, todoEndDateField], () => {
  let startDate = Date.parse(todoStartDateField.value);
  let endDate = Date.parse(todoEndDateField.value);
  isLegalDate.value = checkDateLegality(startDate, endDate);
});

function onTodoSubmit() {
  addTodoFromCurrentInputBinds();
  clearTodoForm();
}

function addTodoFromCurrentInputBinds() {
  todoListStore.addTodo(
      {
        title: todoTitleField.value.trim(),
        creator: todoCreatorField.value.trim(),
        content: todoContentField.value.trim(),
        category: todoCategoryField.value.trim(),
        priority: priority.value,
        start: todoStartDateField.value,
        end: todoEndDateField.value,
        completed: false,
      }
  );
}

function checkDateLegality(startDate, endDate) {
  return isNaN(endDate) ? true : endDate >= startDate;
}

function clearTodoForm() {
  todoTitleField.value = '';
  todoCreatorField.value = '';
  todoContentField.value = '';
  todoCategoryField.value = '';
  todoImportanceField.value = false;
  todoUrgencyField.value = false;
  todoStartDateField.value = '';
  todoEndDateField.value = '';
}
</script>

<style scoped lang="scss">
@import "../assets/scss/_variables.scss";

.edit-container {
  overflow: scroll;

  #edit-form {
    display: flex;
    flex-direction: column;

    height: calc(100vh - 15rem);

    .underlined-input {
      margin: 0;
      padding: 0;
      border: none;
      outline: none;
      background-color: transparent;
      border-bottom: $color-dark 3px solid;

      &::placeholder {
        color: $color-gray;
        opacity: 1;
      }
    }

    & > div:first-of-type {
      display: flex;
      justify-content: space-between;
      align-items: end;

      #todo-title-input {
        font-size: 3rem;
        height: 3rem;
        width: min(22rem, 70%);
      }

      #todo-creator-input {
        font-size: 1.5rem;
        height: 1.5rem;
        width: min(10rem, 30%);
      }
    }

    textarea {
      background-color: transparent;
      outline: none;
      resize: none;
      width: calc(100% - 2rem);
      padding: .6rem;
      margin-block: 1rem;
      font-size: 1.2rem;
      line-height: 1.4rem;

      border: 4px solid $accent-yellow;
      border-radius: 5px;

    }

    select {
      background-color: transparent;
      border: none;
      border-bottom: $color-dark 3px solid;
      width: fit-content;
      height: 2.2rem;

      font-size: 1.2rem;
      font-weight: bold;

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

    .priority-wrapper {
      margin-block: 2rem 4rem;

      display: flex;
      flex-direction: row;
      gap: 1.2rem;
      align-items: center;

      font-size: 1.5rem;

      .importance-wrapper, .urgency-wrapper {

        display: flex;
        align-items: center;
        gap: 0.3rem;

        input[type="checkbox"] {
          appearance: none;
          border: 3px solid $color-dark;
          border-radius: 2px;
          width: 1.2rem;
          height: 1.2rem;

          &:checked {
            background-color: $color-dark;
            background-image: url("../assets/img/check_small.svg");
            background-repeat: no-repeat;
            background-size: cover;
            background-position: bottom;
          }
        }
      }

      p {
        width: fit-content;
        height: 1.7rem;
        line-height: 1.8rem;
        margin: 0;
        display: inline;
        color: v-bind(priorityTextColor);
        text-wrap: avoid;
        word-wrap: anywhere;
        hyphens: auto;
      }
    }

    .date-wrapper {
      display: flex;
      flex-direction: row;
      gap: 1.2rem;
      align-items: center;

      input[type="date"] {
        appearance: none;
        background-color: transparent;
        outline: none;
        height: 2rem;
        font-size: 1.2rem;

        cursor: text;
      }

      #todo-end-date-input {
        opacity: 0.3;
      }

      .illegal-date {
        opacity: 1 !important;
        border-bottom: $accent-red 3px solid !important;
        color: $accent-red !important;
      }
    }

    .button-wrapper {
      margin-block: auto 2rem;

      display: flex;
      justify-content: space-between;

      button {
        padding: 0;
        appearance: none;
        background-color: transparent;
        border: none;
        font-size: 1.5rem;
        line-height: 1.5rem;
        font-weight: bold;
        cursor: pointer;
      }

      #cancel-button {
        color: $accent-red;
      }

      #add-button {
        color: $accent-green;
      }
    }
  }
}
</style>