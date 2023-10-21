import {configureStore} from '@reduxjs/toolkit';

import authReducer from '../Slices/authSlice';
import collectionSlice from '../Slices/collectionSlice';
import categorySlice from '../Slices/categorySlice';
import productSlice from '../Slices/productSlice';
import searchSlice from '../Slices/searchSlice';
import productRollSlice from '../Slices/productRollSlice';
import contactSlice from '../Slices/contactSlice';
import ledgerSlice from '../Slices/ledgerSlice';
import cartSlice from '../Slices/cartSlice';
import shippingSlice from '../Slices/shippingSlice';
import orderSlice from '../Slices/orderSlice';
import bannerSlice from '../Slices/bannerSlice';
const Store = configureStore({
  reducer: {
    auth: authReducer,
    collection: collectionSlice,
    category: categorySlice,
    product: productSlice,
    search: searchSlice,
    productRoll: productRollSlice,
    contact: contactSlice,
    ledger: ledgerSlice,
    cart: cartSlice,
    shipping: shippingSlice,
    order: orderSlice,
    banner: bannerSlice,
  },
});

export default Store;
