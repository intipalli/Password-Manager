import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PasswordManagerService } from '../password-manager.service';
import { DataService } from '../data.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-add-website',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-website.component.html',
  styleUrl: './add-website.component.css'
})
export class AddWebsiteComponent {

  websiteName: string = '';
  websiteUrl: string = '';
  imageUrl: string = '';
  id: string = '';
  formState: string = '';

  isSuccess: boolean = false;
  successMessage : string = '';

  constructor(private passwordManager: PasswordManagerService, private dataService: DataService){}

  ngOnInit() {
    this.dataService.websiteName$.subscribe(name => {
      this.websiteName = name;
    });
    this.dataService.websiteUrl$.subscribe(url => {
      this.websiteUrl = url;
    });
    this.dataService.imageUrl$.subscribe(url => {
      this.imageUrl = url;
    });
    this.dataService.id$.subscribe((Id: string) => {
      this.id = Id;
    });
    this.dataService.formState$.subscribe(state => {
      this.formState = state;
    });
  }

  onSubmit(data: object){

    if(this.formState == 'Add New'){
      this.passwordManager.addNewWebsite(data)
      .then(()=>{
        this.isSuccess = true;
        this.successMessage = 'Data saved successfully.'
      })
      .catch(err => {
        console.log(err)
      })
    }
    else if(this.formState == 'Edit'){
      this.passwordManager.updateWebsite(this.id,data)
      .then(()=>{
        this.isSuccess = true;
        this.successMessage = 'Data edited successfully.'
      })
      .catch(err => {
        console.log(err)
      })
    }
 
  }
  

}
