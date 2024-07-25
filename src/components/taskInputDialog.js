export function taskInputDialog(){
    const main = document.querySelector("main");
    const dialog = document.createElement("dialog");
    const form = document.createElement("form");   
    const formContainer = document.createElement("div");
    formContainer.className = "form-container";
    const newTaskHeader = document.createElement('h1');
    const taskLabel = document.createElement("label");
    const taskDateLabel = document.createElement("label");
    const taskPrioLabel = document.createElement("div");
    const taskDescriptionLabel = document.createElement("label");
    const closeButton = document.createElement("button");
    const task = document.createElement("input");
    const taskDate = document.createElement("input");
    const prioContainer = document.createElement('div');
    prioContainer.className = "prio-container"
    const urgentCheckbox = document.createElement("input");
    const importantCheckbox = document.createElement("input");
    const urgentCheckboxLabel = document.createElement("label");
    const importantCheckboxLabel = document.createElement("label");
    const taskDescription = document.createElement("textarea");
    const submitButton = document.createElement("input");

    newTaskHeader.textContent = "New Task";
    closeButton.textContent = "X";
    form.setAttribute("method","dialog");   
    taskDate.setAttribute("type","date");
    submitButton.setAttribute("type", "submit");

    const prioContents = [urgentCheckbox, urgentCheckboxLabel, importantCheckbox,  importantCheckboxLabel];
    
    for (let prioContent of prioContents){
        if(prioContent.tagName == "INPUT"){
            prioContent.setAttribute("type", "checkbox");
            if (prioContent == urgentCheckbox){
                prioContent.id = 'urgentCheckbox';
                urgentCheckboxLabel.setAttribute("for", "urgentCheckbox");
                urgentCheckboxLabel.textContent = "Urgent";
            }
            else if (prioContent == importantCheckbox) {
                prioContent.id = 'importantCheckbox';
                importantCheckboxLabel.setAttribute("for", "importantCheckbox");
                importantCheckboxLabel.textContent = "Important";
            }
        }
        prioContainer.append(prioContent);
    }


    const labels = [taskLabel, taskDateLabel, taskPrioLabel, taskDescriptionLabel];
    const inputs = [task, taskDate, prioContainer, taskDescription];
    const textContent = ["Title", "Due-date", "Priority", "Description"];
    
    for(let i = 0; i < labels.length; i++){
        if(i !== 2){
            inputs[i].id = `${textContent[i]}`;
        }
        labels[i].textContent = textContent[i];
        formContainer.append(labels[i]);
        formContainer.append(inputs[i]);
    }

    form.append(newTaskHeader);
    form.append(closeButton);
    form.append(formContainer);
    form.append(submitButton);
    dialog.append(form);
    main.append(dialog);
    dialog.showModal();
}