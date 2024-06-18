import { Component } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { PasswordManagerService } from '../password-manager.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { compileComponentClassMetadata } from '@angular/compiler';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FooterComponent, FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginError : boolean = false;

  constructor(private passwordManagerService: PasswordManagerService, private router: Router){}
  
  onSubmit(data: any){
    this.passwordManagerService.login(data.email, data.password)
    .then(()=>{
      this.router.navigate(['websites'])
    })
    .catch((err:any)=>{
      this.loginError = true;
    })
  }
}
