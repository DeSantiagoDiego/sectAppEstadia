import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  constructor(private menu: MenuController, public router: Router) { }

  ngOnInit() {
  }

  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
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
