import { Project } from "../classes/project.js";
import { projects } from "./arrays.js";
import { displayCards } from "./cards.js";

const projectContainer = document.querySelector(".project-container");
const projectButton = document.querySelector(".project-add");

export function projectInput(){
    const projectInputCon = document.createElement("div");
    const projectTitleInput = document.createElement("input");
    const projectTitle = document.createElement("span");
    const closeInput = document.createElement("button");
    projectTitleInput.setAttribute("maxlength","20");
    projectTitleInput.setAttribute("placeholder","Title (20 letters max)");
    closeInput.textContent = "X";

    projectTitleInput.addEventListener("keypress", (event) => {
        if (event.key === 'Enter'){
            if (projectTitleInput.value !== ""){
                const project = new Project(projectTitleInput.value);
                projectTitle.textContent = project.getTitle();
                projects.push(project);
                console.table(projects);
                projectContainer.append(projectTitle);
                displayCards(project.getTitle(), project.array);

                projectTitle.addEventListener("click", () => {
                    displayCards(project.getTitle(), project.array);
                })

                projectInputCon.remove();
                projectButton.disabled = false;
            }
        }
    });

    closeInput.addEventListener("click", () => {
        projectInputCon.remove();
        projectButton.disabled = false;
    });

    

    projectInputCon.append(projectTitleInput, closeInput);
    projectContainer.append(projectInputCon);
    projectButton.disabled = true;
    projectTitleInput.focus();
}