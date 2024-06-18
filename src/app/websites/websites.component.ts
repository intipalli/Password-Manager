import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { PasswordManagerService } from '../password-manager.service';
import { AddWebsiteComponent } from '../add-website/add-website.component';
import { DataService } from '../data.service';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';


@Component({
  selector: 'app-websites',
  standalone: true,
  imports: [CommonModule,RouterModule, AddWebsiteComponent,NavbarComponent, FooterComponent],
  templateUrl: './websites.component.html',
  styleUrl: './websites.component.css'
})
export class WebsitesComponent {

  allSites !: Observable<Array<any>>;

  isDeleted: boolean = false;
  websiteName !: string;

  constructor(private passwordManagerService: PasswordManagerService, private dataService: DataService) {
    this.loadWebsites();
  }

  loadWebsites() {
    this.allSites = this.passwordManagerService.loadWebsites();
  }

  editSite(websiteName:string, websiteUrl: string, imageUrl: string, id: string) {
    this.dataService.setWebsiteData(websiteName, websiteUrl, imageUrl, id,"Edit");
  }

  deleteSite(id: string, websiteName: string) {
    this.passwordManagerService.deleteWebsite(id)
    .then(()=>{
      this.isDeleted = true;
      this.websiteName = websiteName;
    })
    .catch(err =>{
      console.log(err);
    });
  }



}
