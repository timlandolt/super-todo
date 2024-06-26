import {defineStore} from 'pinia';
import {computed, ref, watch} from 'vue';

export const useTodoListStore = defineStore('todoList', () => {
    const todoList = ref([
        {
            id: 1,
            title: "Title 1",
            creator: "Tim",
            category: "Arbeit",
            priority: "1",
            start: "2024-11-02",
            completed: false,
        },
        {
            id: 2,
            title: "Title 2",
            category: "Sport",
            priority: "3",
            start: "2024-11-11",
            completed: false,
        },]);

    const completedPercentage = computed(() => {
        const absoluteCompletedValue = todoList.value.filter(todo => todo.completed).length;
        if (absoluteCompletedValue !== 0) {
            return Math.round(absoluteCompletedValue * 100 / todoList.value.length);
        } else if (todoList.value.length > 0) {
            return 0;
        } else {
            return 100;
        }
    });


    function toggleCompleted(id) {
        const todo = todoList.value.find(todo => todo.id === id);
        if (todo) {
            todo.completed = !todo.completed;
        }
    }

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

    return {todoList, completedPercentage, addTodo, deleteTodo, toggleCompleted};
});
