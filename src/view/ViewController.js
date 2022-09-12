import PubSub from "pubsub-js";
import {PROJECTS_UPDATED, CREATE_PROJECT} from '../event-types';

class viewController {
    constructor() {
        this.root = document.getElementById('app');

        this.projects = [];
        PubSub.subscribe(PROJECTS_UPDATED, (msg, projects) => {
            this.projects = projects;
            this.updateView();
        })
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
        addProjectButton.innerText = 'Add Project';
        addProjectButton.addEventListener('click', () => {
            PubSub.publish(CREATE_PROJECT);
        })
        header.appendChild(addProjectButton);
    
        this.root.appendChild(header);
        }

    renderProjects() {
        this.projects.forEach(project => {
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
    
        this.root.appendChild(projectContainer);
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