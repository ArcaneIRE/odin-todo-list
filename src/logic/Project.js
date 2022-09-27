import Todo from "./Todo";
import PubSub from "pubsub-js";
import { 
    MODEL_UPDATED, 
    CHANGE_PROJECT_TITLE, 
    PROJECT_EXPAND_TOGGLE,
    ADD_TODO, 
    EDIT_TODO, 
    DELETE_TODO,
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
        this.expandProjectToggleSubscribe();
        this.addTodoSubscribe();
        this.editTodoSubscribe();
        this.deleteTodoSubscribe();
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
        PubSub.subscribe(topic, (msg, editInfo) => {
            const index = editInfo.index;
            const todoData = editInfo.editData;
            this.todos[index].edit(todoData);
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

    expandProjectToggleSubscribe() {
        const topic = PROJECT_EXPAND_TOGGLE + this.id.toString();
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
