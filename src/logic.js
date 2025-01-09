class Project {
    constructor(name, description, dueDate, priority) {
        this.name = name;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
    }

    tasks = [];
}

class Task {
    constructor(name, description, dueDate, priority) {
        this.name = name;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
    }
}

function toJSON(item){
    let jsonString = JSON.stringify(item);
    console.log(jsonString);
    return jsonString;
}

function requestJson() {
    const jsonString = localStorage.getItem("projects");
    let array = JSON.parse(jsonString);
    return array;
}

function addJson(item) {
    let jsonString = localStorage.getItem("projects");
    console.log(jsonString);
    let array;
    if (jsonString != null) {
        array = JSON.parse(jsonString);
        array.push(item);
    }
    else {
        array = [item]
        console.log(array);
    }
    jsonString = JSON.stringify(array);
    console.log(jsonString);
    localStorage.setItem("projects", jsonString);
}

function updateJson(array){
    localStorage.clear("projects");
    localStorage.setItem("projects", array);
}
function addTask(projectName) {
    let task = new Task("Name", "Description", "Date", "low");

    let projectList = requestJson();
    projectList.forEach(project => {
        if (projectName == project.name) {
            project.tasks.push(task);
        }
    });

    updateJson(toJSON(projectList));
}


function createNewProject() {
    let projectList = requestJson();
    let projectCount;
    if(projectList != null) {
        projectCount = projectList.length;
    }
    else {
        projectCount = 0;
    }
    let name = `Project${projectCount}`;
    let project = new Project(name , "Description", "Date", "low");
    addJson(project);
}

function deleteProject(name) {
    let projectList = requestJson();
    let index = 0;
    console.log(name);
    projectList.forEach(project => {
        if (name == project.name) {
            console.log("match found");
            let newList = [];
            for (let i = 0; i < index; i++) {
                newList.push(projectList[i]);
            }
            for (let i = index + 1; i < projectList.length; i ++) {
                newList.push(projectList[i]);
            }
            updateJson(toJSON(newList));
        }
        else {
            index += 1;
            console.log(index);
        }
    });
    
}

export {requestJson, createNewProject, addTask, deleteProject};