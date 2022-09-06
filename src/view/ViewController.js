import TodoGroupsContainer from "../logic/TodoGroupsContainer";
import * as htmlGenerator from "./HtmlGenerator";

export default class viewController {
    constructor(rootElement) {
        this.root = rootElement;
        this.TodoGroupsContainer = new TodoGroupsContainer();
    }

    updateView() {
        this.clearView();
        this.renderTodoGroups();   
    }

    clearView() {
        this.root.innerHTML = '';
    }

    renderTodoGroups() {
        let groups = this.TodoGroupsContainer.getAllTodoGroups();
        groups.forEach(group => {
            this.renderTodoGroup(group);
        });
    }

    renderTodoGroup(group) {
        const groupNode = htmlGenerator.newTodoGroupElement(group);
        this.root.appendChild(groupNode);
    }
}
