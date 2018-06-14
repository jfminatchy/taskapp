import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Task} from '../../entities/task';
import {Project} from '../../entities/project';
import {EntityManager, getManager} from 'typeorm';

@Component({
    selector: 'new-task-form',
    templateUrl: `${__dirname}/new-task-form.component.html`
})
export class NewTaskFormComponent implements OnInit, OnChanges {
    @Input() project: Project;
    @Input() date: Date;
    @Output() taskSaved = new EventEmitter();
    newTask: Task;
    projects: Project[];
    manager: EntityManager;

    ngOnChanges(changes: SimpleChanges): void {
        this.manager = getManager();
        this.getProjects();
        this.newTask = new Task();
        this.resetNewTask();
        // console.log(this.newTask);
        // console.log('projet', this.project);
    }

    ngOnInit(): void {
    }

    async getProjects() {
        this.projects = await this.manager.find(Project);
    }

    saveNewTask() {
        console.log(this.newTask);
        this.manager.save(Task, this.newTask)
            .then(() => {
                this.taskSaved.emit(this.newTask);
                this.resetNewTask();
            });
    }

    resetNewTask() {
        this.newTask.id = this.newTask.name = this.newTask.description = null;
        this.newTask.project = (this.project.id) ? this.project : '';
        this.newTask.date = (this.date) ? this.date : null;
    }
}