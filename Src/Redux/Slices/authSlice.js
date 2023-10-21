import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {BASE_URL} from '../../conifg';

// import api from '../api'; // Assuming you have an API module to handle network requests

// Create an async thunk for login
export const login = createAsyncThunk('auth/login', async credentials => {
  // const response = await api.post('/login', credentials);
  // return response.data;

  const req = await fetch2(credentials);
  console.log('request is', req);

  if (req.status_code === 200) {
    console.log(">>>>xxx",req)
    await AsyncStorage.setItem('userCredentials', JSON.stringify(credentials));
    console.log('inside ', credentials);
    return req;
    // dispatch(loginSuccess(req.data.token));
  }
  if (req.status_code === 400) {
    // throw Error(req.data.mobile_number);
    // dispatch(loginFailure(req.data.mobile_number));

    return req;
  }
  if (req.status_code === 204) {
    // throw Error(req.data.mobile_number);
    // dispatch(loginFailure(req.data.mobile_number));

    return req;
  }

  // if(req.data.mobile_number){

  // }
  //  AsyncStorage.setItem('token', '12345');
});

export const loginAuto = createAsyncThunk('auth/login', async credentials => {
  const req = await fetch2(credentials);
  console.log('request is', req);

  if (req.status_code === 200) {
    AsyncStorage.setItem('token', req.auth_token);
    console.log('inside ', req);
    return req;
    // dispatch(loginSuccess(req.data.token));
  }
  if (req.status_code === 400) {
    // throw Error(req.data.mobile_number);
    // dispatch(loginFailure(req.data.mobile_number));

    return req;
  }
  if (req.status_code === 204) {
    // throw Error(req.data.mobile_number);
    // dispatch(loginFailure(req.data.mobile_number));

    return req;
  }
});

export const fetch2 = async credentials => {
  const res = await fetch(`${BASE_URL}/login/`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      // Authorization: await AsyncStorage.getItem('token'),
    },
    body: JSON.stringify({
      email: credentials.email,
      password: credentials.password,
    }),
  });
  const result = await res.json();
  //console.log('result is', result);
  return result;
};

export const forgotpasswordotp = createAsyncThunk(
  'auth/forgotpasswordotp',
  async email => {
    console.log('forgit oass');
    // const response = await api.post('/login', credentials);
    // return response.data;

    const req = await forgotpasswordotpapi(email);
    console.log('request is', req);

    return req;
    // if(req.data.mobile_number){

    // }
    //  AsyncStorage.setItem('token', '12345');
  },
);

export const forgotpasswordotpapi = async email => {
  const res = await fetch(`${BASE_URL}/forget-password-otp/`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      // Authorization: await AsyncStorage.getItem('token'),
    },
    body: JSON.stringify({
      email: email,
    }),
  });
  const result = await res.json();
  //console.log('result is', result);
  return result;
};

export const forgotpassword = createAsyncThunk(
  'auth/forgotpassword',
  async credentials => {
    console.log('forgit oass');
    // const response = await api.post('/login', credentials);
    // return response.data;

    const req = await forgotpasswordapi(credentials);
    console.log('forgot password confrim api', req);

    return req;
    // if(req.data.mobile_number){

    // }
    //  AsyncStorage.setItem('token', '12345');
  },
);

export const forgotpasswordapi = async credentials => {
  const res = await fetch(`${BASE_URL}/forget-password-confirm/`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      // Authorization: await AsyncStorage.getItem('token'),
    },
    body: JSON.stringify({
      email: credentials.email,
      otp: credentials.value,
      new_password: credentials.password,
      re_new_password: credentials.confirmPassword,
    }),
  });
  const result = await res.json();
  //console.log('result is', result);
  return result;
};

// Create an async thunk for logout
export const logout = createAsyncThunk('auth/logout', async () => {
  console.log('logout called');
  // const response = await api.post('/logout');
  // return response.data;
  AsyncStorage.removeItem('token');
  AsyncStorage.removeItem('userCredentials');
  return;
});

