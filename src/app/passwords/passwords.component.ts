import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PasswordManagerService } from '../password-manager.service';
import { Observable } from 'rxjs/internal/Observable';

import {AES, enc} from "crypto-js";
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-passwords',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule,NavbarComponent,FooterComponent],
  templateUrl: './passwords.component.html',
  styleUrl: './passwords.component.css'
})
export class PasswordsComponent {
  isSuccess: boolean = false;
  successMessage : string = '';

  id !: string;
  websiteName !: string;
  websiteUrl !: string;
  imageUrl !: string;

  passwords !: Array<any>;

  email !: string;
  username !: string;
  password !: string;
  passwordId !: string;
  formState : string = "Add ";


  constructor(private route: ActivatedRoute, private passwordManagerService:PasswordManagerService){
    this.route.queryParams.subscribe((val:any)=>{
      this.id = val.id;
      this.websiteName = val.websiteName;
      this.websiteUrl = val.websiteUrl;
      this.imageUrl = val.imageUrl;
    });

    this.loadPasswords();
  }

  onSubmit(data: any){
    if(this.formState == "Add "){
      data.password = this.encryptPassword(data.password);
      this.passwordManagerService.addPassword(data,this.id)
      .then(()=>{
        this.isSuccess = true;
        this.successMessage = 'Password added successfully';
        this.resetForm();
      })
      .catch(err=>{
        console.log(err)
      })
    }
    else if(this.formState == "Edit"){
      data.password = this.encryptPassword(data.password);
      this.passwordManagerService.editPassword(data,this.id, this.passwordId)
      .then(()=>{
        this.isSuccess = true;
        this.successMessage = 'Password edited successfully';
        this.resetForm();
        this.formState = "Add ";

      })
      .catch((err:any)=>{
        console.log(err)
      })
    }
   
  }

  loadPasswords(){
    this.passwordManagerService.loadPasswords(this.id).subscribe((val)=>{
      this.passwords = val;
    });
  }

  editPassword(email: string, username: string, password: string, id: string){
    this.email = email;
    this.username = username;
    this.password = password;
    this.passwordId = id;
    this.formState = "Edit";
  }

  deletePassword(id: string){
    this.passwordManagerService.deletePassword(this.id, id)
    .then(()=>{
      console.log("Password deleted successfully");
    })
    .catch((err:any) => {
      console.log(err);

    })
  }

  encryptPassword(password: string){
    return AES.encrypt(password, 'eysOgWfAo2woXmdvvx562tLR11U6AyRv').toString();
  }

  decryptPassword(password: string){
    return AES.decrypt(password, 'eysOgWfAo2woXmdvvx562tLR11U6AyRv').toString(enc.Utf8);
  }

  onDecryptPassword(password: string, index: number){
    const decryptedPassword = AES.decrypt(password, 'eysOgWfAo2woXmdvvx562tLR11U6AyRv').toString(enc.Utf8);
    this.passwords[index].password = decryptedPassword
  }

  resetForm(){
    this.email = "";
    this.username = "";
    this.password = "";

  }
}
