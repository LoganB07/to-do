import {requestJson, createNewProject, addTask, deleteProject} from "./logic.js";

function createElement(type, text, classList){
    let element = document.createElement(type);
    if (text != "") {
        element.textContent = text;
    }
    classList.forEach(item => {
        element.classList.add(item);
    });
    return element;
}

function removeAllElements() {
    let body = document.getElementById("body");
    while(body.lastChild) {
        body.removeChild(body.firstChild);
    }
}

function createTitle(container) {
    let titleContainer = createElement("div", "", ["title-container"]);
    let title = createElement("p", "Projects", ["title"]);
    titleContainer.appendChild(title);
    container.appendChild(titleContainer);
}

function createAddProjectBtn(container) {
    let button = createElement("button", "Add Project", ["btn", "add-project"]);
    button.addEventListener("click", ()=>{
        createNewProject();
        loadHomepage();
    });
    container.appendChild(button);
}

function createProjectList(container) {
    let projectContainer = createElement("div", "", ["project-container"]);
    let projectList = requestJson();
    console.log(projectList);

    projectList.forEach(project => {
        createCard(projectContainer, project, true);
    });

    container.appendChild(projectContainer);
}

function createCard(container, object, isProject) {
    let card = createElement("div", "", ["card", object.priority]);
    let projectInfoContainer = createElement("div", "", ["project-info-container"]);
    let projectName = createElement("p", object.name, ["project-text"]);
    let projectDescription = createElement("p", object.description, ["project-text", "project-description"]);
    let projectDueDate = createElement("p", object.dueDate, ["project-text"]);

    projectInfoContainer.appendChild(projectName);
    projectInfoContainer.appendChild(projectDescription);
    projectInfoContainer.appendChild(projectDueDate);
    

    if (isProject) {
        projectInfoContainer.addEventListener("click", ()=>{expandProject(object)});
    }

    else {
        let completeBtn = createElement("button", "Complete", ["task-btn", "btn-complete"]);
        let editBtn = createElement("button", "Edit", ["task-btn"]);
        let deleteBtn = createElement("button", "Delete", ["task-btn", "btn-delete"]);

        let btnContainer = createElement("div", "", ["btn-container"]);
        btnContainer.appendChild(completeBtn);
        btnContainer.appendChild(editBtn);
        btnContainer.appendChild(deleteBtn);

        projectInfoContainer.appendChild(btnContainer);
    }
    card.appendChild(projectInfoContainer);
    container.appendChild(card);
}

function expandProject(project) {
    removeAllElements();
    const body = document.getElementById("body");
    body.classList.add("expanded-page");
    console.log(project)

    createProjectSidebar(project, body);
    createTaskList(project, body);
}

function createProjectSidebar(project, body) {
    let sidebar = createElement("div", "", ["project-sidebar"]);
    let projectTitle = createElement("p", project.name, ["title"]);
    projectTitle.id = "name";
    let projectDescription = createElement("p", project.description, ["project-side-text"]);
    let projectDate = createElement("p", project.dueDate, ["title"]);
    let addTaskBtn = createElement("button", "Add Task", ["btn"]);
    addTaskBtn.addEventListener("click", ()=>{
        let title = document.getElementById("name");
        let name = title.textContent;
        addTask(name);
        let projectList = requestJson();
        projectList.forEach(project=>{
            if (name == project.name) {
                expandProject(project);
            }
        })
    });
    let editBtn = createElement("button", "Edit Project", ["btn"]);
    let completeBtn = createElement("button", "Complete", ["btn", "btn-complete"]);
    completeBtn.addEventListener("click", ()=>{
        let title = document.getElementById("name");
        let name = title.textContent;
        deleteProject(name);
        loadHomepage();
    });
    let deleteBtn = createElement("button", "Delete", ["btn", "btn-delete"]);
    deleteBtn.addEventListener("click", ()=>{
        let title = document.getElementById("name");
        let name = title.textContent;
        deleteProject(name);
        loadHomepage();
    });
    let sideItems = [projectTitle, projectDescription, projectDate, addTaskBtn, editBtn, completeBtn, deleteBtn];

    sideItems.forEach(item => {
        sidebar.appendChild(item);
    });
    body.appendChild(sidebar);
}

function createTaskList(project, body) {
    let taskContainer = createElement("div", "", ["task-container"]);

    project.tasks.forEach(task=>{
        createCard(taskContainer, task, false);
    });

    body.appendChild(taskContainer);
}


function loadHomepage(){
    removeAllElements();
    const body = document.getElementById("body");
    body.classList.add("homepage");

    createTitle(body);

    createAddProjectBtn(body);

    createProjectList(body);
}

export {loadHomepage};