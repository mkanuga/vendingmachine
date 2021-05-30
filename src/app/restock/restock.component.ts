import { Component, Output, EventEmitter, Input } from '@angular/core';
import Product from '../store/product.model';

@Component({
  selector: 'app-restock',
  templateUrl: './restock.component.html',
  styleUrls: ['./restock.component.scss']
})
export class RestockComponent  {

 @Input() ProductList: Product[];
 
 
  @Output() productEvent = new EventEmitter<{selectedRestockProduct:Product, restockQuantity:string}>();
  
  selectedRestockProduct: Product = null;
  restockQuantity: string = "";
  
  restockProduct(){
  	this.productEvent.emit({selectedRestockProduct:this.selectedRestockProduct, 
  		restockQuantity:this.restockQuantity});
  }
  

  constructor() { }


}
