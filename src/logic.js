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
function addTask(projectIndex, data) {
    let task = new Task(data[0], data[1], data[2], data[3]);

    let projectList = requestJson();
    projectList[projectIndex].tasks.push(task);

    updateJson(toJSON(projectList));
}

let test = new Project("name", "desc", "date", "low");
addJson(test);

let data = ["task", "desc", "date", "high"];
addTask(0, data);

export {requestJson};