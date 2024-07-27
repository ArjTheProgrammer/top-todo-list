export class project{
    constructor(projectTitle) {
        this.name = projectTitle
    }

    getName(){
        return this.name;
    }

    setName(newprojectTitle){
        this.name = newprojectTitle;
    }
}