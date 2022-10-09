import PubSub from 'pubsub-js';
import { CREATE_PROJECT } from '../event-types';

import headerStyles from './Header.css';

class Header {
  constructor() {
    this.header = document.createElement('header');
    this.header.classList = headerStyles.header;

    this.addContentContainer();
  }

  addContentContainer() {
    const container = document.createElement('div');
    container.classList = headerStyles.contentContainer;

    Header.addTitle(container);
    Header.addNewProjectButton(container);

    this.header.appendChild(container);
  }

  static addTitle(container) {
    const title = document.createElement('h1');
    title.classList = headerStyles.title;
    title.innerText = 'Todo List.';
    container.appendChild(title);
  }

  static addNewProjectButton(container) {
    const addProjectButton = document.createElement('button');
    addProjectButton.classList = headerStyles['new-group-button'];
    addProjectButton.innerText = 'New Project';
    addProjectButton.addEventListener('click', () => {
      PubSub.publish(CREATE_PROJECT);
    });
    container.appendChild(addProjectButton);
  }

  getElement() {
    return this.header;
  }
}

export default function createHeader() {
  const headerMaker = new Header();

  return headerMaker.getElement();
}
