export default class Todo {
    constructor() {
        this.title = 'New Todo';
        this.isChecked = false;
        this.isExpanded = false;
        this.priority = 0;
        this.description = 'Empty Description';
    }

    edit(editData) {
        let entries = Object.entries(editData);
        for (const [key, value] of entries) {
            this[key] = value;
        }
    }
}
