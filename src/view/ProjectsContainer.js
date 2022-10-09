import createProject from './Project';

import projectsContainerStyles from './ProjectsContainer.css';

class ProjectsContainer {
  constructor(projects) {
    this.projects = projects;
    this.projectsContainer = document.createElement('div');
    this.projectsContainer.id = projectsContainerStyles.container;
  }

  addAllProjects() {
    this.projects.forEach((project) => {
      const projectElement = createProject(project);
      this.projectsContainer.appendChild(projectElement);
    });
  }

  getElement() {
    return this.projectsContainer;
  }
}

export default function createProjectsContainer(projects) {
  const projectsContainerMaker = new ProjectsContainer(projects);
  projectsContainerMaker.addAllProjects();

  return projectsContainerMaker.getElement();
}
