import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {BASE_URL} from '../../conifg';

// import api from '../api'; // Assuming you have an API module to handle network requests

// Create an async thunk for user data
export const getShippingData = createAsyncThunk(
  'getShippingList',
  async userToken => {
    console.log('get getShipping date asasxsaashgvh', userToken);
    const req = await getShippingDataApi(userToken);
    console.log('response from get shipping api ', req);
    return req;
  },
);

export const getShippingDataApi = async userToken => {
  const res = await fetch(`${BASE_URL}/address/`, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `token ${userToken}`,
    },
  });
  const result = await res.json();

  return result;
};

export const postShippingData = createAsyncThunk(
  'postShipping',
  async params => {
    console.log('post shipping asasxsaashgvh', params);
    const req = await postShippingDataApi(params);
    console.log('response from post shipping api ', req);
    return req;
  },
);

export const postShippingDataApi = async params => {
  const res = await fetch(`${BASE_URL}/address/`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `token ${params.userToken}`,
    },


    body: JSON.stringify({
      full_address: params.name + " " +params.address,
      district: params.city,
      state: params.state,
      pin_code: params.zipcode,
      country: params.country,
      gstId:params.gstId,
      mobileNo:params.mobileNo
    }),
  });
  const result = await res.json();
  //console.log('result is', result);
  return result;
};

// Create the shipping slice
const shippingSlice = createSlice({
  name: 'shipping',

  initialState: {
    shippingData: [],
    error: null,
    isLoading: false,
    shippingAdded: false,
  },
  reducers: {
    clearShippingData: state => {
      state.shippingAdded = false;
      state.error = null;
      state.isLoading = false; // Reset the state to an empty object or its initial values
    },
  },

  extraReducers: builder => {
    // Handle getUserData fulfilled
    builder.addCase(getShippingData.fulfilled, (state, action) => {
      if (action.payload.status_code === 200) {
        state.error = 'fullfiled';
        state.isLoading = false;
        state.shippingData = action.payload.result;
      }
      if (action.payload.status_code === 400) {
        state.error = 'error';
        state.isLoading = false;
      }
      // state.collctionData = action.payload.data;
    });

    // Handle getUserData pending
    builder.addCase(getShippingData.pending, state => {
      state.isLoading = true;
      state.error = 'pending';
    });

    // Handle getUSerData rejected
    builder.addCase(getShippingData.rejected, (state, action) => {
      state.isLoading = false;
      state.error = 'rejected';
    });

    builder.addCase(postShippingData.fulfilled, (state, action) => {
      if (action.payload.status_code === 200) {
        state.error = 'shipping address added';
        state.isLoading = false;
        state.shippingAdded = true;
      }
      if (action.payload.status_code === 400) {
        state.error = 'no data';
        state.isLoading = false;
      }
      // state.collctionData = action.payload.data;
    });

    // Handle getUserData pending
    builder.addCase(postShippingData.pending, state => {
      state.isLoading = true;
      state.error = 'pending';
    });

    // Handle getUSerData rejected
    builder.addCase(postShippingData.rejected, (state, action) => {
      state.isLoading = false;
      state.error = 'rejected';
    });
  },
});

export const selectShippingData = state => state.shipping.shippingData;
export const {clearShippingData} = shippingSlice.actions;

export default shippingSlice.reducer;
