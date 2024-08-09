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
            console.log(task);
        }
        else {
            task.setStatus("ongoing");
            statusLabel.style.fontWeight = "400";
            console.log(task);
        }

        statusLabel.textContent = task.getStatus();
    })

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