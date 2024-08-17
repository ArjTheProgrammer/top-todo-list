import { matrixColors } from "../colors.js";
import { taskEditDialog } from "./taskInputDialog.js";
import { allTask } from "./arrays.js";

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
<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill="var(--ci-primary-color, #000000)" d="M96,472a23.82,23.82,0,0,0,23.579,24H392.421A23.82,23.82,0,0,0,416,472V152H96Zm32-288H384V464H128Z" class="ci-primary"></path> <rect width="32" height="200" x="168" y="216" fill="var(--ci-primary-color, #000000)" class="ci-primary"></rect> <rect width="32" height="200" x="240" y="216" fill="var(--ci-primary-color, #000000)" class="ci-primary"></rect> <rect width="32" height="200" x="312" y="216" fill="var(--ci-primary-color, #000000)" class="ci-primary"></rect> <path fill="var(--ci-primary-color, #000000)" d="M328,88V40c0-13.458-9.488-24-21.6-24H205.6C193.488,16,184,26.542,184,40V88H64v32H448V88ZM216,48h80V88H216Z" class="ci-primary"></path> </g></svg>
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
        allTask.array.splice(allTask.array.indexOf(task), 1);
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