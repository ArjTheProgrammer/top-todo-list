import './style.css';    
import { taskInput } from "./components/taskInputButton.js";
import { taskCard } from "./components/cards.js";

const dummyTitle = "Dummy 1";
const dummyDate = "friyay";
const dummyPrio = "do";

taskCard(dummyTitle, dummyDate, dummyPrio);
taskCard(dummyTitle, dummyDate, "delegate");
taskCard(dummyTitle, dummyDate, "decide");
taskCard(dummyTitle, dummyDate, "delete");
taskInput();