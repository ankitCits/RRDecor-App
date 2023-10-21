import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {BASE_URL} from '../../conifg';

// import api from '../api'; // Assuming you have an API module to handle network requests

// Create an async thunk for user data
export const getProductData = createAsyncThunk(
  'getProductList',
  async params => {
    console.log('product asasxsaashgvh', params.id);
    const req = await getProductDataApi(params);
    console.log('response from get product api ', req);
    return req;
    // if (req.status === 200) {
    //   return req;
    // }
  },
);

export const getProductDataApi = async params => {
  console.log('end point', `${BASE_URL}/product/${params.id}`);
  const res = await fetch(`${BASE_URL}/product/${params.id}/`, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `token ${params.userToken}`,
    },
  });
  const result = await res.json();
  //console.log('result is', result);
  return result;
};

// Create the userProfile slice
const productSlice = createSlice({
  name: 'product',

  initialState: {
    productData: [],
    error: null,
    isLoading: false,
  },

  extraReducers: builder => {
    // Handle getUserData fulfilled
    builder.addCase(getProductData.fulfilled, (state, action) => {
      if (action.payload.status_code === 200) {
        state.error = 'fullfiled';
        state.isLoading = false;
        state.productData = action.payload.result;
      }
      if (action.payload.status_code === 400) {
        state.error = 'no data';
        state.isLoading = false;
      }
      // state.collctionData = action.payload.data;
    });

    // Handle getUserData pending
    builder.addCase(getProductData.pending, state => {
      state.isLoading = true;
      state.error = 'pending';
    });

    // Handle getUSerData rejected
    builder.addCase(getProductData.rejected, (state, action) => {
      state.isLoading = false;
      state.error = 'rejected';
    });
  },
});

export const selectProductData = state => state.product.productData;

export default productSlice.reducer;
