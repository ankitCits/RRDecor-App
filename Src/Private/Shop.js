import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import React, { useEffect, useState } from 'react';

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
import DropDownPicker from 'react-native-dropdown-picker';
const Shop = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const profileData = useSelector(selectToken);
  const localCartDataIs = useSelector(selectLocalCartData);
  console.log('local cart data us', localCartDataIs);

  const { localCartData, CartError } = useSelector(state => state.cart);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [selectedTransportMode, setSelectedTransportMode] = useState(null);
  const [showAddressDropdown, setShowAddressDropdown] = useState(false);
  const [showTransportDropdown, setShowTransportDropdown] = useState(false);
  const [addressFromApi, SetAddressFromApi] = useState([])
  const [salesman, setSalesMan] = useState('')
  const [refrence, setRefrence] = useState('')
  const [modeFromApi, SetModeFromApi] = useState([])
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' },
    { label: 'Pear', value: 'pear' },
  ])

  const transportModes = [
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' },
    { label: 'Pear', value: 'pear' },
  ]


  const convertToDropdownFormat = (array) => {
    const dropdownArray = array.map((item) => {
      return { label: item, value: item.toLowerCase() };
    });
    return dropdownArray;
  };

  const convertToDropdownFormatAdd = (array) => {
    const dropdownArray = array.map((item) => {
      const label = `${item.full_address}, ${item.district}, ${item.state}, ${item.pin_code}, ${item?.mobileNo}, Gst: (${item?.gstId})`;
      return { label: label, value: item.id };
    });
    return dropdownArray;
  };

  const getAddress = () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `token ${profileData.auth_token}`);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch("https://rrdecor.wooshelf.com/api/address/", requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result?.result) {
          SetAddressFromApi(convertToDropdownFormatAdd(result?.result?.data))
          SetModeFromApi(convertToDropdownFormat(result?.result?.mode_of_transport))
        }

      })
      .catch(error => console.log('error', error));
  }

  // useEffect(() => {
  //   dispatch(getCartData(profileData.auth_token));
  // }, []);

  useEffect(() => {
    // Listen for navigation changes
    const unsubscribe = navigation.addListener('focus', () => {
      getAddress()
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



  const handleCheckout = async () => {


    if (selectedAddress == null) {
      return alert('Please select Address.');
    }
    if (selectedTransportMode == null) {
      return alert('please select Transport Mode.');
    }
    if (cartData.length === 0) {
      return alert('Please add items in cart');
    }



    if (salesman == '') {
      return alert('Please Enter salesman Name.');
    }

    if (refrence == '') {
      return alert('Please select Order Refrence.');
    }


    else {
      let params = {
        billing_address_id: parseInt(selectedAddress),
        modeOfTransport: selectedTransportMode,
        salesman:salesman,
        refrence:refrence,
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


  console.log("CCCCC>>", selectedAddress, selectedTransportMode)

  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: '#fff' }} behavior="padding">
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


          <View
            style={{
              height: 0.5,
              backgroundColor: '#000',
              width: '90%',
              alignSelf: 'center',
            }}
          />


          <View style={styles.dropdownContainer}>
            <Text style={styles.dropdownLabel}>Select Address</Text>
            {/* {
              addressFromApi.length == 0 ? */}
                {/* : */}
                <DropDownPicker
                  open={showAddressDropdown}
                  value={selectedAddress}
                  items={addressFromApi}
                  setOpen={setShowAddressDropdown}
                  setValue={setSelectedAddress}
                  setItems={setItems}
                  placeholder={'Select Address.'}
                  dropDownDirection="TOP"
                />
            {/* } */}

            <TouchableOpacity
                  onPress={() => navigation.navigate('Addship')}
                  style={styles.addAddress}
                >
                  <Text
                    style={{
                      color: 'blue'
                    }}
                  > + New Add Address</Text>
                </TouchableOpacity>

          </View>

          {/* Select Transport Mode */}
          <View style={styles.dropdownContainer}>
            <Text style={styles.dropdownLabel}>Select Transport Mode</Text>
            <DropDownPicker
              open={showTransportDropdown}
              value={selectedTransportMode}
              items={modeFromApi}
              setOpen={setShowTransportDropdown}
              setValue={setSelectedTransportMode}
              setItems={setValue}
              placeholder={'Select Mode'}
              dropDownDirection="TOP"
            />

          </View>

          <View style={{
            // backgroundColor:'red'
            width: '90%',
            flexDirection: 'row',
            alignSelf: 'center',
            justifyContent:'space-between'
          }}>
            <TextInput
              style={styles.input}
              onChangeText={text => setSalesMan(text)}
              value={salesman}
              placeholder="Name Of Salesman"
              placeholderTextColor="#999999"
            />

            <TextInput
              style={styles.input}
              onChangeText={text => setRefrence(text)}
              value={refrence}
              placeholder="Order Refrence"
              placeholderTextColor="#999999"
            />
          </View>



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

    </KeyboardAvoidingView>
  );
};

export default Shop;

const styles = StyleSheet.create({
  container: {
    paddingBottom: hp('2%'),
    height: hp('82%'),
    // Adjust if needed
  },
  dropdownContainer: {
    marginTop: hp('2%'),
    paddingHorizontal: wp('5%'),
  },
  dropdownLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: hp('1%'),
  },
  addAddress: {
    height: 40,
    // backgroundColor:'red',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:'5%'
  },
  input: {
    height: 50,
    // marginLeft: wp('3%'),
    color: '#000',
    // fontFamily: 'Poppins-Regular',

    width: '48%',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginTop: '5%',
    fontSize:11
    // alignSelf:'center'
  },
});
