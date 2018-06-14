import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule }  from './app.module';
import {createConnection} from 'typeorm';

createConnection()
    .then(() => {
        platformBrowserDynamic().bootstrapModule(AppModule);
    });
