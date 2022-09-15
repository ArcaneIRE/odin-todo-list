export default class Todo {
    constructor() {
        this.title = 'Pet cat';
    }

    edit(newData) {
        this.title = newData.title;
    }
}
