import { matrixColors } from "../colors.js";

const main = document.querySelector("main");
const cardContainer = document.createElement("div");
const listName = document.querySelector(".list-name");
cardContainer.className = "card-container";

export function taskCard(task){
    const card = document.createElement("div");
    const titleContainer = document.createElement("span");
    const dateContainer = document.createElement("span");
    const prioContainer = document.createElement("span");
    const statusContainer = document.createElement("div");
    const statusLabel = document.createElement("span");
    const statusCheckbox = document.createElement("input");
    card.className = "task-card";
    statusCheckbox.setAttribute("type", "checkbox");

    titleContainer.textContent = task.getTitle();
    dateContainer.textContent =  task.getDate() == "" ? "none" : task.getDate();
    prioContainer.textContent = task.getPrio();
    statusLabel.textContent = task.getStatus();

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

    statusContainer.append(statusLabel);
    statusContainer.append(statusCheckbox);
    card.append(titleContainer);
    card.append(dateContainer);
    card.append(prioContainer);
    card.append(statusContainer);
    cardContainer.append(card);
    main.append(cardContainer);
}

export function displayCards(title, ...taskArray){
    cardContainer.innerHTML = "";
    listName.textContent = title;
    for (let task of taskArray){
        taskCard(task);
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

    closeButton.textContent = "X";
    titleContainer.innerHTML = "<span class='label-text'>Title: </span>" + task.getTitle();
    dateContainer.innerHTML = "<span class='label-text'>Date: </span>" + task.getDate();
    prioContainer.innerHTML = "<span class='label-text'>Priority: </span>" + task.getPrio();
    statusContainer.innerHTML = "<span class='label-text'>Status: </span>" + task.getStatus();
    descContainer.innerHTML = "<span class='label-text'>Description: </span>" + task.getDesc();
    
    closeButton.addEventListener("click", () => {
        viewContainer.close();
        viewContainer.remove();
    });

    viewContainer.className = "view-dialog";
    viewContainer.append(closeButton, titleContainer, dateContainer, prioContainer, statusContainer, descContainer);
    document.body.append(viewContainer);
    viewContainer.showModal();
};