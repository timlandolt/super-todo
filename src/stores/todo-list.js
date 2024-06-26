import {defineStore} from 'pinia';
import {ref, watch} from 'vue';

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
        todo.id = getNextId();
        todoList.value.push(todo);
    }

    function deleteTodo(id) {
        todoList.value = todoList.value.filter(todo => todo.id !== id);
    }

    function getNextId() {
        let largestId = 0;
        todoList.value.forEach(todo => {
            if (todo.id > largestId) largestId = todo.id;
        });
        return largestId + 1;
    }

    return {todoList, addTodo, deleteTodo, completedPercentage};
});
