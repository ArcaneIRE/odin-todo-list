import PubSub from "pubsub-js";
import { CREATE_PROJECT } from "../event-types";

import headerStyles from './Header.css';

export function createHeader() {
    const headerMaker = new Header();

    return headerMaker.getElement();
}

class Header {
    constructor() {
        this.header = document.createElement('header');
        this.header.classList = headerStyles['header'];

        this.addContentContainer();
    }

    addContentContainer() {
        const container = document.createElement('div');
        container.classList = headerStyles['contentContainer']
        
        this.addTitle(container);
        this.addNewProjectButton(container);

        this.header.appendChild(container);
    }

    addTitle(container) {
        const title = document.createElement('h1');
        title.classList = headerStyles['title'];
        title.innerText = 'Todo List.';
        container.appendChild(title);
    }

    addNewProjectButton(container) {
        const addProjectButton = document.createElement('button');
        addProjectButton.classList = headerStyles['new-group-button'];
        addProjectButton.innerText = 'New Project';
        addProjectButton.addEventListener('click', () => {
            PubSub.publish(CREATE_PROJECT);
        })
        container.appendChild(addProjectButton);
    }

    getElement() {
        return this.header;
    }
}