import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {BASE_URL} from '../../conifg';

// import api from '../api'; // Assuming you have an API module to handle network requests

// Create an async thunk for user data
export const getLedgerData = createAsyncThunk('getLedgerList', async params => {
  console.log('get ledger start date asasxsaashgvh', params);
  const req = await getLedgerDataApi(params);
  console.log('response from get ledger api ', req);
  return req;
  // if (req.status === 200) {
  //   return req;
  // }
});

export const getLedgerDataApi = async params => {
  console.log(
    'end point is',
    `${BASE_URL}/orderfilter/?start_date=${params.from_date}&end_date=${params.to_date}`,
  );
  const res = await fetch(
    `${BASE_URL}/orderfilter/?start_date=${params.from_date}&end_date=${params.to_date}`,
    {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        'Authorization':`token ${params?.token}`
      },
    },
  );
  const result = await res.json();
  //console.log('result is', result);
  return result;
};

export const postLedgerData = createAsyncThunk('postLedger', async params => {
  console.log('post ledger asasxsaashgvh', params);
  const req = await postLedgerDataApi(params);
  console.log('response from get ledger api ', req);
  return req;
  // if (req.status === 200) {
  //   return req;
  // }
});

export const postLedgerDataApi = async params => {
  const res = await fetch(`${BASE_URL}/ledger/`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      data: {
        from_date: params.from_date,
        to_date: params.to_date,
      },
    }),
  });
  const result = await res.json();
  //console.log('result is', result);
  return result;
};

// Create the ledger slice
const ledgerSlice = createSlice({
  name: 'ledger',

  initialState: {
    ledgerData: [],
    error: null,
    isLoading: false,
  },
  reducers: {
    clearLedgerData: state => {
      state.ledgerData = [];
      state.error = null; // Reset the state to an empty object or its initial values
    },
  },

  extraReducers: builder => {
    // Handle getUserData fulfilled
    builder.addCase(getLedgerData.fulfilled, (state, action) => {
      if (action.payload.status_code === 200) {
        state.error = 'fullfiled';
        state.isLoading = false;
        state.ledgerData = action.payload.result;
      }
      if (action.payload.status_code === 400) {
        state.error = action.payload.result;
        state.isLoading = false;
      }
      // state.collctionData = action.payload.data;
    });

    // Handle getUserData pending
    builder.addCase(getLedgerData.pending, state => {
      state.isLoading = true;
      state.error = 'pending';
    });

    // Handle getUSerData rejected
    builder.addCase(getLedgerData.rejected, (state, action) => {
      state.isLoading = false;
      state.error = 'rejected';
    });

    builder.addCase(postLedgerData.fulfilled, (state, action) => {
      if (action.payload.status_code === 200) {
        state.error = 'fullfiled';
        state.isLoading = false;
      }
      if (action.payload.status_code === 400) {
        state.error = 'no data';
        state.isLoading = false;
      }
      // state.collctionData = action.payload.data;
    });

    // Handle getUserData pending
    builder.addCase(postLedgerData.pending, state => {
      state.isLoading = true;
      state.error = 'pending';
    });

    // Handle getUSerData rejected
    builder.addCase(postLedgerData.rejected, (state, action) => {
      state.isLoading = false;
      state.error = 'rejected';
    });
  },
});

export const selectLedgerData = state => state.ledger.ledgerData;
export const {clearLedgerData} = ledgerSlice.actions;

export default ledgerSlice.reducer;
