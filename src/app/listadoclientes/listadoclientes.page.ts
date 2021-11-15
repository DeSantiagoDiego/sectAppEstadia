import { Component, OnInit } from '@angular/core';
import { MenuController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ClientesService } from '../services/clientes.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-listadoclientes',
  templateUrl: './listadoclientes.page.html',
  styleUrls: ['./listadoclientes.page.scss'],
})
export class ListadoclientesPage implements OnInit {
  clientes: any [] = [];
  constructor(private menu: MenuController, public router: Router,
    private _clientesService:ClientesService,
              private toastr:ToastrService, private authSvc: AuthService, private toast: ToastController) { }

  ngOnInit(): void {
    console.log('Hola')
    this.getClientes();
  }

  getClientes(){
    this._clientesService.getClientes().subscribe(data=>{
      this.clientes = [];
      data.forEach((element:any) => {
        this.clientes.push({
          id:element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
      console.log(this.clientes);
    });
  }

  eliminarCliente(id:string){
    this._clientesService.eliminarCliente(id).then(()=>{
      console.log('Cliente eliminado');
      this.presentToastError('El cliente fue eliminado con exito','¡Cliente eliminado!');
      /*this.toastr.error('El cliente fue eliminado con exito','¡Cliente eliminado!',{
        positionClass:'toast-bottom-right'
      })*/
    }).catch(error=>{
      console.log(error);
    })
  }

  openFirst() {
    this.menu.enable(true, 'first4');
    this.menu.open('first4');
  }

  openEnd() {
    this.menu.open('end');
  }

  openCustom() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
  }
  mensajeria(){
    this.menu.close();
    this.router.navigateByUrl("/mensajeria");
  }
  cotizaciones(){
    this.menu.close();
    this.router.navigateByUrl("/cotizaciones");
  }
  informacionCliente(){
    this.menu.close();
    this.router.navigateByUrl("/infoclientes");
  }
  async cerrarSesion(){
    this.menu.close();
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


}
