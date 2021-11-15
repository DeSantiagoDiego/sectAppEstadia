import { Component, OnInit } from '@angular/core';
import { MenuController, ToastController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ClientesService } from '../services/clientes.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-crearcliente',
  templateUrl: './crearcliente.page.html',
  styleUrls: ['./crearcliente.page.scss'],
})
export class CrearclientePage implements OnInit {

  createcliente: FormGroup;
  submitted = false;
  loading = false;
  id:string | null;
  titulo='Agregar cliente';

  constructor(private menu: MenuController,
              private fb:FormBuilder,
              private _clienteService:ClientesService,
              private router:Router,
              private toastr:ToastrService,
              private aRoute:ActivatedRoute,
              private authSvc: AuthService,
              private toast: ToastController) {
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
    console.log(this.router.url);
    if(this.router.url=='/crearcliente'){
      this.titulo='Agregar Cliente'
    }else{
      this.esEditar();
    }
  }

  openFirst() {
    this.menu.enable(true, 'first5');
    this.menu.open('first5');
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

  agregarEditarCliente(){
    this.submitted = true;

    if(this.createcliente.invalid){
      return;
    }
    if(this.id===null){
      this.agregarCliente();
    }else{
      this.editarCliente(this.id);
    }
  }

  agregarCliente(){
    const cliente: any={
      nombres:this.createcliente.value.nombres,
      apellidos:this.createcliente.value.apellidos,
      sexo:this.createcliente.value.sexo,
      telefono:this.createcliente.value.telefono,
      domicilio:this.createcliente.value.domicilio,
      fechaCreacion: new Date(),
      fechaActualizacion:new Date()
    }
    this.loading = true;
    this._clienteService.agregarCliente(cliente).then(()=>{
      this.presentToastSuccess('El cliente se registro correctamente','¡Cliente registrado!');
      /*this.toastr.success('El cliente se registro correctamente','¡Cliente registrado!',{
        positionClass:'toast-bottom-center'
      });*/
      this.loading = false;
      this.router.navigate(['/listadoclientes']);
    }).catch(error=>{
      console.log(error);
      this.loading = false;
    })
  }

  editarCliente(id:string){
    const cliente: any={
      nombres:this.createcliente.value.nombres,
      apellidos:this.createcliente.value.apellidos,
      sexo:this.createcliente.value.sexo,
      telefono:this.createcliente.value.telefono,
      domicilio:this.createcliente.value.domicilio,
      fechaActualizacion:new Date()
    }
    this.loading = true;
    this._clienteService.actualizarCliente(id,cliente).then(()=>{
      this.loading=false;
      this.presentToastSuccess('El cliente se modifico con exito','¡Cliente modificado!');
      /*this.toastr.info('El cliente se modifico con exito','¡Cliente modificado!',{
        positionClass:'toast-bottom-right'
      })*/
      this.router.navigate(['/listadoclientes']);
    })
  }

  esEditar(){
    this.titulo = 'Editar cliente'
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
      })
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


}
