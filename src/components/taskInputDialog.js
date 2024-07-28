import { matrixColors } from "../colors.js";
import { task } from "../classes/task.js";

const main = document.querySelector("main");
const dialog = document.createElement("dialog");
const form = document.createElement("form");   
const formContainer = document.createElement("div");
formContainer.className = "form-container";
const newTaskHeader = document.createElement('h1');
const taskLabel = document.createElement("label");
const taskDateLabel = document.createElement("label");
const taskPrioLabel = document.createElement("div");
const taskDescriptionLabel = document.createElement("label");
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
const submitButton = document.createElement("input");

const prioContents = [urgentCheckbox, urgentCheckboxLabel, importantCheckbox,  importantCheckboxLabel];

const labels = [taskLabel, taskDateLabel, taskPrioLabel, taskDescriptionLabel];
const inputs = [taskTitle, taskDate, prioContainer, taskDescription];
const textContent = ["Title", "Due-date", "Priority", "Description"];

export function taskInputDialog(){
    newTaskHeader.textContent = "New Task";
    closeButton.textContent = "X";
    form.setAttribute("method","dialog");   
    taskDate.setAttribute("type","date");
    taskDescription.setAttribute("rows", 4);
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
   
    //for inputs
    
    for(let i = 0; i < labels.length; i++){
        if(i !== 2){
            inputs[i].id = `${textContent[i]}`;
        }
        labels[i].className = "label";
        labels[i].textContent = textContent[i];
        formContainer.append(labels[i]);
        formContainer.append(inputs[i]);
    }

    form.append(newTaskHeader);
    form.append(closeButton);
    form.append(formContainer);
    form.append(submitButton);
    dialog.append(form);
    main.append(dialog);
    dialog.showModal();
}

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

let data = [];

closeButton.addEventListener("click", () => {
    clear();
})

submitButton.addEventListener("click", () => {
    getInput(taskTitle.value, taskDate.value, getPrio(urgentCheckbox, importantCheckbox), taskDescription.value);
});

function getInput(title, date, prio, desc){
    let addTask = new task(title, date, prio, desc);
    data.push(addTask);
    console.table(data);
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