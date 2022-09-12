import Project from "./Project";
import PubSub from 'pubsub-js';
import {PROJECTS_UPDATED, CREATE_PROJECT} from '../event-types';

class ProjectsContainer {
    constructor() {
        this.projects = []

        this.nextProjectId = 0;

        this.pubsubTopicTokens = this.pubsubSubscribe();
    }

    newProject () {
        this.projects.push(new Project(this.nextProjectId));
        this.nextProjectId++
        
        PubSub.publish(PROJECTS_UPDATED, this.projects);
    }
    
    deleteProject(index) {
        this.projects.splice(index, 1);
    }
    
    pubsubSubscribe() {
        const pubsubTopicTokens = {}

        pubsubTopicTokens.newProject = this.newProjectSubscribe();

        return pubsubTopicTokens;
    }

    newProjectSubscribe() {
        PubSub.subscribe(CREATE_PROJECT, () => {
            this.newProject();
        });
    }

    getAllProjects() {
        return this.projects;
    }
}

export default new ProjectsContainer;