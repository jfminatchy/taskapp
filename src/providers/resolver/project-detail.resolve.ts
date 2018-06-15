import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router} from '@angular/router';
import {getRepository, Repository} from 'typeorm';
import {Project} from '../../entities/project';

@Injectable()
export class ProjectDetailResolve implements Resolve {

    projectRepository: Repository<Project>;

    constructor(private router: Router) {
        this.projectRepository = getRepository(Project);
    }

    resolve(route: ActivatedRouteSnapshot): Promise | boolean {
        let id = route.params['id'];
        return this.projectRepository.findOne(id)
            .then(project => {
                if (project) {
                    return project;
                } else {
                    this.router.navigate(['/projects']);
                    return false;
                }
            });
    }
}