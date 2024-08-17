export class Task {
    constructor(taskTitle, taskDate, taskPrio, taskDesc){
        this.title = taskTitle;
        this.date = taskDate;
        this.prio = taskPrio;
        this.desc = taskDesc;
        this.status = "ongoing";
    }

    getTitle(){
        return this.title;
    }

    getDate(){
        return this.date;
    }

    getPrio(){
        return this.prio;
    }

    getDesc(){
        return this.desc;
    }

    getStatus(){
        return this.status;
    }

    setTitle(newTitle){
        this.title = newTitle;
    }

    setDate(newDate){
        this.date = newDate;
    }

    setPrio(newPrio){
        this.prio = newPrio;
    }

    setDesc(newDesc){
        this.desc = newDesc;
    }

    setStatus(newStatus){
        this.status = newStatus;
    }
}