export const signUp = createAsyncThunk('auth/signUp', async credentials => {
  const req = await signUpApi(credentials);
  console.log('req from signup api is', req);

  return req;
});

export const signUpApi = async credentials => {
  console.log('credentails', credentials);
  const res = await fetch(`${BASE_URL}/registeruser/`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      // Authorization: await AsyncStorage.getItem('token'),
    },
    body: JSON.stringify({
      data: {
        name: credentials.name,
        email: credentials.email,
        mobile_number: credentials.mobile_number,
        password: credentials.password,
        confirm_password: credentials.confirm_password,
        city: credentials.city,
        state_code: credentials.state,
        company: credentials.company,
        gst_no:credentials.gst_no,
      gst_type:credentials.gst_type,
      address:credentials.address
      },
    }),
  });
  const result = await res.json();
  //console.log('result is', result);
  return result;
};
export const resendOtp = createAsyncThunk('auth/resendOtp', async email => {
  const req = await resendOtpApi(email);
  console.log('req', req);

  if (req.status_code === 400) {
    return req;
  }

  if (req.status_code === 200) {
    return req;
  }
});
export const resendOtpApi = async email => {
  const res = await fetch(`${BASE_URL}/resendotp/`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      // Authorization: await AsyncStorage.getItem('token'),
    },
    body: JSON.stringify({
      email: email,
    }),
  });
  const result = await res.json();
  //console.log('result is', result);
  return result;
};

export const verifyEmail = createAsyncThunk(
  'auth/verifyEmail',
  async credentials => {
    const req = await sendVerifyEmailOtp(credentials);
    console.log('req from verufy email api is', req);

    return req;
  },
);

export const sendVerifyEmailOtp = async credentials => {
  const res = await fetch(`${BASE_URL}/verifyemail/`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      // Authorization: await AsyncStorage.getItem('token'),
    },
    body: JSON.stringify({
      email: credentials.email,
      otp: credentials.otp,
    }),
  });
  const result = await res.json();
  //console.log('result is', result);
  return result;
};

