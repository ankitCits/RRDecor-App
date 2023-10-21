import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {BASE_URL} from '../../conifg';

// import api from '../api'; // Assuming you have an API module to handle network requests

// Create an async thunk for user data
export const postContact = createAsyncThunk('postContact', async params => {
  console.log('contact us data', params);
  const req = await postContactApi(params);
  console.log('response from contact  api ', req);
  return req;
  // if (req.status === 200) {
  //   return req;
  // }
});

export const postContactApi = async params => {
  const res = await fetch(`${BASE_URL}/contact/`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      data: {
        name: params.name,
        email: params.email,
        contact_number: params.contact_number,
        description: params.description,
      },
    }),
  });
  const result = await res.json();
  //console.log('result is', result);
  return result;
};

// Create the userProfile slice
const contactSlice = createSlice({
  name: 'contact',

  initialState: {
    contactData: null,
    error: null,
    isLoading: false,
  },

  reducers: {
    clearContactData: state => {
      state.error = null; // Reset the state to an empty object or its initial values
    },
  },

  extraReducers: builder => {
    // Handle getUserData fulfilled
    builder.addCase(postContact.fulfilled, (state, action) => {
      if (action.payload.status_code === 200) {
        state.error = 'Thanks For Requesting...';
        state.isLoading = false;
        //   state.productData = action.payload.result;
      }
      if (action.payload.status_code === 400) {
        state.error = 'failed';
        state.isLoading = false;
      }
      // state.collctionData = action.payload.data;
    });

    // Handle getUserData pending
    builder.addCase(postContact.pending, state => {
      state.isLoading = true;
      state.error = 'pending';
    });

    // Handle getUSerData rejected
    builder.addCase(postContact.rejected, (state, action) => {
      state.isLoading = false;
      state.error = 'rejected';
    });
  },
});

export const {clearContactData} = contactSlice.actions;
export default contactSlice.reducer;
