import { Project } from "../classes/project.js";
import { projects, saveToLocalStorage } from "./arrays.js";
import { displayCards, setCurrentDisplay } from "./cards.js";

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
                const removeProj = document.createElement("button");
                const projectTitleCon = document.createElement("div");
                projectTitle.textContent = project.getTitle();
                removeProj.textContent = "X";
                projects.push(project);
                console.table(projects);
                saveToLocalStorage();
                projectTitleCon.append(projectTitle);
                projectContainer.append(projectTitleCon);

                projectTitle.addEventListener("click", () => {
                    setCurrentDisplay(project.getTitle());
                    console.table(project.array);
                    displayCards(project.getTitle(), project.array);
                });

                projectTitleCon.addEventListener("mouseover", () => {
                    projectTitleCon.append(removeProj);
                });

                projectTitleCon.addEventListener("mouseleave", () => {
                    removeProj.remove();
                });

                removeProj.addEventListener("click", () => {
                    projects.splice(projects.indexOf(project), 1);
                    console.log(projects);
                    saveToLocalStorage();
                    projectTitleCon.remove();
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