import './style.css';    
import { taskInput } from "./components/taskInputButton.js";
import { displayCards } from "./components/cards.js";
import { allTask } from './components/arrays.js';
import { projectInput } from './components/projectInput.js';

const taskButton = document.querySelector(".task-aside");
const projectButton = document.querySelector(".project-add");

taskButton.addEventListener("click", () => {
        displayCards("All Task", allTask);
});

projectButton.addEventListener("click", () => {
        projectInput();
})

taskInput();