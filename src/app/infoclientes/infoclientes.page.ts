import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { ClientesService } from '../services/clientes.service';

@Component({
  selector: 'app-infoclientes',
  templateUrl: './infoclientes.page.html',
  styleUrls: ['./infoclientes.page.scss'],
})
export class InfoclientesPage implements OnInit {
  clientes: any [] = [];
  constructor(private menu: MenuController, public router: Router, private _clientesService: ClientesService) { }

  ngOnInit() {
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
  cerrarSesion(){
    this.menu.close();
  }

}
