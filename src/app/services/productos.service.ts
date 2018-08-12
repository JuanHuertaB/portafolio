import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Producto} from '../interfaces/producto.interface';
import { resolve, reject } from '../../../node_modules/@types/q';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  productos: Producto[]= [];
  productoFiltrado: Producto[] =[];
  cargando = true;

  constructor(private http: HttpClient) {

    this.cargarProductos();
   }

   private cargarProductos(){

    return new Promise( ( resolve, reject ) => {
      
      this.http.get('https://angular-html-a9547.firebaseio.com/productos_idx.json')
      .subscribe( (resp: Producto[]) =>{
            this.cargando = false;
            this.productos = resp;
            resolve();
      });
    });

      
   }

   getProducto(id: string){
      return this.http.get(`https://angular-html-a9547.firebaseio.com/productos/${id}.json`);
   }

   buscarProducto(termino: string){

    if(this.productos.length === 0){
      //cargar productos
        this.cargarProductos().then( () =>{
          //ejecutar despues de tener los productos
          //aplicar el filtro
          this.filtrarProductos(termino);
        });
    }else{
        //aplicar filtro
        this.filtrarProductos(termino);  
      }

   }

   private filtrarProductos(termino: string){
    
    this.productoFiltrado = [];
    this.productos.forEach(prod =>{
      if(prod.categoria.indexOf(termino)>=0 || prod.titulo.indexOf(termino)>=0){
        this.productoFiltrado.push( prod );
      }
    })

   }

}
