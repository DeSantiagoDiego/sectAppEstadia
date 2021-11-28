import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, LoadingController, ToastController, IonicModule, Platform } from '@ionic/angular';
import { ClientesService } from '../services/clientes.service';
import { ControlService } from '../services/control.service';
import { PdfMakeWrapper, Table, Txt, Cell, Img } from 'pdfmake-wrapper';
import {ITable} from 'pdfmake-wrapper/lib/interfaces';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { AuthService } from '../services/auth.service';

import {
  File
} from '@ionic-native/file/ngx';
import {
  FileOpener
} from '@ionic-native/file-opener/ngx';
PdfMakeWrapper.setFonts(pdfFonts);


interface DataResponse{
  nombre:string,
  preciounitario: number,
  cantidad: number,
  total: number,
  totalWithIVA: number
}

type TableRow = [string,number,number,number, number]
@Component({
  selector: 'app-crear-cotizacion',
  templateUrl: './crear-cotizacion.page.html',
  styleUrls: ['./crear-cotizacion.page.scss'],
  providers:[File, FileOpener]
})
export class CrearCotizacionPage implements OnInit {

  clientes: any [] = [];
  producto: any [] = [];
  productosSeleccionadosVista: any [] = [];
  acumuladoSubTotal=0
  acumuladoTotalWithIVA=0
  clienteNombre='';
  clienteTelefono='';
  clienteBoolean=false;
  productoBoolean=false;

  pdfObj = null;
  constructor(private menu: MenuController,private router:Router,
     private _clientesService:ClientesService,private _productoService:ControlService,
      private authSvc: AuthService, public loadingCtrl: LoadingController, private toast: ToastController,
      private platform: Platform, private file: File, private fileOpener: FileOpener) { }

  ngOnInit(): void {
    //this.presentLoadingDefault();
    console.log(new Date ().toLocaleDateString("es-MX",{ weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }));
    (document.getElementById('botonExportar') as HTMLButtonElement).disabled = true;
    this.getClientes();
    this.getProductos();
  }

