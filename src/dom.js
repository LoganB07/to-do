import {requestJson, createNewProject} from "./logic.js";

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
        createProjectCard(projectContainer, project);
    });

    container.appendChild(projectContainer);
}

function createProjectCard(container, project) {
    let card = createElement("div", "", ["card", project.priority]);
    let projectInfoContainer = createElement("div", "", ["project-info-container"]);
    let projectName = createElement("p", project.name, ["project-text"]);
    let projectDescription = createElement("p", project.description, ["project-text", "project-description"]);
    let projectDueDate = createElement("p", project.dueDate, ["project-text"]);

    projectInfoContainer.appendChild(projectName);
    projectInfoContainer.appendChild(projectDescription);
    projectInfoContainer.appendChild(projectDueDate);
    card.appendChild(projectInfoContainer);

    projectInfoContainer.addEventListener("click", ()=>{expandProject(project)});

    container.appendChild(card);
}

function expandProject(project) {
    removeAllElements();
    const body = document.getElementById("body");
    body.classList.add("expanded-page");
    console.log(project)

    createProjectSidebar(project, body);
    //createTaskList(project);
}

function createProjectSidebar(project, body) {
    let sidebar = createElement("div", "", ["project-sidebar"]);
    let projectTitle = createElement("p", project.name, ["title"]);
    let projectDescription = createElement("p", project.description, ["project-side-text"]);
    let projectDate = createElement("p", project.dueDate, ["title"]);
    let sideItems = [projectTitle, projectDescription, projectDate];

    sideItems.forEach(item => {
        sidebar.appendChild(item);
    });
    body.appendChild(sidebar);
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