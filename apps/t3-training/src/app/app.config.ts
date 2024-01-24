import { ApplicationConfig, InjectionToken } from '@angular/core';
import { provideRouter } from '@angular/router';
import { initializeApp } from 'firebase/app';
import {
  Firestore,
  initializeFirestore,
  connectFirestoreEmulator,
  getFirestore,
} from 'firebase/firestore';
import { environment } from '../environments/environment';

import { appRoutes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';

const app = initializeApp(environment.firebase);

export const FIRESTORE = new InjectionToken('Firebase firestore', {
  providedIn: 'root',
  factory: () => {
    let firestore: Firestore;
    if (environment.useEmulators) {
      firestore = initializeFirestore(app, {});
      connectFirestoreEmulator(firestore, 'localhost', 8080);
    } else {
      firestore = getFirestore();
    }
    return firestore;
  },
});

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(appRoutes), provideAnimations()],
};
