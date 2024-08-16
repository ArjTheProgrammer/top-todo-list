const projectContainer = document.querySelector(".project-container");
const projectButton = document.querySelector(".project-add");

export function projectInput(){
    const projectInputCon = document.createElement("div");
    const projectTitleInput = document.createElement("input");
    const projectTitle = document.createElement("span");
    const closeInput = document.createElement("button");
    closeInput.textContent = "X";

    projectTitleInput.addEventListener("keypress", (event) => {
        if (event.key === 'Enter'){
            projectTitle.textContent = `${projectTitleInput.value}`;
            projectContainer.append(projectTitle);
            closeInput.remove();
            projectTitleInput.remove();
            projectButton.disabled = false;
        }
    });

    closeInput.addEventListener("click", () => {
        projectInputCon.remove();
        projectButton.disabled = false;
    })

    projectButton.disabled = true;
    projectInputCon.append(projectTitleInput, closeInput);
    projectContainer.append(projectInputCon);
}