import TodoGroup from "./TodoGroup";

export default class TodoGroupsContainer {
    constructor() {
        this.groups = []
    }

    newTodoGroup (title) {
        this.groups.push(new TodoGroup(title));
    }
    
    deleteTodoGroup(index) {
        this.groups.splice(index, 1);
    }
    
    getAllTodoGroups() {
        return this.groups;
    }
}