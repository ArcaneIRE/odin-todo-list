import PubSub from "pubsub-js";
import { CREATE_PROJECT } from "../event-types";

export function createHeader() {
    const headerMaker = new Header();
    headerMaker.addTitle();
    headerMaker.addNewProjectButton();

    return headerMaker.getElement();
}

class Header {
    constructor() {
        this.header = document.createElement('header');
        this.header.classList = 'header';
    }

    addTitle() {
        const title = document.createElement('h1');
        title.classList = 'header-title';
        title.innerText = 'Todo List.';
        this.header.appendChild(title);
    }

    addNewProjectButton() {
        const addProjectButton = document.createElement('button');
        addProjectButton.classList = 'header-new-group-button';
        addProjectButton.innerText = 'New Project';
        addProjectButton.addEventListener('click', () => {
            PubSub.publish(CREATE_PROJECT);
        })
        this.header.appendChild(addProjectButton);
    }

    getElement() {
        return this.header;
    }
}