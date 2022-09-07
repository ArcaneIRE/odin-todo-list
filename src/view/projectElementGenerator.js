function makeProjectElement(group) {
    const projectContainer = document.createElement('div');
    projectContainer.classList.add('project-container');

    const title = makeProjectTitle(group.title);
    projectContainer.appendChild(title);

    const body = makeProjectBody(group);
    projectContainer.appendChild(body);

    return projectContainer;
}

function makeProjectTitle(title) {
    const projectTitle = document.createElement('h3');
    projectTitle.innerText = title;
    projectTitle.classList.add('project-container-title');

    return projectTitle;
}

function makeProjectBody(group) {
    const projectBody = document.createElement('div');

    const todos = group.getAllTodos()
    todos.forEach(todo => {
        projectBody.appendChild(newTodoElement(todo));
    });

    return projectBody;
}

function newTodoElement(todo) {
    let todoElement = document.createElement('p');
    todoElement.innerHTML = todo.title;

    return todoElement;
}

export { makeProjectElement }