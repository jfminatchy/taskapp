import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {getRepository, Repository} from 'typeorm';
import {Task} from '../../entities/task';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
    selector: 'task-list',
    templateUrl: `${__dirname}/task-list.component.html`
})
export class TaskListComponent implements OnInit, OnChanges {

    @Input() tasks: Task[];
    @Input() cols: ('done' | 'project' | 'date' | 'name' | 'description' | 'actions');
    @Output() taskUpdated = new EventEmitter();
    @Output() taskDelete = new EventEmitter();
    taskRepository: Repository<Task>;
    taskEdit = false;
    nameInput: FormControl;
    descriptionInput: FormControl;
    dateInput: FormControl;

    ngOnInit(): void {
    }

    triggerEdit(task: Task | false) {
        this.taskEdit = task;
        if (task) {
            this.nameInput = new FormControl(task.name, [Validators.required]);
            this.descriptionInput = new FormControl(task.description);
            this.dateInput = new FormControl(task.date);
        }
    }

    saveTask(task: Task) {
        task.save()
            .then((updatedTask) => {
                this.triggerEdit(false);
                this.taskUpdated.emit(updatedTask);
            })
            .catch(e => console.log(e));
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.taskRepository = getRepository(Task);
    }

    deleteTask(task: Task, event) {
        let confirm = window.confirm('Etes-vous sûr de vouloir supprimer cette tâche ?');

        if (confirm) {
            new Promise((resolve, reject) => {
                resolve($(event.target).closest('tr').addClass('animated slideOutRight'));
            })
                .then(() => {
                this.taskRepository.remove(task)
                        .then(() => {
                            this.taskDelete.emit(event);
                        });
                });
        }
    }

    inCols(col: string) {
        return (this.cols == null) ? true : (this.cols.indexOf(col) != -1);
    }

}