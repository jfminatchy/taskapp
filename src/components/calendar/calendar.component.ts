import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Between, getRepository, LessThan, Repository} from 'typeorm';
import {Task} from '../../entities/task';
import * as $ from 'jquery';
import 'fullcalendar';
import {Moment} from "moment";

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
                            right:  'today, prev, next'
                        },
                    events: async (start: Moment, end: Moment, timezone, callback) => {
                        callback(await this.getTasks(start, end));
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

    getTasks(start: Moment, end: Moment) {
        return new Promise((resolve, reject) => {
            this.taskRepository.find({
                relations: ['project'],
                where: {
                    date: Between(start.format('YYYY-MM-DD'), end.format('YYYY-MM-DD'))
                }
            })
                .then((tasks) => {
                    resolve(tasks.map((task) => {
                        return {
                            title: task.name,
                            start: task.date,
                            backgroundColor: task.project.color,
                            textColor: (task.project.color > '#a3a3a3') ? '#000' : '#fff',
                            borderColor: '#fff'
                        };
                    }));
                })
                .catch(e => console.error(e));
        });
    }
}