import { matrixColors } from "../colors.js";
const main = document.querySelector("main");

export function taskCard(title, date, prio){
    const card = document.createElement("div");
    const titleContainer = document.createElement("span");
    const dateContainer = document.createElement("span");
    const prioContainer = document.createElement("span");
    const statusContainer = document.createElement("div");
    const statusLabel = document.createElement("span");
    const statusCheckbox = document.createElement("input");
    card.className = "task-card";
    statusCheckbox.setAttribute("type", "checkbox");

    titleContainer.textContent = title;
    dateContainer.textContent = date;
    prioContainer.textContent = prio;
    statusLabel.textContent = "ongoing";

    prioContainer.style.borderLeft = `10px solid ${matrixColors[prio]}`;

    
    statusCheckbox.addEventListener("click", () => {
        statusLabel.textContent = statusCheckbox.checked ? "done" : "ongoing";
        if (statusLabel.textContent == "done"){
            statusLabel.style.fontWeight = "700";
        }
        else {
            statusLabel.style.fontWeight = "400";
        }
    })

    statusContainer.append(statusLabel);
    statusContainer.append(statusCheckbox);
    card.append(titleContainer);
    card.append(dateContainer);
    card.append(prioContainer);
    card.append(statusContainer);
    main.append(card);
}

export function applyColor(taskType, colors) {
    return colors[taskType];
}