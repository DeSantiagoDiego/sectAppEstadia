import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, LoadingController } from '@ionic/angular';
import { ClientesService } from '../services/clientes.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-infoclientes',
  templateUrl: './infoclientes.page.html',
  styleUrls: ['./infoclientes.page.scss'],
})
export class InfoclientesPage implements OnInit {
  clientes: any [] = [];
  constructor(private menu: MenuController, public router: Router,
     private _clientesService: ClientesService, private authSvc: AuthService, public loadingCtrl: LoadingController) { }

  ngOnInit() {
    //this.presentLoadingDefault();
    this.getClientes();
  }
  irVerCLiente(id: any){
    this.menu.close();
    this.router.navigate(["/vercliente/"+id]).then(()=>{
      location.reload();
    })
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

  openFirst() {
    this.menu.enable(true, 'first7');
    this.menu.open('first7');
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
  async presentLoadingDefault(){
    let loading = await this.loadingCtrl.create({
    spinner: 'circular',
    });
  
    loading.present();
  
    const waiting = setInterval(() => {
      if(this.clientes.length!==0){
        clearInterval(waiting);
        loading.dismiss();
      }
    }, 1000);
  }

}
