import PubSub from "pubsub-js";
import * as events from "../event-types";
import defaultData from "./defaultData.json";

const storage = window.localStorage;

class ProjectsStorage {
    constructor(){
        if (!this.isStorageAvailable()) {
            return;
        }

        if (storage.length === 0) {
            const defaultProjects = JSON.stringify(defaultData.projects);
            storage.setItem("projects", defaultProjects);
        }

        this.publishStorage();
        
        this.subscribeToDataUpdates();
    }

    isStorageAvailable() {
        try {
            const x = '__storage_test__';
            storage.setItem(x, x);
            storage.removeItem(x);
            return true;
        } catch {
            console.log("LocalStorage not available");
            return false;
        }
    }

    publishStorage() {
        const projectsJson = storage.getItem("projects");
        this.projects = JSON.parse(projectsJson);
        this.projects.forEach((project, id) => {
            this.publishProject(project, id);
        });
    }

    publishProject(project, id) {
        this.createProject(project, id);
        this.addTodosToProject(project.todos, id);
    }

    createProject(project, id) {
        PubSub.publishSync(events.CREATE_PROJECT);
        
        const changeTitleTopic = events.CHANGE_PROJECT_TITLE + id;
        PubSub.publish(changeTitleTopic, project.title);
        if(project.isExpanded) {
            const expandTopic = events.PROJECT_EXPAND_TOGGLE + id;
            PubSub.publish(expandTopic);
        }
    }

    addTodosToProject(todos, projectId) {
        const addTodoTopic = events.ADD_TODO + projectId;
        const editTodoTopic = events.EDIT_TODO + projectId;
        todos.forEach((todo, index) => {
            PubSub.publish(addTodoTopic);
            PubSub.publish(editTodoTopic, {index, editData: todo});
        });
    }

    subscribeToDataUpdates() {
        PubSub.subscribe(events.UPDATE_VIEW, (msg, projects) => {
            this.storeProjects(projects);
        });
    }

    storeProjects(projects) {
        const jsonProjects = JSON.stringify(projects);
        storage.setItem("projects", jsonProjects);
    }
}

export default new ProjectsStorage;