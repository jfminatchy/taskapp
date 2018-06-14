import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Project} from '../../entities/project';
import {EntityManager, getManager} from 'typeorm';
import {ActivatedRoute} from '@angular/router';
import {Task} from "../../entities/task";

@Component({
    selector: 'project-detail',
    templateUrl: `${__dirname}/project-detail.component.html`
})
export class ProjectDetailComponent implements OnInit, OnChanges {
    project: Project = new Project();
    manager: EntityManager;
    title: string = 'Projet';

    constructor(private route: ActivatedRoute) {
        this.manager = getManager();
        this.getProject();
        this.title = this.project.name;
    }

    ngOnChanges(changes: SimpleChanges): void {}
    ngOnInit(): void {}

    async getProject() {
        this.manager.findOne(
            Project,
            this.route.snapshot.paramMap.get('id'),
        )
            .then((project: Project) => {
                this.project = project;
                this.project.tasks = this.project.tasks.map((task: Task) => {
                    task.project = this.project;
                    return task;
                });
                this.title = project.name;
            });
    }

    onTaskDelete() {
        this.getProject();
    }

    async saveProject() {
        await this.manager.save(Project, this.project);
    }
}