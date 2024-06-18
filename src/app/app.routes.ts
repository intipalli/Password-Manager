import { Routes } from '@angular/router';
import { AddWebsiteComponent } from './add-website/add-website.component';
import { LoginComponent } from './login/login.component';
import { PasswordsComponent } from './passwords/passwords.component';
import { WebsitesComponent } from './websites/websites.component';

export const routes: Routes = [
    {
        path:'',
        component:LoginComponent
    },
    {
        path:'websites',
        component:WebsitesComponent
    },
    {
        path:'add-website',
        component:AddWebsiteComponent
    },
    {
        path:'passwords',
        component:PasswordsComponent
    }
];
