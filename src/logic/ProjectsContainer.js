import Project from "./Project";

export default class ProjectsContainer {
    constructor() {
        this.projects = []
    }

    newProject (title) {
        this.projects.push(new Project(title));
    }
    
    deleteProject(index) {
        this.projects.splice(index, 1);
    }
    
    getAllProjects() {
        return this.projects;
    }
}