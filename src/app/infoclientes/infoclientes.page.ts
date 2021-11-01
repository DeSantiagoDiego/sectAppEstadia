import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-infoclientes',
  templateUrl: './infoclientes.page.html',
  styleUrls: ['./infoclientes.page.scss'],
})
export class InfoclientesPage implements OnInit {

  constructor(private menu: MenuController, public router: Router) { }

  ngOnInit() {
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
