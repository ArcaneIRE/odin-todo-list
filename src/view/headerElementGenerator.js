function makeHeaderElement() {
    const headerGenerator = new HeaderGenerator();
    
    headerGenerator.addTitle();
    headerGenerator.addProjectButton();

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
        title.innerText = 'Todo List.';

        this.header.appendChild(title);
    }

    addProjectButton() {
        const addProjectButton = document.createElement('button');
        addProjectButton.classList = 'header-new-group-button';
        addProjectButton.innerText = 'Add List';

        this.header.appendChild(addProjectButton);
    }

    getHeader() {
        return this.header;
    }
}

export { makeHeaderElement }