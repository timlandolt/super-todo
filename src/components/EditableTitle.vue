<template>
  <div class="editable-title">
    <h4 v-if="!isEditing">{{ title }}</h4>
    <input v-else type="text" v-model="editableTitle" @keyup.enter="saveEdit" ref="inputElement"/>
    <button @click="toggleEdit" :class="isEditing ? 'save-button': 'edit-button'"></button>
  </div>
</template>

<script setup>
import {ref, watch, nextTick} from 'vue';
import {defineProps, defineEmits} from 'vue';

const props = defineProps({
  modelValue: {
    type: String,
    required: true
  }
});

const emit = defineEmits(['update:modelValue']);

const isEditing = ref(false);
const title = ref(props.modelValue);
const editableTitle = ref(props.modelValue);
const inputElement = ref(null);

const toggleEdit = () => {
  isEditing.value = !isEditing.value;
  if (isEditing.value) {
    // Focus the input element when entering edit mode
    nextTick(() => {
      inputElement.value.focus();
    });
  } else {
    saveEdit();
  }
};

const saveEdit = () => {
  title.value = editableTitle.value;
  emit('update:modelValue', title.value);
  isEditing.value = false;
};

watch(() => props.modelValue, (newValue) => {
  title.value = newValue;
  editableTitle.value = newValue;
});
</script>

<style scoped lang="scss">
@import "../assets/scss/_variables.scss";

.editable-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;

  h4 {
    display: inline;
    width: fit-content;
    margin: 0;

    font-size: 1.5rem;
    line-height: 1.5rem;
  }

  input {
    width: calc(100% - 2rem);
    height: 1.5rem;
    padding: 0;
    margin: 0;
    border: none;

    outline: none;
    font-size: 1.5rem;
    font-weight: bold;
    border-bottom: 3px solid $color-dark;
    background-color: transparent;
  }

  button {
    appearance: none;

    width: 1rem;
    height: 1rem;
    padding: 0;
    border: 0;

    background-color: transparent;
    background-repeat: no-repeat;
    background-position: center;
    cursor: pointer;

    &.edit-button {
      background-image: url("../assets/img/edit.svg");
    }

    &.save-button {
      background-image: url("../assets/img/check_gray.svg");
      background-size: cover;
    }
  }
}
</style>
