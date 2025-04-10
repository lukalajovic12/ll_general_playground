import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { 
  PreloadAllModules, 
  provideRouter, 
  withDebugTracing, 
  withPreloading 
} 
from '@angular/router';

import { APP_ROUTES  } from './app/app.routes';


bootstrapApplication(AppComponent, {
  providers: [provideHttpClient(withFetch()),
    provideRouter(APP_ROUTES, 
      withPreloading(PreloadAllModules),
      withDebugTracing(),
    )
  ],
}).catch(err => console.error(err));