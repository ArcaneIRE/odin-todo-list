import TodoGroup from "./TodoGroup";

export default class TodoGroupsContainer {
    constructor() {
        this.groups = []
    }

    newTodoGroup (name) {
        this.groups.push(new TodoGroup(name));
    }
    
    deleteTodoGroup(index) {
        this.groups.splice(index, 1);
    }
    
    getAllTodoGroups() {
        return projects;
    }
}