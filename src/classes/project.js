export class Project{
    constructor(projectTitle) {
        this.title = projectTitle;
        this.array = [];
    }

    getTitle(){
        return this.title;
    }

    setTitle(newprojectTitle){
        this.title = newprojectTitle;
    }
}