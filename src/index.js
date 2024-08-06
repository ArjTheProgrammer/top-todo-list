import './style.css';    
import { taskInput } from "./components/taskInputButton.js";
import { displayCards } from "./components/cards.js";
import { allTask } from './components/arrays.js';

const taskButton = document.querySelector(".task-aside");

taskButton.addEventListener("click", () => {
        displayCards("All Task", ...allTask);
});

taskInput();