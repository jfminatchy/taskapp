import {Component, OnInit} from '@angular/core';
import {Project} from '../../entities/project';
import {getRepository, Repository} from 'typeorm';
import {Page} from "../page";

@Component({
    moduleId: module.id,
    selector: 'projects',
    templateUrl: `${__dirname}/projects.component.html`,
    styles: [
        `span.badge {
            width: 10px;
            height: 10px;
            border-radius: 50%;
            padding: 0;
        }`
    ]
})
export class ProjectsComponent implements OnInit {

    title = 'Projets';
    projectRepository: Repository<Project>;
    projects: Project[];
    newProject: Project;

    ngOnInit() {
        this.newProject = new Project();

        this.projectRepository = getRepository(Project);

        this.getProjects();
    }

    async getProjects() {
        this.projects = await this.projectRepository.find();
    }

    removeProject(project: Project, event) {
        let alert = confirm('Etes-vous sûr de vouloir supprimer ?');

        if (alert) {
            new Promise((resolve, reject) => {
                resolve($(event.target).closest('tr').addClass('animated slideOutRight'));
            })
                .then(() => {
                    this.projectRepository.remove(project)
                        .then(() => {
                            this.getProjects();
                        });
                });
        }
    }

}