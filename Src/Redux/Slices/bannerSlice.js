import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {BASE_URL} from '../../conifg';

// import api from '../api'; // Assuming you have an API module to handle network requests

// Create an async thunk for user data
export const getBannerData = createAsyncThunk('getBannerList', async () => {
  const req = await getBannerDataApi();
  console.log('response from get banner data api is', req);
  return req;
  // if (req.status === 200) {
  //   return req;
  // }
});

export const getBannerDataApi = async () => {
  const res = await fetch(`${BASE_URL}/banner/`, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const result = await res.json();
  //console.log('result is', result);
  return result;
};

// Create the userProfile slice
const bannerSlice = createSlice({
  name: 'banner',

  initialState: {
    bannerData: [],
    bannerError: null,
    isBannerLoading: false,
  },

  extraReducers: builder => {
    // Handle getBanner Data fulfilled
    builder.addCase(getBannerData.fulfilled, (state, action) => {
      if (action.payload.status_code === 200) {
        state.bannerError = 'fullfiled';
        state.isBannerLoading = false;
        state.bannerData = action.payload.result;
      }
      if (action.payload.status_code === 400) {
        state.bannerError = 'no data';
        state.isBannerLoading = false;
      }
      // state.collctionData = action.payload.data;
    });

    // Handle getUserData pending
    builder.addCase(getBannerData.pending, state => {
      state.isBannerLoading = true;
      state.bannerError = 'pending';
    });

    // Handle getUSerData rejected
    builder.addCase(getBannerData.rejected, (state, action) => {
      state.isBannerLoading = false;
      state.bannerError = 'rejected';
    });
  },
});

export const selectBannerData = state => state.banner.bannerData;

export default bannerSlice.reducer;
