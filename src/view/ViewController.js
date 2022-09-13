import PubSub from "pubsub-js";
import {UPDATE_VIEW} from '../event-types';
import {createHeader} from './Header';
import {createProjectsContainer} from './ProjectsContainer';

class viewController {
    constructor() {
        this.root = document.getElementById('app');

        this.projects = [];
        PubSub.subscribe(UPDATE_VIEW, (msg, projects) => {
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
        const header = createHeader();
        this.root.appendChild(header);
    }

    renderProjects() {
        const projectsContainer = createProjectsContainer(this.projects);
        this.root.appendChild(projectsContainer);
    }
}

export default new viewController();