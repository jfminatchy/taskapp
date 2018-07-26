import {Component, OnInit, SimpleChanges} from '@angular/core';
import {getRepository, IsNull, Repository} from 'typeorm';
import {Task} from '../../entities/task';
import * as moment from 'moment';

@Component({
    selector: 'dashboard',
    templateUrl: `${__dirname}/dashboard.component.html`
})
export class DashboardComponent implements OnInit {
    title = 'Dashboard';
    taskList: Task[];
    taskRepository: Repository<Task>;
    taskCase: string;

    ngOnInit(changes: SimpleChanges): void {
        this.taskRepository = getRepository(Task);

        this.getTasks();
    }

    getTasks(taskCase?: string) {

        let where = {
            date: null
        };

        switch (taskCase) {
            case 'not-planned':
                where.date = IsNull();
                where['done'] = false;
                break;
            default:
                let today = new Date();
                where.date = `${moment(today).format('YYYY-MM-DD')}`;
                taskCase = 'now';
                break;
        }

        this.taskRepository.find({
            relations: ['project'],
            where: where
        })
            .then((tasks: Task[]) => {
                console.log(tasks);
                this.taskCase = taskCase;
                this.taskList = tasks;
            });
    }
}