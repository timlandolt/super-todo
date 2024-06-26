<template xmlns="http://www.w3.org/1999/html">
  <div class="editable-content">
    <p v-if="!isEditing" v-html="content.replace(/\n/g, '<br>')"></p>
    <textarea v-else v-model="editableContent" ref="inputElement"/>
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
const content = ref(props.modelValue);
const editableContent = ref(props.modelValue);
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
  content.value = editableContent.value;
  emit('update:modelValue', content.value);
  isEditing.value = false;
};

watch(() => props.modelValue, (newValue) => {
  content.value = newValue;
  editableContent.value = newValue;
});
</script>

<style scoped lang="scss">
@import "../assets/scss/_variables.scss";

.editable-content {
  display: flex;
  align-items: center;
  gap: 0.5rem;

  p {
    margin: 0.3rem 0 0;

    font-size: 1rem;
    line-height: 1rem;
  }


  textarea {
    width: calc(100% - 2rem);
    height: auto;
    padding: 0.5rem;
    margin: 0.5rem 0 0;

    outline: none;
    font-size: 1rem;
    line-height: 1rem;
    background-color: transparent;
    border: 4px solid $accent-yellow;
    border-radius: 5px;
    resize: none;
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
