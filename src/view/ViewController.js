import TodoGroupsContainer from "../logic/TodoGroupsContainer";
import * as elementGenerator from "./elementGenerator";

export default class viewController {
    constructor(rootElement) {
        this.root = rootElement;
        this.TodoGroupsContainer = new TodoGroupsContainer();
    }

    updateView() {
        this.clearView();
        this.renderHeader();
        this.renderTodoGroups();   
    }

    clearView() {
        this.root.innerHTML = '';
    }

    renderHeader() {
        let header = elementGenerator.newHeaderElement();
        this.root.appendChild(header);
    }

    renderTodoGroups() {
        let groups = this.TodoGroupsContainer.getAllTodoGroups();
        groups.forEach(group => {
            this.renderTodoGroup(group);
        });
    }

    renderTodoGroup(group) {
        const groupNode = elementGenerator.newTodoGroupElement(group);
        this.root.appendChild(groupNode);
    }
}
