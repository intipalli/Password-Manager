import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NavbarComponent} from './navbar/navbar.component';
import {FooterComponent} from './footer/footer.component';
import {AddWebsiteComponent} from './add-website/add-website.component';
import {WebsitesComponent} from './websites/websites.component';
import { PasswordsComponent } from './passwords/passwords.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,NavbarComponent,FooterComponent,AddWebsiteComponent,WebsitesComponent,PasswordsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'password-manager';
}
