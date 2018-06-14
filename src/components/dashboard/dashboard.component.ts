import {Component, OnInit, SimpleChanges} from '@angular/core';
import {getRepository, Repository} from 'typeorm';
import {Task} from '../../entities/task';
import {DatePipe} from "@angular/common";

@Component({
    selector: 'dashboard',
    templateUrl: `${__dirname}/dashboard.component.html`
})
export class DashboardComponent implements OnInit {
    title = 'Dashboard';
    todayTasks: Task[];
    taskRepository: Repository<Task>;

    ngOnInit(changes: SimpleChanges): void {
        this.taskRepository = getRepository(Task);
        let today = new Date();

        this.taskRepository.find({
            relations: ['project'],
            where: {
                date: `${today.getFullYear()}-${(today.getMonth() + 1 > 10 ) ? today.getMonth() + 1 : '0' + (today.getMonth() + 1)}-${(today.getDate() > 10 ) ? today.getDate() : '0' + today.getDate()}`
            }
        })
            .then((tasks: Task[]) => {
                console.log(tasks);
                this.todayTasks = tasks;
            });
    }
}