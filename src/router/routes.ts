import {Routes} from '@angular/router';
import {ProjectsComponent} from '../components/projects/projects.component';
import {DashboardComponent} from '../components/dashboard/dashboard.component';
import {ProjectDetailComponent} from '../components/project-detail/project-detail.component';
import {ProjectDetailResolve} from '../providers/resolver/project-detail.resolve';

export const appRoutes: Routes = [
    {path: '', component: DashboardComponent},
    {path: 'projects', component: ProjectsComponent},
    {
        path: 'projects/:id',
        component: ProjectDetailComponent,
        resolve: {
            project: ProjectDetailResolve
        }
    }
];