import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {BASE_URL} from '../../conifg';

// import api from '../api'; // Assuming you have an API module to handle network requests

// Create an async thunk for user data
export const getCollectionData = createAsyncThunk(
  'getCollectionList',
  async userToken => {
    const req = await getCollectionDataApi(userToken);
    console.log('response from get user data api is', req);
    return req;
    // if (req.status === 200) {
    //   return req;
    // }
  },
);

export const getCollectionDataApi = async userToken => {
  const res = await fetch(`${BASE_URL}/collection-listing/`, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `token ${userToken}`,
    },
  });
  const result = await res.json();
  //console.log('result is', result);
  return result;
};

// Create the userProfile slice
const collectionSlice = createSlice({
  name: 'collection',

  initialState: {
    collectionData: [],
    error: null,
    isLoading: false,
  },

  extraReducers: builder => {
    // Handle getUserData fulfilled
    builder.addCase(getCollectionData.fulfilled, (state, action) => {
      if (action.payload.status_code === 200) {
        state.error = 'fullfiled';
        state.isLoading = false;
        state.collectionData = action.payload.result;
      }
      if (action.payload.status_code === 400) {
        state.error = 'no data';
        state.isLoading = false;
      }
      // state.collctionData = action.payload.data;
    });

    // Handle getUserData pending
    builder.addCase(getCollectionData.pending, state => {
      state.isLoading = true;
      state.error = 'pending';
    });

    // Handle getUSerData rejected
    builder.addCase(getCollectionData.rejected, (state, action) => {
      state.isLoading = false;
      state.error = 'rejected';
    });
  },
});

export const selectCollectionData = state => state.collection.collectionData;

export default collectionSlice.reducer;
