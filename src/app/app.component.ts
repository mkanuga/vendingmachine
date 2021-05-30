import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import * as ProductActions from './store/product.action';
import Product from './store/product.model';
import ProductState from './store/product.state';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit {
  title = 'Vending Machine';
  
  isOrderEnabled: boolean = false;
  isRestockEnabled:  boolean = false;
 

constructor(private store: Store<{ products: ProductState }>) {
    this.product$ = store.pipe(select('products'));
  }

  ngOnInit() {    
    this.ProductSubscription = this.product$
      .pipe(
        map(x => {
          this.ProductList = x.Products;
          this.productError = x.ProductError;
        })
      )
      .subscribe();

  	const productArray: Product[] = [{id: 1, name: 'cola',  quantity: 1, price: 1.2}]
  	this.store.dispatch(ProductActions.InitialiseProductAction({ payload: productArray }));    
  }

  product$: Observable<ProductState>;
  ProductSubscription: Subscription;
  ProductList: Product[] = [];
  
  productError: Error = null;
  errorMessage: string = "";
  successMessage:string = "";
  

  

  receiveOrder(event) {
    this.successMessage = "";
    this.errorMessage = "";
    let quantityOrdered:number = parseInt(event.quantity);
    let tenderedCash = parseFloat(event.tenderedMoney)

    if(event.selectedProduct == null){
      this.errorMessage = 'Please select Product'
    }
    let productInQuestion = this.ProductList.filter(item => item.id === event.selectedProduct.id)[0];
    if((productInQuestion.price * quantityOrdered) > tenderedCash){
      this.errorMessage = 'Insufficient Money';
    }else if((productInQuestion.quantity - quantityOrdered) < 0){
      this.errorMessage = 'Out of stock' ;
    }else{
      let remainingQuantity = productInQuestion.quantity - quantityOrdered;
      let productRemaining = {id: productInQuestion.id, name: productInQuestion.name, 
         quantity: remainingQuantity, price: productInQuestion.price}
      this.store.dispatch(ProductActions.UpdateProductAction({ payload: productRemaining }));
      this.successMessage = 'Please take ' + event.quantity + ' cans ' + ' and collect change $' +  
                            parseFloat((tenderedCash - (productInQuestion.price * quantityOrdered)) + "").toPrecision(2);      
    }
    
  }
  
 
  restockProduct(event) {
    this.successMessage = "";
    this.errorMessage = "";
    if(event.selectedRestockProduct == null){
      this.errorMessage = 'Please select Product'
    }
    const productInQuestion:Product = this.ProductList.filter(item => item.id === event.selectedRestockProduct.id)[0];
         
    let quantityRemaining:number = productInQuestion.quantity + parseInt(event.restockQuantity) ;
    let productRemaining = {id: productInQuestion.id, name: productInQuestion.name, 
         quantity: quantityRemaining, price: productInQuestion.price}
    this.store.dispatch(ProductActions.UpdateProductAction({ payload: productRemaining }));
    this.successMessage = 'Restocked with ' + event.restockQuantity + ' cans';    
  }
  
  
  enableOrder(){
   this.isOrderEnabled = true;
   this.isRestockEnabled = false;
  }
  
  enableRestock(){
   this.isOrderEnabled = false;
   this.isRestockEnabled = true;
  }

  ngOnDestroy() {
    if (this.ProductSubscription) {
      this.ProductSubscription.unsubscribe();
    }
  }
  
}
