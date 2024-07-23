export function taskInput(){
    const main = document.querySelector("main");
    const taskInputContainer = document.createElement("div");
    taskInputContainer.className = "taskInputContainer";

    const inputBox = document.createElement("input");
    inputBox.setAttribute("type", "text");

    const addTaskButton = document.createElement("input");
    inputBox.setAttribute("type", "submit");


    taskInputContainer.append(addTaskButton);
    taskInputContainer.append(inputBox);
    main.append(taskInputContainer);
}