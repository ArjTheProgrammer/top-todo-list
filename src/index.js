import './style.css';    
import { taskInput } from "./components/taskInputButton.js";
import { displayCards, setCurrentDisplay, displayDueToday } from "./components/cards.js";
import { allTask, loadFromLocalStorage } from './components/arrays.js';
import { projectInput } from './components/projectInput.js';


loadFromLocalStorage();

const taskButton = document.querySelector(".task-aside");
const myDayButton = document.querySelector(".my-day-aside");
const projectButton = document.querySelector(".project-add");

taskButton.addEventListener("click", () => {
        console.log(allTask.title);
        setCurrentDisplay(allTask.title);
        displayCards("All Task", allTask.array);
});

myDayButton.addEventListener("click", () => {
        console.log("clicked my day");
        displayDueToday();
})

projectButton.addEventListener("click", () => {
        projectInput();
});

displayCards(allTask.title, allTask.array);

taskInput();