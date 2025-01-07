import {requestJson} from "./logic.js";

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

    container.appendChild(card);
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