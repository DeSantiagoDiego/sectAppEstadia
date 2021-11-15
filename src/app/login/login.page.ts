import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl } from '@angular/forms';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });
  
  public user$:Observable<any> = this.authSvc.afAuth.user;
  constructor(private authSvc:AuthService,private router:Router,private toastr:ToastrService, private toast: ToastController /*private inicioUser: InicioComponent*/) { }

  ngOnInit(): void {
  }

   async onLogin(){
    const {email,password} = this.loginForm.value;
     try{
      const user = await this.authSvc.login(email,password);
      
      if(user && user.user.emailVerified){
        console.log(user);
        console.log('Usuario verificado:'+ user.user.emailVerified);
        //this.inicioUser.verificarAuth();
        this.router.navigate(['/inicio']);
        //reloadxd
      }else if (user){
        this.authSvc.sendVerificationEmail();
        this.presentToastInfo('Verifica tu cuenta para continuar.', 'Completa tu registro');
        this.router.navigate(['/verification-email']);
        console.log(user);
        //this.inicioUser.verificarAuth();
        console.log('Usuario verificado:'+ user.user.emailVerified);
        console.log('No estas verificado');
      }else{
        this.presentToastError('Verifica los datos e intentalo denuevo.', '¡Ha ocurrido un error!');
        //this.router.navigate(['/createaccount']);
      }
     }
     catch(error){
      console.log(error)
     }
    }
    async onLogout(){
      try{
        await this.authSvc.logout();
        this.router.navigate(['/login']);
      } catch(error){
        console.log(error);
      }
      this.authSvc.logout();
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
