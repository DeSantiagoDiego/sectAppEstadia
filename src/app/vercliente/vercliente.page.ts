import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientesService } from '../services/clientes.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-vercliente',
  templateUrl: './vercliente.page.html',
  styleUrls: ['./vercliente.page.scss'],
})
export class VerclientePage implements OnInit {
  createcliente: FormGroup;
  id:string | null;
  loading = false;
  nombres: string;
  apellidos: string;
  sexo: string;
  telefono: string;
  domicilio:string;
  constructor(private aRoute:ActivatedRoute, private _clienteService:ClientesService,
    private router:Router, private fb:FormBuilder,private menu: MenuController) { 
      this.createcliente = this.fb.group({
        nombres:['',Validators.required],
        apellidos:['',Validators.required],
        sexo:['',Validators.required],
        telefono:['',Validators.required],
        domicilio:['',Validators.required],
      })
  this.id = this.aRoute.snapshot.paramMap.get('id');
  console.log(this.id);
  }
  
  ngOnInit(): void {
      this.verCliente();
  }

  openFirst() {
    this.menu.enable(true, 'first8');
    this.menu.open('first8');
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
  verCliente(){
    if (this.id!==null){
      this.loading = true;
      this._clienteService.getCliente(this.id).subscribe(data =>{
        this.loading = false;
        console.log(data.payload.data()['nombres']);
        this.createcliente.setValue({
          nombres:data.payload.data()['nombres'],
          apellidos:data.payload.data()['apellidos'],
          sexo:data.payload.data()['sexo'],
          telefono:data.payload.data()['telefono'],
          domicilio:data.payload.data()['domicilio']
        })
        this.nombres = data.payload.data()['nombres']
        this.apellidos = data.payload.data()['apellidos']
        this.sexo = data.payload.data()['sexo']
        this.telefono=data.payload.data()['telefono']
        this.domicilio=data.payload.data()['domicilio']
      }) 
    }
  }


}
