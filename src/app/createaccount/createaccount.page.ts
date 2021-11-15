import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { ToastController } from '@ionic/angular';

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

  

  constructor(private authSvc:AuthService,private router:Router, private toast: ToastController) { }

  ngOnInit(): void {
  }


  async onRegister(){
    const {email,password} = this.registerForm.value;
    if(password.length<=7){
      return this.presentToastError('La contraseña no cumple con el minimo de caracteres.', '¡Ha ocurrido un error!');
    }
    try{
     const user = await this.authSvc.register(email,password);
     console.log(user);
      console.log(user.toString().indexOf('FirebaseError:'));
      if(user!==null && user.toString().indexOf('FirebaseError:')==-1){
        this.authSvc.sendVerificationEmail();
        this.presentToastInfo('Verifica tu bandeja de correos para continuar.', 'Completa tu registro');
        this.router.navigate(['/verification-email']);
        //aqui
      }else{
        console.log('Error');
        this.presentToastError('Verifica los datos o prueba con otro correo e intentalo denuevo.', '¡Ha ocurrido un error!');
      }
    }
    catch(error){
      this.presentToastError('Verifica los datos o prueba con otro correo e intentalo denuevo.', '¡Ha ocurrido un error!');
      console.log(error);
    }
    
    
  }
  async presentToastError(mensaje, titulo) {
    const toast = await this.toast.create({
      header: titulo,
      message: mensaje,
      position: 'bottom',
      duration: 2000,
      color: 'danger'
    });
    toast.present();
  }
  async presentToastSuccess(mensaje, titulo) {
    const toast = await this.toast.create({
      header: titulo,
      message: mensaje,
      position: 'bottom',
      duration: 2000,
      color: 'success'
    });
    toast.present();
  }
  async presentToastInfo(mensaje, titulo) {
    const toast = await this.toast.create({
      header: titulo,
      message: mensaje,
      position: 'bottom',
      duration: 2000,
      color: 'primary'
    });
    toast.present();
  }

}
