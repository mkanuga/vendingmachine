import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import Product from '../store/product.model';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  @Input() ProductList: Product[];
  
  selectedProduct: Product = null;
  quantity:string = "";
  tenderedMoney:string = "";
  
  orderProduct(){
  	this.productEvent.emit({selectedProduct:this.selectedProduct, quantity:this.quantity, tenderedMoney:this.tenderedMoney});
  }
  
  @Output() productEvent = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }
  

}
