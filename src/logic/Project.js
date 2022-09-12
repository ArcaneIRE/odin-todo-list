import Todo from "./Todo";

export default class Project {
    constructor (id) {
        this.id = id;
        this.title = 'New Project';
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
