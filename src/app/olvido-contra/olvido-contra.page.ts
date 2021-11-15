import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-olvido-contra',
  templateUrl: './olvido-contra.page.html',
  styleUrls: ['./olvido-contra.page.scss'],
})
export class OlvidoContraPage implements OnInit {

  usuarioCorreo = new FormControl('');

  constructor(private toastr:ToastrService,
              private router:Router,
              private authSvc:AuthService,
              private toast: ToastController) { }

  ngOnInit(): void {
  }


  async onReset(){
      const correo = this.usuarioCorreo.value;
      this.authSvc.resetPassword(correo);
      this.presentToastSuccess('Mira en tu bandeja de entrada','¡Correo enviado!')
      /*this.toastr.success('Mira en tu bandeja de entrada','¡Correo enviado!',{
        positionClass:'toast-bottom-right'
      });*/
      console.log('Enviado')
      this.router.navigate(['/login']);
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
}
