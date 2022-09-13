export default class Todo {
    constructor() {
        this.title = 'New Todo';
    }

    edit(newData) {
        this.title = newData.title;
    }
}
