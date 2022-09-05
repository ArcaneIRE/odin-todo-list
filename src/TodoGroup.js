import Todo from "./Todo";

export default class TodoGroup {
    constructor (name) {
        this.name = name;
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
