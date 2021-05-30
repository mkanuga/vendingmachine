import Product from './product.model';

export default class ProductState {
  Products: Array<Product>;
  ProductError: Error;
}

export const initializeState = (): ProductState => {
  
  return { Products: Array<Product>(), ProductError: null };
};
