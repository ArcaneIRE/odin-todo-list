import Project from "./Project";
import PubSub from 'pubsub-js';
import {PROJECTS_UPDATED, CREATE_PROJECT, DELETE_PROJECT} from '../event-types';

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
    
    deleteProject(projectId) {
        this.projects = this.projects.filter(
            project => project.id !== projectId
        );

        PubSub.publish(PROJECTS_UPDATED, this.projects);
    }
    
    pubsubSubscribe() {
        const pubsubTopicTokens = {}

        pubsubTopicTokens.newProject = this.newProjectSubscribe();
        pubsubTopicTokens.newProject = this.deleteProjectSubscribe();

        return pubsubTopicTokens;
    }

    newProjectSubscribe() {
        PubSub.subscribe(CREATE_PROJECT, () => {
            this.newProject();
        });
    }

    deleteProjectSubscribe() {
        PubSub.subscribe(DELETE_PROJECT, (msg, projectId) => {
            this.deleteProject(projectId);
        });
    }

    getAllProjects() {
        return this.projects;
    }
}

export default new ProjectsContainer;