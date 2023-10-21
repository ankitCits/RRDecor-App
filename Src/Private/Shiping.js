import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {ScrollView} from 'react-native-virtualized-view';
import ShippingAddressItem from '../components/atoms/shippingAddressItem';
import {useDispatch, useSelector} from 'react-redux';
import {getShippingData} from '../Redux/Slices/shippingSlice';
import {selectToken} from '../Redux/Slices/authSlice';
import {selectShippingData} from '../Redux/Slices/shippingSlice';
import Spinner from 'react-native-loading-spinner-overlay/lib';
import {postOrderData, resetOrderStatus} from '../Redux/Slices/orderSlice';
import {selectOrderStatus} from '../Redux/Slices/orderSlice';
const Shiping = () => {
  const navigation = useNavigation();
  const {isLoading, error} = useSelector(state => state.shipping);
  const [isChecked, setChecked] = useState(false);
  const handleCheck = () => {
    setChecked(!isChecked);
  };
  const data = [
    {
      id: '1',
      name: 'Vijay Kuamr',
      shippingAddress:
        '3 Nedsasdafwbridge Court Chino Hills, CA 91709, United States',
      billingAddress:
        '3 Nedsasdafwbridge Court Chino Hills, CA 91709, United States',
    },
    {
      id: '2',
      name: 'Vijay Kuamr',
      shippingAddress:
        '3 Nedsasdafwbridge Court Chino Hills, CA 91709, United States',
      billingAddress:
        '3 Nedsasdafwbridge Court Chino Hills, CA 91709, United States',
    },
    // Add more items here if needed
  ];

  const renderItem = ({item}) => (
    <View style={styles.itemContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.nameText}>{item.name}</Text>
        <Text style={styles.editText}>Edit</Text>
      </View>
      <View style={styles.addressContainer}>
        <Text style={styles.labelText}>
          Shipping Address:{' '}
          <Text style={styles.addressText}>{item.shippingAddress}</Text>
        </Text>
      </View>
      <View style={styles.addressContainer}>
        <Text style={styles.labelText}>
          Billing Address:{' '}
          <Text style={styles.addressText}>{item.billingAddress}</Text>
        </Text>
      </View>
      <View style={styles.checkboxContainer}>
        <TouchableOpacity style={styles.checkboxButton} onPress={handleCheck}>
          {isChecked ? (
            <Icon name="check-box" size={25} color="#153F5E" /> // Use the appropriate icon and styling
          ) : (
            <Icon name="check-box-outline-blank" size={25} color="#153F5E" />
          )}
        </TouchableOpacity>
        <Text style={styles.checkboxText}>
          Use as the billing and shipping address
        </Text>
      </View>
    </View>
  );
  const profileData = useSelector(selectToken);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getShippingData(profileData.auth_token));
    if (orderAdded === true) {
      dispatch(resetOrderStatus());
    }
  }, []);

  useEffect(() => {
    // Listen for navigation changes
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(getShippingData(profileData.auth_token));
      dispatch(resetOrderStatus());
    });

    // Clean up the listener when the component unmounts
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    // Listen for navigation changes
    const unsubscribe = navigation.addListener('blur', () => {
      dispatch(resetOrderStatus());
    });

    // Clean up the listener when the component unmounts
    return unsubscribe;
  }, [navigation]);

  const shippingDataIs = useSelector(selectShippingData);
  console.log('your shiiping dat ', shippingDataIs);

  const [selectAddress, setSelectAddress] = useState('');

  const {isOrderLoading, orderError, orderAdded} = useSelector(
    state => state.order,
  );
  const orderCreated = useSelector(selectOrderStatus);
  const handleContinue = () => {
    const params = {
      billing_address_id: selectAddress.id,
      shipping_address_id: selectAddress.id,
      userToken: profileData.auth_token,
    };
    if (selectAddress === '') {
      Alert.alert(
        'No Address Selected',
        'please select shipping address or add new address',
      );
    } else {
      console.log('params is', params);
      dispatch(postOrderData(params));

      dispatch(resetOrderStatus());
    }
  };
  useEffect(() => {
    if (orderAdded === true) {
      navigation.replace('Sucess');
    }
  }, [handleContinue]);
  console.log('order status', orderCreated);

  return (
    <View style={{backgroundColor: '#fff', flex: 1}}>
      <Spinner visible={isLoading} />
      <Spinner visible={isOrderLoading} />
      <ScrollView style={{height: hp('75%'), backgroundColor: '#fff'}}>
        <FlatList
          data={shippingDataIs}
          renderItem={({item}) => {
            console.log('item is', item.address);
            return (
              <ShippingAddressItem
                item={item}
                setSelectAddress={setSelectAddress}
                selectAddress={selectAddress}
              />
            );
          }}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.container}
        />
      </ScrollView>
      <TouchableOpacity
        style={{
          backgroundColor: '#000',
          width: 50,
          height: 50,
          borderRadius: 40,
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'flex-end',
          right: wp('4%'),
          position: 'absolute',
          bottom: hp('12%'),
        }}
        onPress={() => navigation.navigate('Addship')}>
        <Image source={require('../Assets/Icons/Shape.png')} />
      </TouchableOpacity>
      {/* {error && (
        <Text
          style={{
            color: '#153F5E',
            
            fontSize: wp('4%'),
            textAlign: 'center',
            marginTop: hp('2%'),
          }}>
          {error}
        </Text>
      )}
      {orderError && (
        <Text
          style={{
            color: '#153F5E',
            
            fontSize: wp('4%'),
            textAlign: 'center',
            marginTop: hp('2%'),
          }}>
          {orderError}
        </Text>
      )} */}
      <TouchableOpacity
        style={{
          backgroundColor: '#000',
          width: wp('80%'),
          height: hp('7%'),
          borderRadius: wp('10%'),
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'center',
          marginTop: hp('2%'),
          marginBottom: hp('2%'),
        }}
        //onPress={() => navigation.navigate('Sucess')}
        onPress={handleContinue}>
        <Text
          style={{
            color: '#fff',
            fontSize: wp('4%'),

            
          }}>
          Continue
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Shiping;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: wp('5%'),
    paddingVertical: hp('2%'),
  },
  itemContainer: {
    width: wp('90%'),
    backgroundColor: '#fff',
    borderRadius: 7,
    alignSelf: 'center',
    marginTop: hp('1%'),
    borderColor: '#EAEAEA',
    borderWidth: 1,
    paddingHorizontal: wp('2%'),
    paddingVertical: hp('1%'),
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: wp('2%'),
    marginRight: wp('2%'),
    marginTop: hp('1%'),
  },
  nameText: {
    color: '#222222',
    fontSize: 14,
    fontWeight: '500',
  },
  editText: {
    color: '#153F5E',
    fontSize: 14,
    fontWeight: '500',
  },
  addressContainer: {
    marginLeft: wp('2%'),
    marginRight: wp('2%'),
    marginTop: hp('1%'),
  },
  labelText: {
    color: '#000',
    fontSize: 14,
    fontWeight: '500',
  },
  addressText: {
    color: '#222222',
    fontWeight: '100',
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginTop: hp('1%'),
    marginBottom: hp('1%'),
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  checkboxButton: {
    marginLeft: wp('2%'),
    marginRight: wp('2%'),
  },
  checkboxText: {
    color: '#222',
    fontSize: 14,
    fontWeight: '400',
  },
  // checkboxContainer: {
  //   marginLeft: wp('2%'),
  //   marginRight: wp('2%'),
  // },
});
