function newHeaderElement() {
    const headerGenerator = new HeaderGenerator();
    
    headerGenerator.addTitle();
    headerGenerator.addNewGroupButton();

    return headerGenerator.getHeader();
}

class HeaderGenerator {
    constructor() {
        this.header = document.createElement('header');
        this.header.classList = 'header';
    }
    
    addTitle() {
        const title = document.createElement('h1');
        title.classList = 'header-title';
        title.innerText = 'Todo List';

        this.header.appendChild(title);
    }

    addNewGroupButton() {
        const newGroupButton = document.createElement('button');
        newGroupButton.classList = 'header-new-group-button';
        newGroupButton.innerText = 'Add new group';

        this.header.appendChild(newGroupButton);
    }

    getHeader() {
        return this.header;
    }
}

export { newHeaderElement }