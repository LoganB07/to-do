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
    editBtn.addEventListener("click", ()=>{
        createForm();
        //grabData();
        //updateProject();
    })
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

function createForm() {
    let formBox = createElement("form", "", ["form-box"]);
    formBox.id = "form";

    let nameBox = createElement("div", "", ["text-input"]);
    let nameLabel = createElement("label", "Name:", ["text-label"]);
    setAttributes(nameLabel, [["for", "name"]]);

    let nameInput = createElement("input", "", []);
    setAttributes(nameInput, [["type", "text"], ["id", "name"], ["name", "name"]]);
    nameBox.appendChild(nameLabel);
    nameBox.appendChild(nameInput);

    let descBox = createElement("div", "", ["desc-input"]);
    let descLabel = createElement("label", "Description:", ["text-label"]);
    setAttributes(nameLabel, [["for", "description"]]);

    let descInput = createElement("input", "", []);
    setAttributes(nameInput, [["type", "text"], ["id", "description"], ["name", "description"]]);
    descBox.appendChild(descLabel);
    descBox.appendChild(descInput);

    let dateBox = createElement("div", "", ["date-input"]);

    let dateBoxLabel = createElement("p", "Due By:", ["text-label"]);

    let monthLabel = createElement("label", "MM", []);
    setAttributes(monthLabel, [["for", "month"]]);
    let month = createElement("input", "", []);
    setAttributes(month, [["type", "text"], ["id", "month"], ["name", "month"]]);

    let slash = createElement("p", "/", ["slash"]);

    let dayLabel = createElement("label", "DD", []);
    setAttributes(dayLabel, [["for", "day"]]);
    let day = createElement("input", "", []);
    setAttributes(day, [["type", "text"], ["id", "day"], ["name", "day"]]);

    let slash2 = createElement("p", "/", ["slash"]);

    let yearLabel = createElement("label", "YYYY", []);
    setAttributes(yearLabel, [["for", "year"]]);
    let year = createElement("input", "", []);
    setAttributes(year, [["type", "text"], ["id", "year"], ["name", "year"]]);

    dateBox.appendChild(dateBoxLabel);
    dateBox.appendChild(monthLabel);
    dateBox.appendChild(month);
    dateBox.appendChild(slash);
    dateBox.appendChild(dayLabel);
    dateBox.appendChild(day);
    dateBox.appendChild(slash2);
    dateBox.appendChild(yearLabel);
    dateBox.appendChild(year);

    let priorityBox = createElement("div", "", ["priority-box"]);
    let text = createElement("p", "Priority:", ["text-label"]);

    let lowLabel = createElement("label", "Low", []);
    setAttributes(lowLabel, [["for", "low"]]);
    let low = createElement("input", "", []);
    setAttributes(low, [["type", "radio"], ["id", "low"], ["name", "priority"]]);

    let midLabel = createElement("label", "Mid", []);
    setAttributes(midLabel, [["for", "mid"]]);
    let mid = createElement("input", "", []);
    setAttributes(mid, [["type", "radio"], ["id", "mid"], ["name", "priority"]]);

    let highLabel = createElement("label", "High", []);
    setAttributes(highLabel, [["for", "high"]]);
    let high = createElement("input", "", []);
    setAttributes(high, [["type", "radio"], ["id", "high"], ["name", "priority"]]);

    priorityBox.appendChild(text);
    priorityBox.appendChild(lowLabel);
    priorityBox.appendChild(low);
    priorityBox.appendChild(midLabel);
    priorityBox.appendChild(mid);
    priorityBox.appendChild(highLabel);
    priorityBox.appendChild(high);

    formBox.appendChild(nameBox);
    formBox.appendChild(descBox);
    formBox.appendChild(dateBox);
    formBox.appendChild(priorityBox);

    let body = document.getElementById("body");
    body.appendChild(formBox);
}

function setAttributes(element ,attributes) {
    attributes.forEach(item => {
        element.setAttribute(item[0], item[1]);
    });
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