import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {BASE_URL} from '../../conifg';

// import api from '../api'; // Assuming you have an API module to handle network requests

// Create an async thunk for user data
export const getCategoryData = createAsyncThunk(
  'getCategoryList',
  async params => {
    console.log('category asasxsaashgvh', params.id);
    const req = await getCategoryDataApi(params);
    console.log('response from get catrpgy api ', req);
    return req;
    // if (req.status === 200) {
    //   return req;
    // }
  },
);

export const getCategoryDataApi = async params => {
  console.log('end point',params.userToken);
  const res = await fetch(`${BASE_URL}/category-listing/${params.id}/`, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `token ${params.userToken}`,
    },
  });
  const result = await res.json();
  console.log('result is', result);
  return result;
};


// Create an async thunk for user data
export const getCategoryDataNext = createAsyncThunk(
  'getCategoryList',
  async params => {
    console.log('category asasxsaashgvh', params.id);
    const req = await getCategoryDataApiNext(params);
    console.log('response from get catrpgy api ', req);
    return req;
    // if (req.status === 200) {
    //   return req;
    // }
  },
);

export const getCategoryDataApiNext = async params => {
  console.log('end point',params.userToken);
  const res = await fetch(`${BASE_URL}/category/${params.id}/`, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `token ${params.userToken}`,
    },
  });
  const result = await res.json();
  console.log('result is', result);
  return result;
};
// Create the userProfile slice
const categorySlice = createSlice({
  name: 'category',

  initialState: {
    categoryData: [],
    error: null,
    isLoading: false,
  },

  extraReducers: builder => {
    // Handle getUserData fulfilled
    builder.addCase(getCategoryData.fulfilled, (state, action) => {
      if (action.payload.status_code === 200) {
        state.error = 'fullfiled';
        state.isLoading = false;
        state.categoryData = action.payload.result;
      }
      if (action.payload.status_code === 400) {
        state.error = 'no data';
        state.isLoading = false;
      }
      // state.collctionData = action.payload.data;
    });

    // Handle getUserData pending
    builder.addCase(getCategoryData.pending, state => {
      state.isLoading = true;
      state.error = 'pending';
    });

    // Handle getUSerData rejected
    builder.addCase(getCategoryData.rejected, (state, action) => {
      state.isLoading = false;
      state.error = 'rejected';
    });
  },
});

export const selectCategoryData = state => state.category.categoryData;

export default categorySlice.reducer;
