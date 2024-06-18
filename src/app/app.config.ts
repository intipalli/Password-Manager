import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(provideFirebaseApp(() => initializeApp({
      projectId: "password-manager-e2d28",
      appId: "1:227434167589:web:66f4f3a3d3113594a82ecc",
      storageBucket: "password-manager-e2d28.appspot.com",
      apiKey: "AIzaSyCMomWTSvBO4z269QTyKHjO0O8g-XRO3n8",
      authDomain: "password-manager-e2d28.firebaseapp.com",
      messagingSenderId: "227434167589"
    }))),
    importProvidersFrom(provideAuth(() => getAuth())),
    importProvidersFrom(provideFirestore(() => getFirestore()))
  ]
};
