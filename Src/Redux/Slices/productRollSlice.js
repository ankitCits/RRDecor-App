import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {BASE_URL} from '../../conifg';

// import api from '../api'; // Assuming you have an API module to handle network requests

// Create an async thunk for user data
export const getProductRollData = createAsyncThunk(
  'getProductRollList',
  async params => {
    console.log('product roll asasxsaashgvh', params.id);
    const req = await getProductRollDataApi(params);

    return req;
    // if (req.status === 200) {
    //   return req;
    // }
  },
);

export const getProductRollDataApi = async params => {
  console.log('end point', `${BASE_URL}/product-details/${params.id}`);
  const res = await fetch(`${BASE_URL}/product-details/${params.id}/`, {
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
const productRollSlice = createSlice({
  name: 'productRoll',

  initialState: {
    productRollData: [],
    error: null,
    isLoading: false,
  },

  extraReducers: builder => {
    // Handle getUserData fulfilled
    builder.addCase(getProductRollData.fulfilled, (state, action) => {
      if (action.payload.status_code === 200) {
        state.error = 'fullfiled';
        state.isLoading = false;
        state.productRollData = action.payload.result;
      }
      if (action.payload.status_code === 400) {
        state.error = 'no data';
        state.isLoading = false;
      }
      // state.collctionData = action.payload.data;
    });

    // Handle getUserData pending
    builder.addCase(getProductRollData.pending, state => {
      state.isLoading = true;
      state.error = 'pending';
    });

    // Handle getUSerData rejected
    builder.addCase(getProductRollData.rejected, (state, action) => {
      state.isLoading = false;
      state.error = 'rejected';
    });
  },
});

export const selectProductRollData = state => state.productRoll.productRollData;

export default productRollSlice.reducer;
