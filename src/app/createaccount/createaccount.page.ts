import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-createaccount',
  templateUrl: './createaccount.page.html',
  styleUrls: ['./createaccount.page.scss'],
})
export class CreateaccountPage implements OnInit {

  registerForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  

  constructor(private authSvc:AuthService,private router:Router) { }

  ngOnInit(): void {
  }


  async onRegister(){
    const {email,password} = this.registerForm.value;
    try{
      const user = await this.authSvc.register(email,password);
      if(user!==null){
        this.router.navigate(['/verification-email']);
        //aqui
      }
    }
    catch(error){
      console.log(error);
    }
    
    
  }

}
