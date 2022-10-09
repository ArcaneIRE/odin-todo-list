import PubSub from 'pubsub-js';
import Project from './Project';
import {
  MODEL_UPDATED, UPDATE_VIEW, CREATE_PROJECT, DELETE_PROJECT,
} from '../event-types';

class ProjectsContainer {
  constructor() {
    this.projects = [];

    this.nextProjectId = 0;

    this.pubsubSubscribe();
  }

  pubsubSubscribe() {
    this.modelUpdatedSubscribe();
    this.newProjectSubscribe();
    this.deleteProjectSubscribe();
  }

  modelUpdatedSubscribe() {
    PubSub.subscribe(MODEL_UPDATED, () => {
      PubSub.publish(UPDATE_VIEW, this.projects);
    });
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

  newProject() {
    this.projects.push(new Project(this.nextProjectId));
    this.nextProjectId += 1;

    PubSub.publish(MODEL_UPDATED);
  }

  deleteProject(projectId) {
    this.projects = this.projects.filter(
      (project) => project.id !== projectId,
    );

    PubSub.publish(MODEL_UPDATED);
  }
}

export default new ProjectsContainer();
