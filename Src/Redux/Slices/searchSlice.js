import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {BASE_URL} from '../../conifg';

// import api from '../api'; // Assuming you have an API module to handle network requests

// Create an async thunk for user data
export const getSearchData = createAsyncThunk(
  'getSearchDataList',
  async params => {
    console.log('search asasxsaashgvh', params.search);
    const req = await getSearchDataApi(params);
    console.log('response from search api ', req);
    return req;
    // return req;
    // if (req.status === 200) {
    //   return req;
    // }
  },
);

export const getSearchDataApi = async params => {
  console.log(
    'end point',
    `${BASE_URL}/product-search/?search=${params.search}`,
  );
  const res = await fetch(
    `${BASE_URL}/product-search/?search=${params.search}`,
    {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `token ${params.userToken}`,
      },
    },
  );
  const result = await res.json();
  //console.log('result is', result);
  return result;
};

// Create the searchSlice slice
const searchSlice = createSlice({
  name: 'search',

  initialState: {
    searchData: null,
    error: null,
    isLoading: false,
  },
  reducers: {
    resetSearchData: state => {
      state.searchData = null; // Reset the state to an empty object or its initial values
    },
  },

  extraReducers: builder => {
    // Handle getUserData fulfilled
    builder.addCase(getSearchData.fulfilled, (state, action) => {
      console.log('action oatload', action.payload);
      state.error = 'fullfiled';
      state.isLoading = false;
      state.searchData = action.payload;

      // state.collctionData = action.payload.data;
    });

    // Handle getUserData pending
    builder.addCase(getSearchData.pending, state => {
      state.isLoading = true;
      state.error = 'pending';
    });

    // Handle getUSerData rejected
    builder.addCase(getSearchData.rejected, (state, action) => {
      state.isLoading = false;
      state.error = 'rejected';
    });
  },
});

export const selectSearchData = state => state.search.searchData;
export const {resetSearchData} = searchSlice.actions;
export default searchSlice.reducer;
