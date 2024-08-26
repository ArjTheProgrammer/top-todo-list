import { Project } from "../classes/project.js";
import { Task } from "../classes/task.js";


export let allTask = {
    title: "All Task",
    array: []
};

export let projects = [];

// Save data to local storage
export function saveToLocalStorage() {
    localStorage.setItem('allTask', JSON.stringify(allTask));
    localStorage.setItem('projects', JSON.stringify(projects));
}

// Load data from local storage
export function loadFromLocalStorage() {
    const allTaskData = localStorage.getItem('allTask');
    const projectsData = localStorage.getItem('projects');

    if (allTaskData) {
        const parsedAllTask = JSON.parse(allTaskData);
        allTask.title = parsedAllTask.title;
        allTask.array = parsedAllTask.array.map(task => new Task(task.title, task.date, task.prio, task.desc));
    }

    if (projectsData) {
        const parsedProjects = JSON.parse(projectsData);
        projects = parsedProjects.map(project => {
            const newProject = new Project(project.title);
            newProject.array = project.array.map(task => new Task(task.title, task.date, task.prio, task.desc));
            return newProject;
        });
    }
}