import { createProject } from "./Project";

export function createProjectsContainer(projects) {
    let projectsContainerMaker = new ProjectsContainer(projects);
    projectsContainerMaker.addAllProjects();

    return projectsContainerMaker.getElement();
}

class ProjectsContainer {
    constructor(projects) {
        this.projects = projects;
        this.projectsContainer = document.createElement('div');
        this.projectsContainer.id = 'projects-container';
    }

    addAllProjects() {
        this.projects.forEach(project => {
            const projectElement = createProject(project);
            this.projectsContainer.appendChild(projectElement);
        });
    }

    getElement() {
        return this.projectsContainer;
    }
}