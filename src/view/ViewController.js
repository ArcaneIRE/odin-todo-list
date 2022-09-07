import ProjectsContainer from "../logic/ProjectsContainer";
const projectsContainer = new ProjectsContainer();

class viewController {
    constructor() {
        this.root = document.getElementById('app');
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
        const header = document.createElement('header');
        header.classList = 'header';
        
        const title = document.createElement('h1');
        title.classList = 'header-title';
        title.innerText = 'Todo List.';
        header.appendChild(title);
    
        const addProjectButton = document.createElement('button');
        addProjectButton.classList = 'header-new-group-button';
        addProjectButton.innerText = 'Add List';
        header.appendChild(addProjectButton);
    
        this.root.appendChild(header);
        }

    renderProjects() {
        let projects = projectsContainer.getAllProjects();
        projects.forEach(project => {
            this.renderProject(project);
        });
    }

    renderProject(project) {
        const projectContainer = document.createElement('div');
        projectContainer.classList.add('project-container');
    
        const title = this.makeProjectTitle(project.title);
        projectContainer.appendChild(title);
    
        const body = this.makeProjectBody(project);
        projectContainer.appendChild(body);
    
        this.root.appendChild(projectElement);
    }

    makeProjectTitle(title) {
        const projectTitle = document.createElement('h3');
        projectTitle.innerText = title;
        projectTitle.classList.add('project-container-title');
    
        return projectTitle;
    }
    
    makeProjectBody(project) {
        const projectBody = document.createElement('div');
    
        const todos = project.getAllTodos()
        todos.forEach(todo => {
            projectBody.appendChild(newTodoElement(todo));
        });
    
        return projectBody;
    }
    
    makeTodoElement(todo) {
        let todoElement = document.createElement('p');
        todoElement.innerHTML = todo.title;
    
        return todoElement;
    }
}

export default new viewController();