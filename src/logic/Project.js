import Todo from "./Todo";

export default class Project {
    constructor (title) {
        this.title = title;
        this.todos = [];
    }

    addTodo(title) {
        this.todos.push(new Todo(title));
    }

    deleteTodo(index) {
        this.todos.splice(index, 1);
    }

    getAllTodos() {
        return this.todos;
    }
}
