import { taskInputDialog } from "./taskInputDialog.js";

export function taskInput(){
    const body = document.querySelector("body");
    const taskInputButton = document.createElement("button");

    taskInputButton.textContent = "+";
    taskInputButton.className = "taskInputButton";

    taskInputButton.addEventListener("click", () =>{
        taskInputDialog();
    })

    body.append(taskInputButton);
}