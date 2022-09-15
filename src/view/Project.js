import PubSub from "pubsub-js";
import { ADD_TODO, DELETE_PROJECT, EXPAND_TOGGLED } from "../event-types";

import projectStyles from './Project.css';

import plusIcon from '../images/add-icon.svg';
import deleteIcon from '../images/x-icon.svg';

export function createProject(projectData) {
    const project = new Project(projectData);

    return project.getElement();
}

class Project {
    constructor(projectData) {
        this.projectData = projectData;

        this.createContainer();
        this.addHeader();
        this.addBody();
        if (projectData.isExpanded) {
            this.toggleExpand();
        }
    }

    createContainer() {
        const container = document.createElement('div');
        container.classList.add(projectStyles['container']);
        
        container.addEventListener('click', () => {
            const id = this.projectData.id.toString();
            const expandTopic = EXPAND_TOGGLED + id;
            PubSub.publish(expandTopic);
        });
        this.project = container;
    }

    toggleExpand() {
        this.project.classList.toggle(projectStyles['expanded']);
    }

    addHeader() {
        const header = document.createElement('header');
        header.classList.add(projectStyles['header']);
        
        this.addTitle(header);
        this.addDeleteProjectButton(header);

        this.project.appendChild(header);
    }

    addTitle(header) {
        const title = document.createElement('h3');
        title.textContent = this.projectData.title;
        title.classList.add(projectStyles['title']);
    
        header.appendChild(title);
    }

    addDeleteProjectButton(header) {
        const deleteProjectButton = document.createElement('button');
        deleteProjectButton.classList.add(projectStyles['deleteProjectButton'])
        deleteProjectButton.addEventListener('click', e => {
            e.stopPropagation();

            const id = this.projectData.id;
            PubSub.publish(DELETE_PROJECT, id);
        });

        const deleteProjectIcon = document.createElement('img');
        deleteProjectIcon.src = deleteIcon;
        deleteProjectIcon.classList.add(projectStyles['deleteProjectIcon'])
        deleteProjectButton.appendChild(deleteProjectIcon);

        header.appendChild(deleteProjectButton)
    }

    addBody() {
        const body = document.createElement('div');
        body.classList.add(projectStyles['body']);

        this.addTodos(body);
        this.addNewTodoButton(body);

        this.project.appendChild(body);
    }

    addNewTodoButton(body) {
        const newTodoButton = document.createElement('button');
        newTodoButton.classList.add (projectStyles['newTodoButton']);
        
        const newTodoText = document.createElement('p');
        newTodoText.textContent = "Add Todo";
        newTodoButton.appendChild(newTodoText);

        const newTodoImage = document.createElement('img');
        newTodoImage.src = plusIcon;
        newTodoButton.appendChild(newTodoImage);

        newTodoButton.addEventListener('click', e => {
            e.stopPropagation();
            
            const id = this.projectData.id.toString();
            const addTodoTopic = ADD_TODO + id;
            PubSub.publish(addTodoTopic);
        });

        body.appendChild(newTodoButton);
    }
    
    addTodos(body) {
        const todosContainer = document.createElement('div');
        todosContainer.classList.add(projectStyles['todos']);
        
        const todos = this.projectData.todos;
        todos.forEach(todo => {
            const todoElement = document.createElement('p');
            todoElement.textContent = todo.title;
            todoElement.classList.add(projectStyles['todo']);
            todosContainer.appendChild(todoElement);
        });
    
        body.appendChild(todosContainer);
    }

    getElement() {
        return this.project;
    }
}