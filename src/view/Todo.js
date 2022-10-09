import PubSub from 'pubsub-js';
import { EDIT_TODO, DELETE_TODO } from '../event-types';

import todoStyles from './Todo.css';

import deleteIcon from '../images/x-icon.svg';

class Todo {
  constructor(projectId, index, todoData) {
    this.projectId = projectId;
    this.index = index;
    this.todoData = todoData;

    this.createTodoElement();
  }

  createTodoElement() {
    this.createContainer();
    this.createHead();
    this.createBody();
    if (this.todoData.isExpanded) {
      this.expand();
    }
  }

  createContainer() {
    const container = document.createElement('div');
    container.classList.add(todoStyles.container);

    container.addEventListener('click', (e) => {
      e.stopPropagation();

      const topic = EDIT_TODO + this.projectId;
      const { index } = this;
      const editData = {};
      if (this.todoData.isExpanded === false) {
        editData.isExpanded = true;
      } else {
        editData.isExpanded = false;
      }
      PubSub.publish(topic, { index, editData });
    });
    this.todo = container;
  }

  createHead() {
    const head = document.createElement('div');
    head.classList.add(todoStyles.head);
    this.addCheckbox(head);
    this.addTitle(head);
    this.addDeleteButton(head);

    this.todo.appendChild(head);
  }

  addCheckbox(head) {
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = this.todoData.isChecked;
    checkbox.classList.add(todoStyles.checkbox);

    checkbox.addEventListener('click', (e) => {
      e.stopPropagation();
    });
    checkbox.addEventListener('change', (e) => {
      const topic = EDIT_TODO + this.projectId;
      const { index } = this;
      const editData = { isChecked: e.target.checked };

      PubSub.publish(topic, { index, editData });
    });

    head.appendChild(checkbox);
  }

  addTitle(head) {
    const title = document.createElement('h3');
    title.textContent = this.todoData.title;
    title.classList.add(todoStyles.title);

    title.addEventListener('click', (e) => {
      this.titleChange(e, title);
    });

    head.appendChild(title);
  }

  titleChange(event, title) {
    event.stopPropagation();

    const titleInputForm = document.createElement('form');
    titleInputForm.id = 'titleInputForm';
    titleInputForm.classList.add(todoStyles.titleInputForm);

    const titleInput = document.createElement('input');
    titleInput.id = 'titleInput';
    titleInput.classList.add(todoStyles.titleInput);
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

      const topic = EDIT_TODO + this.projectId;
      const { index } = this;
      const editData = { title: input };

      PubSub.publish(topic, { index, editData });
    });

    title.replaceWith(titleInputForm);
    titleInput.focus();
  }

  addDeleteButton(head) {
    const deleteTodoButton = document.createElement('button');
    deleteTodoButton.classList.add(todoStyles.deleteTodoButton);
    deleteTodoButton.addEventListener('click', (e) => {
      e.stopPropagation();

      const deleteTodoTopic = DELETE_TODO + this.projectId;
      PubSub.publish(deleteTodoTopic, this.index);
    });

    const deleteTodoIcon = document.createElement('img');
    deleteTodoIcon.src = deleteIcon;
    deleteTodoIcon.classList.add(todoStyles.deleteTodoIcon);
    deleteTodoButton.appendChild(deleteTodoIcon);

    head.appendChild(deleteTodoButton);
  }

  createBody() {
    const body = document.createElement('div');
    body.classList.add(todoStyles.body);

    this.addDescription(body);
    this.addPrioritySelector(body);
    this.todo.appendChild(body);
  }

  addDescription(body) {
    const description = document.createElement('p');
    description.textContent = this.todoData.description;
    description.classList.add(todoStyles.description);

    description.addEventListener('click', (e) => {
      this.descriptionChange(e, description);
    });

    body.appendChild(description);
  }

  descriptionChange(event, description) {
    event.stopPropagation();

    const descInputForm = document.createElement('form');
    descInputForm.id = 'titleInputForm';
    descInputForm.classList.add(todoStyles.descInputForm);

    const descInput = document.createElement('textarea');
    descInput.id = 'descInput';
    descInput.classList.add(todoStyles.descInput);
    descInput.minLength = 1;
    descInput.maxLength = 200;
    descInput.placeholder = description.textContent;
    descInput.addEventListener('click', (e) => {
      e.stopPropagation();
    });
    descInput.addEventListener('keyup', (e) => {
      if (e.key === 'Enter') {
        descInputForm.requestSubmit();
      }
    });
    descInputForm.appendChild(descInput);

    descInputForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let input;
      if (descInput.value !== '') {
        input = descInput.value;
      } else {
        input = descInput.placeholder;
      }

      const topic = EDIT_TODO + this.projectId;
      const { index } = this;
      const editData = { description: input };

      PubSub.publish(topic, { index, editData });
    });

    description.replaceWith(descInputForm);
    descInput.focus();
  }

  addPrioritySelector(body) {
    const priority = document.createElement('div');
    priority.classList.add(todoStyles.priority);
    priority.dataset.priority = this.todoData.priority;

    priority.addEventListener('click', (e) => {
      e.stopPropagation();

      const topic = EDIT_TODO + this.projectId;
      const currentPriority = this.todoData.priority;
      const newPriority = (currentPriority + 1) % 3;
      const { index } = this;
      const editData = { priority: newPriority };

      PubSub.publish(topic, { index, editData });
    });

    body.appendChild(priority);
  }

  expand() {
    this.todo.classList.toggle(todoStyles.expanded);
  }

  getElement() {
    return this.todo;
  }
}

export default function createTodo(projectId, index, todoData) {
  const todo = new Todo(projectId, index, todoData);

  return todo.getElement();
}
