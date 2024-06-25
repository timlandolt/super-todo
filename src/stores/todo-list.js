import { defineStore } from 'pinia';
import { ref, watch } from 'vue';

export const useTodoListStore = defineStore('todoList', () => {
    const todoList = ref([]);

    let completedPercentage = ref(100);
    watch(todoList, () => {
        let absoluteCompletedValue = todoList.value.filter(todo => todo.completed).length;
        if (absoluteCompletedValue !== 0) {
            completedPercentage.value = Math.round(absoluteCompletedValue * 100 / todoList.value.length);
        } else if (todoList.value.length > 0) {
            completedPercentage.value = 0;
        } else {
            completedPercentage.value = 100;
        }
    });

    function addTodo(todo) {
        todoList.value.push(todo);
    }

    return { todoList, addTodo, completedPercentage };
});
