import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';
import React, { useEffect } from 'react';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-virtualized-view';
import CartItem from '../components/atoms/cartItem';
import { clearAddedToCart, getCartData } from '../Redux/Slices/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { selectToken } from '../Redux/Slices/authSlice';
import { selectLocalCartData } from '../Redux/Slices/cartSlice';
import { postOrderData, resetOrderStatus } from '../Redux/Slices/orderSlice';
import Spinner from 'react-native-loading-spinner-overlay/lib';

const Shop = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const profileData = useSelector(selectToken);
  const localCartDataIs = useSelector(selectLocalCartData);
  console.log('local cart data us', localCartDataIs);

  const { localCartData, CartError } = useSelector(state => state.cart);

  const data = [
    { id: '1', name: 'Bosa Anthracite', quantity: 24 },
    { id: '2', name: 'Bosa Vase', quantity: 24 },

    // Add more items here if needed
  ];

  // useEffect(() => {
  //   dispatch(getCartData(profileData.auth_token));
  // }, []);

  useEffect(() => {
    // Listen for navigation changes
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(getCartData(profileData.auth_token));
    });

    // Clean up the listener when the component unmounts
    return unsubscribe;
  }, [navigation]);

  const { cartData } = useSelector(state => state.cart);
  console.log('cart data in shop screen', cartData);

  const { isOrderLoading, orderError, orderAdded } = useSelector(
    state => state.order,
  );

  useEffect(() => {
    // Listen for navigation changes
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(resetOrderStatus());
    });

    // Clean up the listener when the component unmounts
    return unsubscribe;
  }, [navigation]);

  // useEffect(() => {
  //   if (orderAdded === true) {
  //     navigation.replace('Sucess');
  //   }
  // }, [handleCheckout]);

  const handleCheckout = async () => {
    if (cartData.length === 0) {
      alert('please add items in cart');
    } else {
      let params = {
        billing_address_id: cartData,
        userToken: profileData.auth_token
      }
      let res = await dispatch(postOrderData(params));
      console.log("^^ RES ^^", res?.payload?.result)
      dispatch(resetOrderStatus());
      if (res?.payload?.status_code == 200) {
        navigation.replace('Sucess');
      } else {
        alert(res?.payload?.result)
      }
      // navigation.navigate('Ship');

    }
  };
  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <Spinner visible={isOrderLoading} />
      {cartData.length === 0 ? (
        <View
          style={{
            flex: 1,
            // justifyContent:'center',
            alignItems: 'center',
            alignSelf: 'center',
            marginTop: '50%'
          }}
        >
          <Image
            source={require('../Assets/Image/norecordfound.png')}
            style={{ width: 120, height: 120 }}
            resizeMode="contain"
          />
        </View>
      ) : (
        <>
          <FlatList
            showsVerticalScrollIndicator={false}
            // ListHeaderComponent={() => (
            //   <View style={{alignItems: 'center', marginTop: 10}}>
            //     <Text>Api Data</Text>
            //   </View>
            // )}
            data={cartData}
            renderItem={({ item }) => {
              return <CartItem item={item} />;
            }}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.container}
          />
          {/* {CartError && (
            <Text
              style={{
                color: '#153F5E',
                
                fontSize: wp('4%'),
                textAlign: 'center',
                marginTop: hp('2%'),
              }}>
              {CartError}
            </Text>
          )} */}
          <TouchableOpacity
            style={{
              width: wp('80%'),
              height: hp('7%'),
              position: 'relative',
              bottom: 0,
              backgroundColor: '#292929',
              alignSelf: 'center',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 50,
              marginVertical: hp('2%'),
            }}
            onPress={handleCheckout}>
            <Text
              style={{
                fontSize: 14,
                color: '#FFF',
                fontWeight: '500',

              }}>
              Checkout
            </Text>
          </TouchableOpacity>
        </>
      )}

      {/* <FlatList
        ListHeaderComponent={() => (
          <View style={{alignItems: 'center', marginTop: 10}}>
            <Text>Local Cart Data</Text>
          </View>
        )}
        data={localCartDataIs}
        renderItem={({item}) => {
          return <CartItem item={item} />;
        }}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.container}
      /> */}
    </View>
  );
};

export default Shop;

const styles = StyleSheet.create({
  container: {
    paddingBottom: hp('2%'),
    height: hp('82%'),
    // Adjust if needed
  },
});