// Create the auth slice
const authSlice = createSlice({
  name: 'auth',
  // initialState: {
  //   user: null,
  //   loading: false,
  //   error: null,
  // },
  initialState: {
    isAuthenticated: false,
    user: null,
    error: null,
    signUperror: null,
    isLoading: false,
    sentOtp: false,
    verifyMessage: null,
    forgotOtp: false,
    passwordChanged: false,
    verified: false,
  },
  reducers: {
    updateSentOtpValue: state => {
      state.sentOtp = false;
      state.verified = false;
    },
    resetLoginMessage: state => {
      state.error = null;
    },
  },

  extraReducers: builder => {
    // Handle login fulfilled
    builder.addCase(login.fulfilled, (state, action) => {
      // console.log('action payload is ', action.payload);
      // state.user = action.payload;

      // state.error = action.payload;
      // state.isAuthenticated = true;
      // state.isLoading = false;

      state.error = action.payload;
      if (action.payload.status_code === 400) {
        console.log('Action payooad', action.payload);
        state.error = action.payload.result;
        state.isLoading = false;
        state.sentOtp = false;
      }
      if (action.payload.status_code === 200) {
        console.log('Action payooad', action.payload);
        state.error = action.payload.result;
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      }

      if (action.payload.status_code === 204) {
        state.error = action.payload.message;
        state.isLoading = false;
        state.isAuthenticated = false;
      }
    });

    // Handle login pending
    builder.addCase(login.pending, state => {
      state.isLoading = true;
      state.error = 'pending';
    });

    // Handle login rejected
    builder.addCase(login.rejected, (state, action) => {
      state.isLoading = false;
      state.error = 'rejected';
      state.sentOtp = false;
    });

    builder.addCase(signUp.fulfilled, (state, action) => {
      if (action.payload.status_code === 400) {
        state.isLoading = false;
        state.signUperror = action.payload.result;
        state.sentOtp = false;
      }

      if (action.payload.status_code === 200) {
        state.isLoading = false;
        state.signUperror = action.payload.result;
        state.sentOtp = true;
      }
    });

    // Handle login pending
    builder.addCase(signUp.pending, state => {
      state.isLoading = true;
      state.signUperror = 'pending';
    });

    // Handle login rejected
    builder.addCase(signUp.rejected, (state, action) => {
      state.isLoading = false;
      state.signUperror = 'rejected';
      state.sentOtp = false;
    });

    builder.addCase(forgotpasswordotp.fulfilled, (state, action) => {
      if (action.payload.status_code === 400) {
        state.error = action.payload.message;
        state.isLoading = false;
        state.forgotOtp = false;
      }

      if (action.payload.status_code === 200) {
        state.error = action.payload.message;
        state.isLoading = false;
        state.forgotOtp = true;
      }
    });

    // Handle login pending
    builder.addCase(forgotpasswordotp.pending, state => {
      state.isLoading = true;
      state.signUperror = 'pending';
    });

    // Handle login rejected
    builder.addCase(forgotpasswordotp.rejected, (state, action) => {
      state.isLoading = false;
      state.signUperror = 'rejected';
    });

    builder.addCase(forgotpassword.fulfilled, (state, action) => {
      if (action.payload.status_code === 400) {
        state.error = action.payload.message;
        state.isLoading = false;
        state.passwordChanged = false;
        state.forgotOtp = true;
      }

      if (action.payload.status_code === 200) {
        state.error = action.payload.message;
        state.isLoading = false;
        state.passwordChanged = true;
        state.forgotOtp = false;
      }
    });

    // Handle login pending
    builder.addCase(forgotpassword.pending, state => {
      state.isLoading = true;
      state.signUperror = 'pending';
    });

    // Handle login rejected
    builder.addCase(forgotpassword.rejected, (state, action) => {
      state.isLoading = false;
      state.signUperror = 'rejected';
    });
    // Handle logout fulfilled
    builder.addCase(logout.fulfilled, state => {
      state.user = null;
      state.isLoading = false;
      state.error = null;
      state.isAuthenticated = false;
    });

    // Handle logout pending
    builder.addCase(logout.pending, state => {
      state.isLoading = true;
      state.error = null;
    });

    // Handle logout rejected
    builder.addCase(logout.rejected, (state, action) => {
      state.isLoading = false;
      state.error = 'rejected';
    });

    builder.addCase(verifyEmail.fulfilled, (state, action) => {
      if (action.payload.status_code === 400) {
        console.log('400 called');
        state.isLoading = false;
        state.verifyMessage = action.payload.result;
        state.verified = false;
      }

      if (action.payload.status_code === 200) {
        state.isLoading = false;
        state.verifyMessage = action.payload.message;
        state.isAuthenticated = true;
        state.user = action.payload;
        state.verified = true;
      }
    });

    // Handle logout pending
    builder.addCase(verifyEmail.pending, state => {
      state.isLoading = true;
      state.verifyMessage = 'loading';
      state.verified = false;
    });

    // Handle logout rejected
    builder.addCase(verifyEmail.rejected, (state, action) => {
      state.isLoading = false;
      state.verifyMessage = 'rejected';
      state.verified = false;
    });

    builder.addCase(resendOtp.fulfilled, (state, action) => {
      // state.user = action.payload;

      if (action.payload.status_code === 400) {
        state.isLoading = false;
        state.verifyMessage = action.payload.message;
        state.error = action.payload.result;
      }

      if (action.payload.status_code === 200) {
        state.isLoading = false;
        state.verifyMessage = action.payload.message;
      }
    });

    builder.addCase(resendOtp.pending, state => {
      state.isLoading = true;
      state.error = null;
      state.sentOtp = false;
    });

    builder.addCase(resendOtp.rejected, (state, action) => {
      state.isLoading = false;
      state.error = 'rejected';
      state.sentOtp = false;
    });
  },
});
export const {updateSentOtpValue, resetLoginMessage} = authSlice.actions;
export const selectIsLoggedIn = state => state.auth.isAuthenticated;
export const selectIsSignUpVerified = state => state.auth.verified;
export const selectToken = state => state.auth.user;

export default authSlice.reducer;
