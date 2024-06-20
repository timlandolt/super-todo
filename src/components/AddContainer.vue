<template>

  <div class="container edit-container">
    <form id="edit-form" @submit.prevent="onTodoSubmit()">
      <div>
        <input type="text" name="todo-title" v-model="todoTitleField" id="todo-title-input" class="underlined-input" placeholder="Todo Title">
        <input type="text" name="todo-creator" id="todo-creator-input" class="underlined-input" placeholder="Your Name">
      </div>
      <textarea name="todo-content" id="todo-content-input" rows="3"></textarea>
      <select name="todo-category" id="todo-category">
        <option value="helo">Helo</option>
      </select>
      <div class="priority-wrapper">
        <div class="importance-wrapper">
          <label for="todo-importance-input">Wichtig</label>
          <input type="checkbox" name="todo-importance" id="todo-importance-input">
        </div>
        <div class="urgency-wrapper">
          <label for="todo-urgency-input">Dringend</label>
          <input type="checkbox" name="todo-urgency" id="todo-urgency-input">
        </div>
        <img src="../assets/img/arrow_long.svg" alt="">
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
    <h1>{{todoTitleField}}</h1>
  </div>
</template>

<script setup>

let todoTitleField = '';

let priorityText = "Weg damit";
let priorityColor = getPriorityColor(0, 0);

function onTodoSubmit() {
  alert(todoTitleField);
}

function getPriorityColor(importance, urgency) {
  return "#81B29A";
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

    .priority-wrapper {
      display: flex;
      flex-direction: row;

      p {
        margin: 0;
        width: fit-content;
        display: inline;
      }
    }
  }
}
</style>