  openFirst() {
    this.menu.enable(true, 'first6');
    this.menu.open('first6');
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

  getProductos(){
    this._productoService.getProductos().subscribe(data=>{
      this.producto=[];
      data.forEach((element:any) => {
        this.producto.push({
          id:element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
      console.log(this.producto);
    })
  }

  productoSeleccionado(producto: any){
    (document.getElementById('botonExportar') as HTMLButtonElement).disabled = false;
    console.log(producto);
    console.log(this.productosSeleccionadosVista.length);
    var produtoExistente=false;
    var i = this.productosSeleccionadosVista.length;
    var j = i-1;
    if(i>0){
    do{
      if(this.productosSeleccionadosVista[j].nombre!==producto.nombre){
        console.log('No existe el producto');
      }else{
        console.log('Producto existente en la posicion: '+j);
        produtoExistente=true;
      }
      j=j-1;
      i=i-1;
    }while(i!=0);
  }
    if(produtoExistente!==true){
      this.productoBoolean=true;
    this.productosSeleccionadosVista.push({
      nombre:producto.nombre,
      preciounitario:producto.preciounitario,
      cantidad:0,
      total:0,
      totalWithIVA:0
    })
  }
    console.log(this.productosSeleccionadosVista);
  }

  clienteSeleccionado(cliente: any){
    this.clienteNombre=cliente.nombres+' '+cliente.apellidos;
    this.clienteTelefono=cliente.telefono;
    console.log(cliente)
    this.clienteBoolean=true;
  }
  verProductos(productos: any){
    alert('Boton meramente de prueba, será eliminado');
    console.log(productos);
  }
  cantidadProducto(valor:any, producto:any){
    console.log(producto);
    console.log('Nueva cantidad:'+valor.target.valueAsNumber);
    //console.log(this.productosSeleccionadosVista.length);
    var produtoExistente=false;
    var i = this.productosSeleccionadosVista.length;
    var j = i-1;
    if(i>0){
    do{
      if(this.productosSeleccionadosVista[j].nombre!==producto.nombre){
        //console.log('Aqui no está');
      }else{
        console.log('Producto a cantidad a actualizar en la posicion: '+j);
        this.productosSeleccionadosVista[j].cantidad=valor.target.valueAsNumber;
        this.productosSeleccionadosVista[j].total=this.productosSeleccionadosVista[j].cantidad*this.productosSeleccionadosVista[j].preciounitario;
        var totalProducto= this.productosSeleccionadosVista[j].total*1.16;
        totalProducto= +totalProducto.toFixed(2);
        this.productosSeleccionadosVista[j].totalWithIVA= totalProducto;
        produtoExistente=true;
      }
      j=j-1;
      i=i-1;
    }while(i!==0 || produtoExistente!=true);
  }
}

async exportarCotizacion(){
    var i = this.productosSeleccionadosVista.length;
    var j = i-1;
    var cantidadNegativa=false;
    if(i>0){
  do{
    if(this.productosSeleccionadosVista[j].cantidad<=0){
      cantidadNegativa=true;
    }else{
    }
    j=j-1;
    i=i-1;
  }while(i>0)
  if(cantidadNegativa!=true  && this.clienteBoolean!=false && this.productoBoolean!=false){
  console.log(this.productosSeleccionadosVista)
  console.log(this.clienteNombre)
  console.log(this.clienteTelefono);
  console.log('Listo para generar PDF');
  this.presentToastSuccess('Espere un momento, porfavor...','Generando Cotización.')
  //alert('Listo para generar PDF');
  //Generar PDF
  await this.acumulado();
  const pdf = new PdfMakeWrapper();
  pdf.add(await new Img('/assets/icon/sectapp.svg').relativePosition(415,5).color('red').width(100).build())
  pdf.add(new Txt('COTIZACIONES SECT').alignment('center').bold().fontSize(24).end);
  pdf.add("\n");
  pdf.add('Datos del cliente:');
  pdf.add('Nombre Completo: ' +this.clienteNombre);
  pdf.add('Telefono: '+this.clienteTelefono);
  pdf.add("\n");
  pdf.add(
      this.createTable(this.productosSeleccionadosVista)
  )
  pdf.add(new Txt('IVA incluido en TOTAL').alignment('right').italics().end)
  pdf.add("\n");
  pdf.add(
    new Table([
      ['SUBTOTAL ACUMULADO', 'TOTAL ACUMULADO'],
      [this.acumuladoSubTotal,this.acumuladoTotalWithIVA]
    ]).layout('lightHorizontalLines').widths('*').end
  )
  pdf.add("\n");
  pdf.add(new Txt('Fecha de creacion: '+ new Date ().toLocaleDateString("es-MX",{ weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })).alignment('left').italics().end)
    //pdf.create().print();
    console.log('Ya fue');
    this.pdfObj = pdf.create();
    if (this.platform.is('cordova')) {
      this.pdfObj.getBuffer((buffer) => {
         var blob = new Blob([buffer], {
            type: 'application/pdf'
         });

         // Save the PDF to the data Directory of our App
         var name = this.clienteNombre +' '+ new Date ().toLocaleDateString("es-MX",{ weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
         this.file.writeFile(this.file.dataDirectory, name, blob, {
            replace: true
         }).then(fileEntry => {
            // Open the PDf with the correct OS tools
            this.fileOpener.open(this.file.dataDirectory + name, 'application/pdf');
         })
      });
    }
  }else{
    console.log('Verifica');
    //alert('Verifica');
    this.presentToastError('Verifica los datos e intentalo denuevo.', '¡Ha ocurrido un error!');
  }
}
}
irPDF(pdf){
  console.log(pdf);
  window.open(pdf.toString(), '_blank');
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
  createTable(data: DataResponse[]): ITable{
    [{}]
    return new Table([
      ['NOMBRE','PRECIO UNIT.','CANTIDAD','SUBTOTAL','TOTAL'],
      ...this.datosAcomodados(data)
    ]).layout('lightHorizontalLines').widths('*').end
  }
  datosAcomodados(data:DataResponse[]): TableRow[]{
    return data.map(row=>[row.nombre,row.preciounitario,row.cantidad,row.total,row.totalWithIVA] as TableRow);
  }

  async acumulado(){
    var i = 0;
    do{
      this.acumuladoSubTotal=this.acumuladoSubTotal+this.productosSeleccionadosVista[i].total;
      this.acumuladoTotalWithIVA=this.acumuladoTotalWithIVA+this.productosSeleccionadosVista[i].totalWithIVA;
      i=i+1;
    }while(i<this.productosSeleccionadosVista.length)//5
  }

  async presentLoadingDefault(){
    let loading = await this.loadingCtrl.create({
    spinner: 'circular',
    });
  
    loading.present();
  
    const waiting = setInterval(() => {
      if(this.clientes.length!==0 && this.producto.length!==0){
        clearInterval(waiting);
        loading.dismiss();
      }
    }, 1000);
  }

}
