function newTodoGroupElement(group) {
    const groupContainer = document.createElement('div');
    groupContainer.classList.add('group-container');

    const title = newTodoGroupTitleElement(group.title);
    groupContainer.appendChild(title);

    const body = newTodoGroupBodyElement(group);
    groupContainer.appendChild(body);

    return groupContainer;
}

function newTodoGroupTitleElement(title) {
    const groupTitle = document.createElement('h3');
    groupTitle.innerText = title;
    groupTitle.classList.add('group-container-title');

    return groupTitle;
}

function newTodoGroupBodyElement(group) {
    const groupBody = document.createElement('div');

    const todos = group.getAllTodos()
    todos.forEach(todo => {
        groupBody.appendChild(newTodoElement(todo));
    });

    return groupBody;
}

function newTodoElement(todo) {
    let todoElement = document.createElement('p');
    todoElement.innerHTML = todo.title;

    return todoElement;
}

export { newTodoGroupElement }