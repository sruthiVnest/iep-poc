import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { appRoutes } from './app.routes';
import { provideHttpClient,HTTP_INTERCEPTORS, withInterceptors } from '@angular/common/http';
import { authInterceptor } from '@copilot-iep-nx/auth';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(appRoutes), provideAnimations(),provideHttpClient(withInterceptors([authInterceptor])),
    ],
};
