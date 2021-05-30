import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { Action, Store } from '@ngrx/store';
import { MockStore, provideMockStore} from '@ngrx/store/testing';
import { AppComponent } from './app.component';
import { OrderComponent } from './order/order.component';
import { RestockComponent } from './restock/restock.component';
import ProductState, { initializeState } from './store/product.state';
import { Observable, of, throwError } from 'rxjs';

describe('AppComponent', () => {
  
  let appComponent: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  const initialState = { products: initializeState() };
  let store: MockStore<{ products: ProductState }>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, FormsModule],
      declarations: [AppComponent, OrderComponent, RestockComponent],
      providers: [provideMockStore({ initialState })]
    })
      .compileComponents()
      .then(() => {
        store = TestBed.get<Store<{ products: ProductState }>>(Store);
      });
  }));
  
  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    appComponent = fixture.componentInstance;
    fixture.detectChanges();
  });
  
   
  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
  
  it('App component should have new product list if store is updated', () => {
    store.setState({ products: { Products: [], ProductError: null } });
    store.refreshState();
    expect(appComponent.ProductList.length).toEqual(0);

    const productList = [
      {id: 1, name: 'cola',  quantity: 1, price: 1.2}
    ];

    let nextState: ProductState = { Products: productList, ProductError: null };

    store.setState({ products: nextState });
    store.refreshState();

    expect(appComponent.ProductList).toEqual(productList);
    expect(appComponent.productError).toEqual(null);
  });
  
  
  it('Check input and output of order component', ()=> {
  
    let nextState: ProductState = {
      Products: [{id: 1, name: 'cola',  quantity: 1, price: 1.2}],
      ProductError: null
    };
    store.setState({ products: nextState });
    store.refreshState();
    
    appComponent.isOrderEnabled = true;
    fixture.detectChanges();
    
     
    let orderComponentDebugElement = fixture.debugElement.query(By.directive(OrderComponent));
    spyOn(orderComponentDebugElement.componentInstance.productEvent, 'emit');
    expect(orderComponentDebugElement.componentInstance.ProductList.length).toEqual(1);
    
    orderComponentDebugElement.componentInstance.selectedProduct = {id: 1, name: 'cola',  quantity: 1, price: 1.2};
  	orderComponentDebugElement.componentInstance.quantity = "1";
  	orderComponentDebugElement.componentInstance.tenderedMoney = "2";
  	
  	orderComponentDebugElement.componentInstance.orderProduct();
  	
  	fixture.detectChanges();
  
  	expect(orderComponentDebugElement.componentInstance.productEvent.emit).toHaveBeenCalled();
    expect(orderComponentDebugElement.componentInstance.productEvent.emit).toHaveBeenCalledWith({selectedProduct: Object({ id: 1, name: 'cola', quantity: 1, price: 1.2 }), quantity: '1', tenderedMoney: '2'});
	 	
  });
  
    it('Check input and output of restock component', ()=> {
  
    let nextState: ProductState = {
      Products: [{id: 1, name: 'cola',  quantity: 1, price: 1.2}],
      ProductError: null
    };
    store.setState({ products: nextState });
    store.refreshState();
    
    appComponent.isRestockEnabled = true;
    fixture.detectChanges();
    
     
    let restockComponentDebugElement = fixture.debugElement.query(By.directive(RestockComponent));
    spyOn(restockComponentDebugElement.componentInstance.productEvent, 'emit');
    expect(restockComponentDebugElement.componentInstance.ProductList.length).toEqual(1);
    
    restockComponentDebugElement.componentInstance.selectedRestockProduct = {id: 1, name: 'cola',  quantity: 1, price: 1.2};
  	restockComponentDebugElement.componentInstance.restockQuantity = "10";
  	
  	restockComponentDebugElement.componentInstance.restockProduct();
  	
  	fixture.detectChanges();
  
  	expect(restockComponentDebugElement.componentInstance.productEvent.emit).toHaveBeenCalled();
    expect(restockComponentDebugElement.componentInstance.productEvent.emit).toHaveBeenCalledWith({selectedRestockProduct: 
    	Object({ id: 1, name: 'cola', quantity: 1, price: 1.2 }), restockQuantity: '10'});
	 	
  });
   
  
 
});

