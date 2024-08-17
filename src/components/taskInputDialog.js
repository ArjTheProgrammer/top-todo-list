import { matrixColors } from "../colors.js";
import { Task } from "../classes/task.js";
import { displayCards } from "./cards.js";
import { allTask, projects } from "./arrays.js";

const main = document.querySelector("main");
const dialog = document.createElement("dialog");
dialog.className = "input-dialog";
const form = document.createElement("form");   
const formContainer = document.createElement("div");
formContainer.className = "form-container";
const newTaskHeader = document.createElement('h1');
const taskLabel = document.createElement("label");
const taskDateLabel = document.createElement("label");
const taskPrioLabel = document.createElement("div");
const taskDescriptionLabel = document.createElement("label");
const taskProjLabel = document.createElement("label");
const closeButton = document.createElement("button");
const taskTitle = document.createElement("input");
const taskDate = document.createElement("input");
const prioContainer = document.createElement('div');
prioContainer.className = "prio-container";
const urgentCheckbox = document.createElement("input");
const importantCheckbox = document.createElement("input");
const urgentCheckboxLabel = document.createElement("label");
const importantCheckboxLabel = document.createElement("label");
const matrix = document.createElement("div");
matrix.className = "matrix-viewer";
const taskDescription = document.createElement("textarea");
const taskProj = document.createElement("select");

const prioContents = [urgentCheckbox, urgentCheckboxLabel, importantCheckbox,  importantCheckboxLabel];

const labels = [taskLabel, taskDateLabel, taskPrioLabel, taskDescriptionLabel, taskProjLabel];
const inputs = [taskTitle, taskDate, prioContainer, taskDescription, taskProj];
const textContent = ["Title", "Due-date", "Priority", "Description", "Project"];

export function taskInputDialog(){
    cleanDialog();
    newTaskHeader.textContent = "New Task";
    closeButton.textContent = "X";
    form.setAttribute("method","dialog");
    taskTitle.setAttribute("required", ""); 
    taskTitle.setAttribute("maxlength", "64");
    taskTitle.placeholder = "What's the task? (limited to 64 characters)";  
    taskDate.setAttribute("type","date");
    taskDescription.setAttribute("rows", 4);
    const submitButton = document.createElement("input");
    submitButton.setAttribute("type", "submit");

//for prio
    
    for (let prioContent of prioContents){
        if(prioContent.tagName == "INPUT"){
            prioContent.setAttribute("type", "checkbox");
            if (prioContent == urgentCheckbox){
                prioContent.id = 'urgentCheckbox';
                urgentCheckboxLabel.setAttribute("for", "urgentCheckbox");
                urgentCheckboxLabel.textContent = "Urgent";
            }
            else if (prioContent == importantCheckbox) {
                prioContent.id = 'importantCheckbox';
                importantCheckboxLabel.setAttribute("for", "importantCheckbox");
                importantCheckboxLabel.textContent = "Important";
            }
        }
        prioContainer.append(prioContent);
    };
    
    for (let i = 0; i <= prioContents.length - 1; i++){ 
        prioContents[i].addEventListener("click", () => {
            updateMatrix(getPrio(urgentCheckbox, importantCheckbox));
        });
    }

    updateMatrix(getPrio(urgentCheckbox, importantCheckbox));
    prioContainer.append(matrix);

    //for select
    const taskSelect = document.createElement("option");
    taskSelect.value = allTask.title;
    taskSelect.textContent = allTask.title;
    taskProj.append(taskSelect);
    taskProj.append(taskSelect);
    for (let project of projects){
        const select = document.createElement("option");
        select.value = project.getTitle();
        select.textContent = project.getTitle();
        taskProj.append(select);
    }
   
    //for inputs
    
    for(let i = 0; i < labels.length; i++){
        if(i !== 2){
            inputs[i].id = `${textContent[i]}`;
            inputs[i].name = `${textContent[i]}`;
        }
        labels[i].className = "label";
        labels[i].textContent = textContent[i];
        formContainer.append(labels[i]);
        formContainer.append(inputs[i]);
    }

    form.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            submitButton.click();
        }
    });

    submitButton.addEventListener("click", (e) => {
        if (!taskTitle.value == ""){
            getInput(taskTitle.value, taskDate.value, getPrio(urgentCheckbox, importantCheckbox), taskDescription.value);
            displayCards("All Task", allTask.array);
            dialog.close();
            clear();
            e.preventDefault();
        }
    });

    form.append(newTaskHeader);
    form.append(closeButton);
    form.append(formContainer);
    form.append(submitButton);
    dialog.append(form);
    main.append(dialog);
    dialog.showModal();
}

