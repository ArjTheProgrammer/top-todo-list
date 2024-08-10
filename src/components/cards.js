import { matrixColors } from "../colors.js";
import { taskEditDialog } from "./taskInputDialog.js";

const main = document.querySelector("main");
const cardContainer = document.createElement("div");
const listName = document.querySelector(".list-name");
cardContainer.className = "card-container";

function taskCard(task, taskArray){
    const card = document.createElement("div");
    const titleContainer = document.createElement("span");
    const dateContainer = document.createElement("span");
    const prioContainer = document.createElement("span");
    const statusContainer = document.createElement("div");
    const statusLabel = document.createElement("span");
    const statusCheckbox = document.createElement("input");
    const deleteButton = document.createElement("button");
    deleteButton.className = "card-delete-button";
    //just svg
    deleteButton.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="3 6 5 6 21 6"></polyline>
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m6 0V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"></path>
    </svg>
    `;
    //end of svg
    card.className = "task-card";
    statusCheckbox.setAttribute("type", "checkbox");

    titleContainer.textContent = task.getTitle();
    dateContainer.textContent =  task.getDate() == "" ? "none" : task.getDate();
    prioContainer.textContent = task.getPrio();
    statusLabel.textContent = task.getStatus();

    if (task.getStatus() == "done"){
        statusCheckbox.checked = true;
        statusLabel.style.fontWeight = "700";
    }

    prioContainer.style.borderLeft = `10px solid ${matrixColors[task.getPrio()]}`;

    
    statusCheckbox.addEventListener("click", () => {
        if (statusCheckbox.checked){
            task.setStatus("done");
            statusLabel.style.fontWeight = "700";
        }
        else {
            task.setStatus("ongoing");
            statusLabel.style.fontWeight = "400";
        }

        statusLabel.textContent = task.getStatus();
    });

    titleContainer.addEventListener("click", () => {
        viewCard(task);
    });

    deleteButton.addEventListener("click", () => {
        taskArray.splice(taskArray.indexOf(task), 1);
        console.table(taskArray);
        card.remove();
    })

    statusContainer.append(statusLabel);
    statusContainer.append(statusCheckbox);
    card.append(titleContainer, dateContainer, prioContainer, statusContainer, deleteButton);
    cardContainer.append(card);
    main.append(cardContainer);
}

export function displayCards(title, taskArray){
    cardContainer.innerHTML = "";
    listName.textContent = title;
    for (let task of taskArray){
        taskCard(task, taskArray);
    };
}

function viewCard(task){
    const viewContainer = document.createElement("dialog");
    const closeButton = document.createElement("button");
    const titleContainer = document.createElement("span");
    const dateContainer = document.createElement("span");
    const prioContainer = document.createElement("span");
    const statusContainer = document.createElement("span");
    const descContainer = document.createElement("p");
    const editButton = document.createElement("button");

    closeButton.textContent = "X";
    editButton.textContent = "Edit";
    editButton.className = "edit-button";
    titleContainer.innerHTML = "<span class='label-text'>Title: </span>" + task.getTitle();
    dateContainer.innerHTML = "<span class='label-text'>Date: </span>" + `${task.getDate() == "" ? "none" : task.getDate()}`;
    prioContainer.innerHTML = "<span class='label-text'>Priority: </span>" + task.getPrio();
    statusContainer.innerHTML = "<span class='label-text'>Status: </span>" + task.getStatus();
    descContainer.innerHTML = "<span class='label-text'>Description: </span>" + task.getDesc();
    
    closeButton.addEventListener("click", () => {
        viewContainer.close();
        viewContainer.remove();
    });

    editButton.addEventListener("click", () => {
        viewContainer.close();
        viewContainer.remove();
        taskEditDialog(task);
    });

    viewContainer.className = "view-dialog";
    viewContainer.append(closeButton, titleContainer, dateContainer, prioContainer, statusContainer, descContainer, editButton);
    document.body.append(viewContainer);
    viewContainer.showModal();
};