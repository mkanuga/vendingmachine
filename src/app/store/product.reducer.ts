import { Action, createReducer, on } from '@ngrx/store';
import * as ProductActions from './product.action';
import ProductState, { initializeState } from './product.state';

const initialState = initializeState();

const reducer = createReducer(
  initialState,
  on(ProductActions.UpdateProductAction, (state: ProductState, { payload }) => {
    let stateWithoutProduct = state.Products.filter(item => item.id !== payload.id)
    return { ...state, Products: [...stateWithoutProduct, payload], ProductError: null };
  }),  
  on(ProductActions.InitialiseProductAction, (state: ProductState, { payload }) => {
    return { ...state, Products: payload, ProductError: null };
  })
);

export function ProductReducer(
  state: ProductState | undefined,
  action: Action
): ProductState {
  return reducer(state, action);
}
