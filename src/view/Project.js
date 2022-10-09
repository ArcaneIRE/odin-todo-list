import PubSub from 'pubsub-js';
import {
  ADD_TODO, CHANGE_PROJECT_TITLE, DELETE_PROJECT, PROJECT_EXPAND_TOGGLE,
} from '../event-types';
import createTodo from './Todo';

import projectStyles from './Project.css';

import plusIcon from '../images/add-icon.svg';
import deleteIcon from '../images/x-icon.svg';

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
    container.classList.add(projectStyles.container);

    container.addEventListener('click', () => {
      const id = this.projectData.id.toString();
      const expandTopic = PROJECT_EXPAND_TOGGLE + id;
      PubSub.publish(expandTopic);
    });
    this.project = container;
  }

  toggleExpand() {
    this.project.classList.toggle(projectStyles.expanded);
  }

  addHeader() {
    const header = document.createElement('header');
    header.classList.add(projectStyles.header);

    this.addTitle(header);
    this.addDeleteProjectButton(header);

    this.project.appendChild(header);
  }

  addTitle(header) {
    const title = document.createElement('h3');
    title.textContent = this.projectData.title;
    title.classList.add(projectStyles.title);

    title.addEventListener('click', (e) => {
      this.titleChange(e, title);
    });

    header.appendChild(title);
  }

  titleChange(event, title) {
    event.stopPropagation();

    const titleInputForm = document.createElement('form');
    titleInputForm.id = 'titleInputForm';
    titleInputForm.classList.add(projectStyles.titleInputForm);

    const titleInput = document.createElement('input');
    titleInput.id = 'titleInput';
    titleInput.classList.add(projectStyles.titleInput);
    titleInput.type = 'text';
    titleInput.maxLength = 20;
    titleInput.placeholder = title.textContent;
    titleInput.addEventListener('click', (e) => {
      e.stopPropagation();
    });
    titleInput.addEventListener('keyup', (e) => {
      if (e.key === 'Enter') {
        titleInputForm.requestSubmit();
      }
    });
    titleInputForm.appendChild(titleInput);

    titleInputForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let input;
      if (titleInput.value !== '') {
        input = titleInput.value;
      } else {
        input = titleInput.placeholder;
      }

      const id = this.projectData.id.toString();
      const topic = CHANGE_PROJECT_TITLE + id;
      PubSub.publish(topic, input);
    });

    title.replaceWith(titleInputForm);
    titleInput.focus();
  }

  addDeleteProjectButton(header) {
    const deleteProjectButton = document.createElement('button');
    deleteProjectButton.classList.add(projectStyles.deleteProjectButton);
    deleteProjectButton.addEventListener('click', (e) => {
      e.stopPropagation();

      const { id } = this.projectData;
      PubSub.publish(DELETE_PROJECT, id);
    });

    const deleteProjectIcon = document.createElement('img');
    deleteProjectIcon.src = deleteIcon;
    deleteProjectIcon.classList.add(projectStyles.deleteProjectIcon);
    deleteProjectButton.appendChild(deleteProjectIcon);

    header.appendChild(deleteProjectButton);
  }

  addBody() {
    const body = document.createElement('div');
    body.classList.add(projectStyles.body);

    this.addTodos(body);
    this.addNewTodoButton(body);

    this.project.appendChild(body);
  }

  addNewTodoButton(body) {
    const newTodoButton = document.createElement('button');
    newTodoButton.classList.add(projectStyles.newTodoButton);

    const newTodoText = document.createElement('p');
    newTodoText.textContent = 'Add Todo';
    newTodoButton.appendChild(newTodoText);

    const newTodoImage = document.createElement('img');
    newTodoImage.src = plusIcon;
    newTodoButton.appendChild(newTodoImage);

    newTodoButton.addEventListener('click', (e) => {
      e.stopPropagation();

      const id = this.projectData.id.toString();
      const addTodoTopic = ADD_TODO + id;
      PubSub.publish(addTodoTopic);
    });

    body.appendChild(newTodoButton);
  }

  addTodos(body) {
    const todosContainer = document.createElement('div');
    todosContainer.classList.add(projectStyles.todos);

    const { todos } = this.projectData;
    let todoIndex = 0;
    todos.forEach((todoData) => {
      const todo = createTodo(this.projectData.id, todoIndex, todoData);
      todoIndex += 1;
      todosContainer.appendChild(todo);
    });

    body.appendChild(todosContainer);
  }

  getElement() {
    return this.project;
  }
}

export default function createProject(projectData) {
  const project = new Project(projectData);

  return project.getElement();
}
