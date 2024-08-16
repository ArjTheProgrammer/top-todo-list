export class project{
    constructor(projectTitle) {
        this.title = projectTitle;
        this.array = [];
    }

    getName(){
        return this.title;
    }

    setName(newprojectTitle){
        this.title = newprojectTitle;
    }
}