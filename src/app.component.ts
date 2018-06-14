import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'App',
  templateUrl: `${__dirname}/app.component.html`
})
export class AppComponent implements OnInit {
  public readonly name = 'The App';
  public menuItems = [
      {title: 'Dashboard', route: '/', icon: 'ti-dashboard', exact: true},
      {title: 'Projets', route: '/projects', icon: 'ti-folder'}
  ];

  ngOnInit(): void {}

  onRouterActivate(component: any) {
      this.name = component.title;
  }
}