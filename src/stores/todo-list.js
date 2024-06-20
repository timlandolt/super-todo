import {defineStore} from 'pinia'

export const useTodoListStore = defineStore('todoList', () => {
    const todoList = [{"author": "Tim"}];

    return {todoList}
})
