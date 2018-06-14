import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {ProjectsComponent} from './components/projects/projects.component';
import {RouterModule} from '@angular/router';
import {appRoutes} from './router/routes';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NewProjectFormComponent} from './components/new-project-form/new-project-form.component';
import {ProjectDetailComponent} from './components/project-detail/project-detail.component';
import {NewTaskFormComponent} from './components/new-task-form/new-task-form.component';
import {TaskListComponent} from './components/task-list/task-list.component';
import {CalendarComponent} from "./components/calendar/calendar.component";

@NgModule({
    imports: [
        BrowserModule,
        RouterModule.forRoot(
            appRoutes
        ),
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        AppComponent,
        ProjectsComponent,
        DashboardComponent,
        NewProjectFormComponent,
        ProjectDetailComponent,
        NewTaskFormComponent,
        TaskListComponent,
        CalendarComponent
    ],
    providers: [
        {provide: LocationStrategy, useClass: HashLocationStrategy}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}