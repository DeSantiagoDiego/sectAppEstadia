import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cotizaciones',
  templateUrl: './cotizaciones.page.html',
  styleUrls: ['./cotizaciones.page.scss'],
})
export class CotizacionesPage implements OnInit {

  constructor(private menu: MenuController, public router: Router) { }

  ngOnInit() {
  }
  openFirst() {
    this.menu.enable(true, 'first3');
    this.menu.open('first3');
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

  goListadoClientes(){
    this.router.navigate(['/listadoclientes']).then(()=>{
      location.reload();
    })
  }
  goNuevaCotizacion(){
    this.router.navigate(['/crear-cotizacion']).then(()=>{
      location.reload();
    })
  }

}
