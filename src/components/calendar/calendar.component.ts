import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Between, getRepository, LessThan, Repository} from 'typeorm';
import {Task} from '../../entities/task';
import * as $ from 'jquery';
import 'fullcalendar';

@Component({
    selector: 'calendar',
    templateUrl: `${__dirname}/calendar.component.html`
})
export class CalendarComponent implements OnInit {

    @ViewChild('calendar', {read: ElementRef}) calendarContainer: ElementRef;
    calendar;
    taskRepository: Repository<Task>;
    events;

    constructor() {
        this.taskRepository = getRepository(Task);
    }

    ngOnInit(): void {
        this.calendar = $(this.calendarContainer.nativeElement);
                this.calendar.fullCalendar({
                    locale: 'fr',
                    themeSystem: 'bootstrap3',
                    aspectRatio: 1.5,
                    header: {
                            left:   'title',
                            center: 'month,agendaWeek,agendaDay',
                            right:  'today prev,next'
                        },
                    events: (start, end, timezone, callback) => {
                        this.getTasks()
                            .then((tasks) => {
                                callback(tasks.map((task) => {
                                    console.log(task);
                                    return {
                                        title: task.name,
                                        start: task.date,
                                        backgroundColor: (task.project.color) ? task.project.color : 'grey'
                                    };
                                }));
                            });
                    },
                    editable: true,
                    eventDrop: (event, delta, revertFunc) => {

                        alert(event.title + " was dropped on " + event.start.format());

                        if (!confirm("Are you sure about this change?")) {
                            revertFunc();
                        }

                    }
                });
    }

    getTasks() {
        return new Promise((resolve, reject) => {
            this.taskRepository.find({relations: ['project']})
                .then((tasks) => {
                    resolve(tasks);
                })
                .catch(e => console.error(e));
        });
    }
}