import './style.css';    
import { taskInput } from "./components/taskInputButton.js";
import { displayCards, setCurrentDisplay } from "./components/cards.js";
import { allTask } from './components/arrays.js';
import { projectInput } from './components/projectInput.js';

const taskButton = document.querySelector(".task-aside");
const projectButton = document.querySelector(".project-add");

taskButton.addEventListener("click", () => {
        console.log(allTask.title);
        setCurrentDisplay(allTask.title);
        displayCards("All Task", allTask.array);
});

projectButton.addEventListener("click", () => {
        projectInput();
});

displayCards(allTask.title, allTask.array);

taskInput();