export default class Todo {
    constructor() {
        this.title = 'New Todo';
        this.description = 'Empty Description';
        this.priority = 0;
        this.isExpanded = false;
        this.isChecked = false;
    }

    edit(editData) {
        let entries = Object.entries(editData);
        for (const [key, value] of entries) {
            this[key] = value;
        }
    }
}
