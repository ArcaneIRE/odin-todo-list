/* eslint-disable linebreak-style */
export default class Todo {
  constructor() {
    this.title = 'New Todo';
    this.isChecked = false;
    this.isExpanded = false;
    this.priority = 0;
    this.description = 'Empty Description';
  }

  edit(editData) {
    const entries = Object.entries(editData);

    entries.forEach(([key, value]) => {
      this[key] = value;
    });
  }
}
