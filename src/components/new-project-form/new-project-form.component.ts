import {Component, EventEmitter, Output} from '@angular/core';
import {Project} from '../../entities/project';

@Component({
    selector: 'new-project-form',
    templateUrl:`${__dirname}/new-project-form.component.html`,
    styles: [
        `input[type="color"] {
            border: none;
            padding: 0;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            background: none;
        }`
    ]
})
export class NewProjectFormComponent {
    @Output() projectSaved = new EventEmitter();
    newProject: Project;

    constructor() {
        this.newProject = new Project();
    }

    onSubmit(ngForm) {
        this.newProject.save()
            .then(() => {
                this.projectSaved.emit(this.newProject);
                this.newProject.id = null;
                ngForm.resetForm();
            });
    }
}