closeButton.addEventListener("click", (e) => {
    e.preventDefault();
    clear();
    dialog.close();
});

function updateMatrix(prio){
    if (prio == "do"){
        matrix.textContent = "DO";
        matrix.style.backgroundColor = `${matrixColors.do}`;
    }
    else if (prio == "decide"){
        matrix.textContent = "DECIDE";
        matrix.style.backgroundColor = `${matrixColors.decide}`;
    }
    else if (prio == "delegate"){
        matrix.textContent = "DELEGATE";
        matrix.style.backgroundColor = `${matrixColors.delegate}`;
    }
    else {
        matrix.textContent = "DELETE";
        matrix.style.backgroundColor = `${matrixColors.delete}`;
    }
}

export function getPrio(urgent, important){
    if (urgent.checked && important.checked){
        return "do";
    }        
    else if (!urgent.checked && important.checked){
        return "decide";
    }
    else if (urgent.checked && !important.checked){
        return "delegate";
    }
    return "delete";
}

function getInput(title, date, prio, desc){
    let addTask = new Task(title, date, prio, desc);
    allTask.array.push(addTask);
    clear();
}

function clear(){
    inputs.forEach(input => {
        input.value = "";
    });
    prioContents.forEach(checkbox => {
        checkbox.checked = false;
    })
}

//for edit

export function taskEditDialog(task){
    cleanDialog();
    newTaskHeader.textContent = "Edit Task";
    closeButton.textContent = "X";
    form.setAttribute("method","dialog");
    taskTitle.setAttribute("maxlength", "64");
    taskTitle.placeholder = "What's the task? (limited to 64 characters)";  
    taskDate.setAttribute("type","date");
    taskDescription.setAttribute("rows", 4);
    const editButton = document.createElement("button");
    editButton.textContent = "Update";

//for prio
    
    for (let prioContent of prioContents){
        if(prioContent.tagName == "INPUT"){
            prioContent.setAttribute("type", "checkbox");
            if (prioContent == urgentCheckbox){
                prioContent.id = 'urgentCheckbox';
                urgentCheckboxLabel.setAttribute("for", "urgentCheckbox");
                urgentCheckboxLabel.textContent = "Urgent";
            }
            else if (prioContent == importantCheckbox) {
                prioContent.id = 'importantCheckbox';
                importantCheckboxLabel.setAttribute("for", "importantCheckbox");
                importantCheckboxLabel.textContent = "Important";
            }
        }
        prioContainer.append(prioContent);
    };
    
    for (let i = 0; i <= prioContents.length - 1; i++){ 
        prioContents[i].addEventListener("click", () => {
            updateMatrix(getPrio(urgentCheckbox, importantCheckbox));
        });
    }

    updateMatrix(getPrio(urgentCheckbox, importantCheckbox));
    prioContainer.append(matrix);
   
    //for inputs
    
    for(let i = 0; i < labels.length; i++){
        if(i !== 2){
            inputs[i].id = `${textContent[i]}`;
            inputs[i].name = `${textContent[i]}`;
        }
        labels[i].className = "label";
        labels[i].textContent = textContent[i];
        formContainer.append(labels[i]);
        formContainer.append(inputs[i]);
    }

    editButton.addEventListener("click", (e) => {
        setInput(task);
        dialog.close();
        e.preventDefault();
    });

    form.append(newTaskHeader);
    form.append(closeButton);
    form.append(formContainer);
    form.append(editButton);
    dialog.append(form);
    main.append(dialog);
    dialog.showModal();
}

function setInput(task){
    if (taskTitle.value !== ""){
        task.setTitle(taskTitle.value);
    }

    if (taskDate.value !== ""){
        task.setDate(taskDate.value);
    }

    task.setPrio(getPrio(urgentCheckbox, importantCheckbox));

    if (taskDescription.value !== ""){
        task.setDesc(taskDescription.value);
    }

    displayCards("All Task", allTask.array);
    clear();
}

function cleanDialog(){
    dialog.innerHTML = "";
    form.innerHTML = "";
    taskProj.innerHTML = "";
}