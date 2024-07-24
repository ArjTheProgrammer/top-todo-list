export function taskInput(){
    const main = document.querySelector("main");
    const taskInputButton = document.createElement("button");

    taskInputButton.textContent = "+";
    taskInputButton.className = "taskInputButton";

    main.append(taskInputButton);
}