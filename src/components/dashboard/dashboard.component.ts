import {Component, OnInit, SimpleChanges} from '@angular/core';
import {getRepository, Repository} from 'typeorm';
import {Task} from '../../entities/task';
import * as moment from 'moment';

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
                date: `${moment(today).format('YYYY-MM-DD')}`
            }
        })
            .then((tasks: Task[]) => {
                console.log(tasks);
                this.todayTasks = tasks;
            });
    }
}