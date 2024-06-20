<template>

  <div class="container edit-container">
    <form id="edit-form" @submit.prevent="onTodoSubmit()">
      <div>
        <input type="text" name="todo-title" v-model="todoTitleField" id="todo-title-input" class="underlined-input"
               placeholder="Todo Title">
        <input type="text" name="todo-creator" id="todo-creator-input" class="underlined-input" placeholder="Your Name">
      </div>
      <textarea name="todo-content" id="todo-content-input" rows="3"></textarea>
      <select name="todo-category" id="todo-category">
        <option selected disabled class="invisible">Kategorie</option>
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
        <img src="../assets/img/arrow_short.svg" alt="">
        <p>{{ priorityText }}</p>
      </div>
      <div class="date-wrapper">
        <input type="date" name="todo-start-date" id="todo-start-date-input">
        <img src="../assets/img/arrow_short.svg" alt="">
        <input type="date" name="todo-end-date" id="todo-end-date-input">
      </div>
      <div class="button-wrapper">
        <button id="cancel-button">Abbrechen</button>
        <button id="add-button">Hinzufügen</button>
      </div>
    </form>
    <h1>{{ todoTitleField }}</h1>
  </div>
</template>

<script setup>
import {getPriority, getPriorityColor, getPriorityText} from "@/priority.js";
import {ref, watch} from "vue";

const todoTitleField = ref('');
const todoImportanceField = ref(false);
const todoUrgencyField = ref(false);

const priority = ref(getPriority(todoImportanceField.value, todoUrgencyField.value));
const priorityText = ref(getPriorityText(priority.value));
const priorityTextColor = ref(getPriorityColor(priority.value));

watch([todoImportanceField, todoUrgencyField], () => {
  priority.value = getPriority(todoImportanceField.value, todoUrgencyField.value);
  priorityText.value = getPriorityText(priority.value);
  priorityTextColor.value = getPriorityColor(priority.value);
});


function onTodoSubmit() {
  alert(`"${todoUrgencyField}", "${todoImportanceField}"`);
}


</script>

<style scoped lang="scss">
@import "../assets/scss/_variables.scss";

.edit-container {
  #edit-form {

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
      margin-bottom: 1rem;

      #todo-title-input {
        font-size: 4rem;
        height: 4rem;
        width: min(20rem, 60%);
      }

      #todo-creator-input {
        font-size: 1.5rem;
        height: 1.5rem;
        width: min(10rem, 40%);
      }
    }

    textarea {
      background-color: transparent;
      outline: none;
      resize: none;
      width: 100%;

      border: 4px solid $accent-yellow;
      border-radius: 5px;

    }

    select {
      background-color: transparent;
      border: none;
      border-bottom: $color-dark 3px solid;
      height: 2.2rem;

      font-size: 1.2rem;
      font-weight: bold;
      color: $color-dark;

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

  }
}
</style>