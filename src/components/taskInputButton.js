import { taskInputDialog } from "./taskInputDialog.js";

export function taskInput(){
    const main = document.querySelector("main");
    const taskInputButton = document.createElement("button");

    taskInputButton.textContent = "+";
    taskInputButton.className = "taskInputButton";

    taskInputButton.addEventListener("click", () =>{
        taskInputDialog();
    })

    main.append(taskInputButton);
}