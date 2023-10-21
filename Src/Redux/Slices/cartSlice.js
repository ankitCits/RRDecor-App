import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {BASE_URL} from '../../conifg';

// import api from '../api'; // Assuming you have an API module to handle network requests

// Create an async thunk for user data
export const getCartData = createAsyncThunk('getCart', async userToken => {
  console.log('get cart  asasxsaashgvh', userToken);
  const req = await getCartDataApi(userToken);
  console.log('response from get cart api ', req);
  return req;
  // if (req.status === 200) {
  //   return req;
  // }
});

export const getCartDataApi = async userToken => {
  console.log('end point is', `${BASE_URL}/cart/`);
  const res = await fetch(`${BASE_URL}/cart/`, {
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

export const postCartData = createAsyncThunk('postCart', async params => {
  console.log('post cart asasxsaashgvh', params);
  const req = await postCartDataApi(params);
  console.log('response from post cart api ', req);
  return req;
  // if (req.status === 200) {
  //   return req;
  // }
});

export const postCartDataApi = async params => {
  const res = await fetch(`${BASE_URL}/cart/`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `token ${params.userToken}`,
    },
    body: JSON.stringify({
      data: {
        product_id: params.data.product_id,
        // roll_id: params.data.roll_id,
        quantity: params.data.quantity,
      },
    }),
  });
  const result = await res.json();
  //console.log('result is', result);
  return result;
};

export const removeCartItem = createAsyncThunk(
  'removeCartItem',
  async params => {
    console.log('remove cart asasxsaashgvh', params);
    const req = await removeCartItemApi(params);
    console.log('response from remove cart api ', req);
    return req;
    // if (req.status === 200) {
    //   return req;
    // }
  },
);

export const removeCartItemApi = async params => {
  console.log('params is', params.id);
  const res = await fetch(`${BASE_URL}/cart/${params.id}/`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `token ${params.userToken}`,
    },
  });
  const result = await res.json();
  //console.log('result is', result);
  return result;
};

// Create the ledger slice
const cartSlice = createSlice({
  name: 'cart',

  initialState: {
    cartData: [],
    CartError: null,
    isCartLoading: false,
    addedToCart: false,
    localCartData: [],
  },
  reducers: {
    clearAddedToCart: state => {
      state.addedToCart = false;
      state.CartError = null; // Reset the state to an empty object or its initial values
    },
    removeSpecificItem: (state, action) => {
      const item = action.payload;
      console.log('item for remove', item);
      const existingItem = state.localCartData.find(
        cartItem => cartItem.roll_id === item.roll_id,
      );
      if (existingItem) {
        console.log('removing specifi item');
        state.localCartData.pop(item);
      }
    },
  },

  extraReducers: builder => {
    // Handle getUserData fulfilled
    builder.addCase(getCartData.fulfilled, (state, action) => {
      if (action.payload.status_code === 200) {
        state.CartError = 'fullfiled';
        state.isCartLoading = false;
        state.cartData = action.payload.result;
      }
      if (action.payload.status_code === 400) {
        state.CartError = action.payload.result;
        state.isCartLoading = false;
      }
      // state.collctionData = action.payload.data;
    });

    // Handle getUserData pending
    builder.addCase(getCartData.pending, state => {
      state.isCartLoading = true;
      state.CartError = 'pending';
    });

    // Handle getUSerData rejected
    builder.addCase(getCartData.rejected, (state, action) => {
      state.isCartLoading = false;
      state.CartError = 'rejected';
    });

    builder.addCase(postCartData.fulfilled, (state, action) => {
      console.log('outside succes psot');
      if (action.payload.status_code === 200) {
        const item = action.payload.result;
        console.log('checking itemid', item.id);
        const existingItem = state.localCartData.find(
          cartItem => cartItem.id === item.id,
        );
        if (existingItem) {
          console.log('existing item', existingItem.quantity, item.quantity);
          existingItem.quantity = existingItem.quantity + item.quantity;
        }
        if (!existingItem) {
          console.log('non existinf', item.quantity);
          state.localCartData.push(item);
        }

        console.log('local cart data is', state.localCartData);

        state.CartError = 'Item Added To Cart';
        state.isCartLoading = false;
        state.addedToCart = true;
      }
      if (action.payload.status_code === 400) {
        state.CartError = 'invalid ';
        state.isCartLoading = false;
      }
      console.log('scuess post ', state.addedToCart);
      // state.collctionData = action.payload.data;
    });

    // Handle getUserData pending
    builder.addCase(postCartData.pending, state => {
      state.isCartLoading = true;
      state.CartError = 'pending';
    });

    // Handle getUSerData rejected
    builder.addCase(postCartData.rejected, (state, action) => {
      state.isCartLoading = false;
      state.CartError = 'rejected';
    });

    builder.addCase(removeCartItem.fulfilled, (state, action) => {
      //   if (action.payload.status_code === 200) {
      //     state.CartError = action.payload.result;
      //     state.isCartLoading = false;
      //   }
      console.log('action in fullfiled', action.payload);
      if (action.payload.status_code === 200) {
        console.log('inside remove car', action.payload);
        state.CartError = action.payload.result;
        state.isCartLoading = false;
      }
      // state.collctionData = action.payload.data;
    });

    // Handle getUserData pending
    builder.addCase(removeCartItem.pending, state => {
      state.isCartLoading = true;
      state.CartError = 'pending';
    });

    // Handle getUSerData rejected
    builder.addCase(removeCartItem.rejected, (state, action) => {
      state.isCartLoading = false;
      state.CartError = 'rejected';
    });
  },
});

export const selectCartData = state => state.cart.cartData;
export const selectLocalCartData = state => state.cart.localCartData;
export const selectCartAdded = state => state.cart.addedToCart;

export const {clearAddedToCart} = cartSlice.actions;
export const {removeSpecificItem} = cartSlice.actions;
export default cartSlice.reducer;
