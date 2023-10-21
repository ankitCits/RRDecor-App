import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {BASE_URL} from '../../conifg';

// import api from '../api'; // Assuming you have an API module to handle network requests

// Create an async thunk for user data

export const getOrderData = createAsyncThunk('getOrder', async params => {
  console.log('get Order prams is', params);
  const req = await getOrderDataApi(params);
  console.log('response from get order api ', req);
  return req;
});

export const getOrderDataApi = async params => {
  const res = await fetch(`${BASE_URL}/order-get/`, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `token ${params}`,
    },
  });
  const result = await res.json();
  //console.log('result is', result);
  return result;
};

export const postOrderData = createAsyncThunk('postOrder', async params => {
  console.log('post Order prams is', params);
  const req = await postOrderDataApi(params);
  console.log('response from post order api ', req);
  return req;
});

export const postOrderDataApi = async params => {
  const res = await fetch(`${BASE_URL}/item-order/`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `token ${params.userToken}`,
    },
    body: JSON.stringify({
      billing_address_id: params.billing_address_id,
      // shipping_address_id: params.shipping_address_id,
    }),
  });
  const result = await res.json();
  //console.log('result is', result);
  return result;
};

// Create the order slice
const orderSlice = createSlice({
  name: 'order',

  initialState: {
    orderData: [],
    orderError: null,
    isOrderLoading: false,
    orderAdded: false,
  },
  reducers: {
    resetOrderStatus: state => {
      console.log('reset start', state.orderAdded);
      state.orderAdded = false;
      state.error = null;
      state.isOrderLoading = false;
      console.log('reset end', state.orderAdded);
      // Reset the state to an empty object or its initial values
    },
  },

  extraReducers: builder => {
    builder.addCase(postOrderData.fulfilled, (state, action) => {
      if (action.payload.status_code === 200) {
        state.orderError = 'order added';
        state.isOrderLoading = false;
        state.orderAdded = true;
      }
      if (action.payload.status_code === 400) {
        state.orderError = 'no data';
        state.isOrderLoading = false;
      }
      // state.collctionData = action.payload.data;
    });

    // Handle getUserData pending
    builder.addCase(postOrderData.pending, state => {
      state.isOrderLoading = true;
      state.orderError = 'pending';
    });

    // Handle getUSerData rejected
    builder.addCase(postOrderData.rejected, (state, action) => {
      state.isOrderLoading = false;
      state.orderError = 'rejected';
    });
    builder.addCase(getOrderData.fulfilled, (state, action) => {
      if (action.payload.status_code === 200) {
        state.orderError = 'got data';
        state.isOrderLoading = false;
        state.orderData = action.payload.result;
      }
      if (action.payload.status_code === 400) {
        state.orderError = 'no data';
        state.isOrderLoading = false;
      }
      // state.collctionData = action.payload.data;
    });

    // Handle getUserData pending
    builder.addCase(getOrderData.pending, state => {
      state.isOrderLoading = true;
      state.orderError = 'pending';
    });

    // Handle getUSerData rejected
    builder.addCase(getOrderData.rejected, (state, action) => {
      state.isOrderLoading = false;
      state.orderError = 'rejected';
    });
  },
});

export const selectOrderStatus = state => state.order.orderAdded;
export const selectOrderData = state => state.order.orderData;
export const {resetOrderStatus} = orderSlice.actions;

export default orderSlice.reducer;
