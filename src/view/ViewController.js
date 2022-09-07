import ProjectsContainer from "../logic/ProjectsContainer";
import * as elementGenerator from "./elementGenerator";

export default class viewController {
    constructor(rootElement) {
        this.root = rootElement;
        this.projectsContainer = new ProjectsContainer();
    }

    updateView() {
        this.clearView();
        this.renderHeader();
        this.renderProjects();   
    }

    clearView() {
        this.root.innerHTML = '';
    }

    renderHeader() {
        const header = elementGenerator.newHeaderElement(
            this.projectsContainer
        );
        this.root.appendChild(header);
    }

    renderProjects() {
        let projects = this.projectsContainer.getAllProjects();
        projects.forEach(project => {
            this.renderProject(project);
        });
    }

    renderProject(group) {
        const projectElement = elementGenerator.newTodoGroupElement(group);
        this.root.appendChild(projectElement);
    }
}
