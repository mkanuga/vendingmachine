import { createAction, props } from '@ngrx/store';
import Product from './product.model';

export const InitialiseProductAction = createAction(
  '[Product] - Initialise Product',
  props<{ payload: Product[] }>()
);

export const GetProductAction = createAction(
  '[Product] - Get Product');

export const UpdateProductAction = createAction(
  '[Product] - Create Product',
  props<{ payload: Product }>()
);


