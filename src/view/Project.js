export function createProject(projectData) {
    const project = new Project(projectData);
    project.addTitle();
    project.addBody();

    return project.getElement();
}

class Project {
    constructor(projectData) {
        this.projectData = projectData;
        this.project = document.createElement('div');
        this.project.classList.add('project-container');
    }

    addTitle() {
        const titleElement = document.createElement('h3');
        titleElement.innerText = this.projectData.title;
        titleElement.classList.add('project-container-title');
    
        this.project.appendChild(titleElement);
    }
    
    addBody() {
        const body = document.createElement('div');
    
        const todos = this.projectData.getAllTodos()
        todos.forEach(todo => {
            body.appendChild(newTodoElement(todo));
        });
    
        this.project.appendChild(body);
    }

    getElement() {
        return this.project;
    }
}