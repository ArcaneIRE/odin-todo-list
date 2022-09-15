import Todo from "./Todo";
import PubSub from "pubsub-js";
import { 
    MODEL_UPDATED, 
    CHANGE_PROJECT_TITLE, 
    ADD_TODO, 
    EDIT_TODO, 
    DELETE_TODO, 
    EXPAND_TOGGLED
} from "../event-types";

export default class Project {
    constructor (id) {
        this.id = id;
        this.title = 'New Project';
        this.todos = [];
        this.isExpanded = false;

        this.pubsubSubscribe();
    }

    pubsubSubscribe() {
        this.changeTitleSubscribe();
        this.addTodoSubscribe();
        this.editTodoSubscribe();
        this.deleteTodoSubscribe();
        this.expandToggledSubscribe();
    }

    changeTitleSubscribe() {
        const topic = CHANGE_PROJECT_TITLE + this.id.toString();
        PubSub.subscribe(topic, (msg, newTitle) => {
            this.title = newTitle;
            PubSub.publish(MODEL_UPDATED);
        })
    }

    addTodoSubscribe() {
        const topic = ADD_TODO + this.id.toString();
        PubSub.subscribe(topic, () => {
            this.addTodo();
            PubSub.publish(MODEL_UPDATED);
        })
    }

    editTodoSubscribe() {
        const topic = EDIT_TODO + this.id.toString();
        PubSub.subscribe(topic, (msg, {index, TodoData}) => {
            console.table(msg, index, TodoData);
            this.todos[index].edit(TodoData);
            PubSub.publish(MODEL_UPDATED);
        })
    }

    deleteTodoSubscribe() {
        const topic = DELETE_TODO + this.id.toString();
        PubSub.subscribe(topic, (msg, todoIndex) => {
            this.deleteTodo(todoIndex);
            PubSub.publish(MODEL_UPDATED);
        })
    }

    expandToggledSubscribe() {
        const topic = EXPAND_TOGGLED + this.id.toString();
        PubSub.subscribe(topic, () => {
            this.isExpanded = !this.isExpanded;
            PubSub.publish(MODEL_UPDATED);
        });
    }

    addTodo() {
        this.todos.push(new Todo());
    }

    deleteTodo(index) {
        this.todos.splice(index, 1);
    }
}
