import { configureStore } from '@reduxjs/toolkit';
import cart from './cartSlice';
import page from './pageSlice';
import items from './itemSlice';

export default configureStore({
  reducer: {
    cart: cart.reducer,
    page: page.reducer,
    items: items.reducer,
  },
});
