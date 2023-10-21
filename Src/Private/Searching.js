import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';

import { useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { selectProductRollData } from '../Redux/Slices/productRollSlice';
import { selectToken } from '../Redux/Slices/authSlice';
import { getProductRollData } from '../Redux/Slices/productRollSlice';
import { clearAddedToCart, postCartData } from '../Redux/Slices/cartSlice';
import Spinner from 'react-native-loading-spinner-overlay/lib';
import { selectCartAdded } from '../Redux/Slices/cartSlice';

const Searching = () => {
  const navigation = useNavigation();
  const isAddedToCart = useSelector(selectCartAdded);

  const route = useRoute();
  const { item } = route.params;
  console.log('item is', item);
  const [Search, setSearch] = useState('');

  const dispatch = useDispatch();
  const profileData = useSelector(selectToken);

  const productRollDataIs = useSelector(selectProductRollData);
  console.log('product  roll data>>>', productRollDataIs);
  const productDetailsOnly = productRollDataIs?.item_details
  let productDetailsRoll = productRollDataIs?.roll_no
  useEffect(() => {
    if (productDetailsRoll?.length) {
      productDetailsRoll = productDetailsRoll?.map(item => {
        return {
          ...item,
          unit_price: 0 // You can set the initial value of unit_price as needed
        };
      });
    }
  })

  const [items, setItems] = useState(productDetailsRoll);

  const handlePriceChange = (text, itemIndex) => {
    console.log('Item Index:', itemIndex);
    const newItems = [...items];
    const quantity = parseInt(newItems[itemIndex].Quantity);
    const enteredPrice = parseFloat(text);

    if (!isNaN(enteredPrice)) {
      if (enteredPrice <= quantity) {
        console.log('^if^ VALUE ^^', enteredPrice, itemIndex, quantity, enteredPrice <= quantity);
        newItems[itemIndex].unit_price = text;
        setItems(newItems);
      } else {
        console.log('^^else2 VALUE ^^', enteredPrice, itemIndex, quantity, enteredPrice <= quantity);
        // Limit the input to the item.Quantity
        newItems[itemIndex].unit_price = '0';
        setItems(newItems);
      }
    } else {
      // Handle other cases where text is not a valid number
      // For now, let's set the unit_price to an empty string
      newItems[itemIndex].unit_price = '';
      setItems(newItems);
    }

    console.log('>>>>XXXX,', newItems);
  };


  const totalUnitPrice = items?.reduce((total, item) => {
    return total + parseFloat(item.unit_price);
  }, 0);




  useEffect(() => {
    const params = {
      userToken: profileData.auth_token,
      id: item.id,
      //id:item.id
    };
    dispatch(getProductRollData(params));
  }, []);

  const [selectedItem, setSelectedItem] = useState(0);
  const [quantity, setQuantity] = useState(0);

  function formatDate(inputDate) {
    const date = new Date(inputDate);
    const options = { year: 'numeric', month: 'short', day: '2-digit' };
    return date.toLocaleDateString('en-GB', options);
  }

  const renderItemDes = ({ item, index }) => (

    <TouchableOpacity
      onPress={() => setSelectedItem(index)}
      style={[
        {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: hp('5%'),
          width: wp('95%'),
          borderColor: '#000',
          borderWidth: 0.5,
        },
        selectedItem === index
          ? { backgroundColor: '#fff' }
          : { backgroundColor: '#fff' },
      ]}>
      <View
        style={{
          flex: 1,
          // borderColor: '#000',
          // borderWidth: 0.5,
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            color: '#313131',
            fontSize: 11,


          }}>
          {item?.item_description}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const renderItem1 = ({ item }) => (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: hp('5%'),
      }}>
      <View
        style={{
          width: wp('30%'),
          borderColor: '#000',
          borderWidth: 0.5,
          height: hp('5%'),
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            color: '#313131',
            fontSize: 11,


          }}>
          {item?.measure_unit}
        </Text>
      </View>
      <View
        style={{
          width: wp('30%'),
          borderColor: '#000',
          borderWidth: 0.5,
          height: hp('5%'),
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{ color: '#313131', fontSize: 11, }}>
          {item?.projected_available_qty}
        </Text>
      </View>
      <View
        style={{
          width: wp('34%'),
          borderColor: '#000',
          borderWidth: 0.5,
          height: hp('5%'),
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{ color: '#313131', fontSize: 11, }}>
          {formatDate(item?.projected_available_date)}
        </Text>
      </View>
    </View>
  );
  const renderItem = ({ item, index }) => (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: hp('5%'),
      }}>
      <View
        style={{
          width: wp('30%'),
          borderColor: '#000',
          borderWidth: 0.5,
          height: hp('5%'),
          justifyContent: 'center',
          // alignItems: 'center',
          paddingLeft: 5
        }}>
        <Text
          style={{
            color: '#313131',
            fontSize: 11,


          }}>
          {item?.['Lot No']}
        </Text>
      </View>
      <View
        style={{
          width: wp('30%'),
          borderColor: '#000',
          borderWidth: 0.5,
          height: hp('5%'),
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{ color: '#313131', fontSize: 11, }}>
          {item?.Quantity}
        </Text>
      </View>
      <View
        style={{
          width: wp('34%'),
          borderColor: '#000',
          borderWidth: 0.5,
          height: hp('5%'),
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {item?.Quantity != 0 ?
          <TextInput
            style={{
              color: '#000',
              fontSize: 11,
              width: wp('34%'),
              borderColor: '#000',
              borderWidth: 0.5,
              height: hp('5%'),
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center'

            }}
            placeholder="0"
            value={item.unit_price}
            onChangeText={text => handlePriceChange(text, index)}
            keyboardType='number-pad'
          />

          :
          <Text style={{ color: '#313131', fontSize: 11, }}>
            Not Available
          </Text>
        }

      </View>
    </View>
  );
  const { addedtoCart, isCartLoading, CartError } = useSelector(
    state => state.cart,
  );

  const { isLoading, error } = useSelector(state => state.productRoll);

  const handleAddToCart = () => {
    // console.log("^^^productDetailsOnly",productDetailsOnly)
    // return
    const params = {
      data: {
        product_id: productDetailsOnly[0].id,
        // roll_id: productRollDataIs[selectedItem].id,
        quantity: totalUnitPrice,
      },
      userToken: profileData.auth_token,
    };
    console.log('params is', params);
    dispatch(postCartData(params));

  };

  useEffect(() => {
    // Listen for navigation changes
    const unsubscribe = navigation.addListener('blur', () => {
      dispatch(clearAddedToCart());

      // Dispatch the action to reset the user state
    });

    // Clean up the listener when the component unmounts
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    // Listen for navigation changes
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(clearAddedToCart());

      // Dispatch the action to reset the user state
    });

    // Clean up the listener when the component unmounts
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    if (isAddedToCart === true) {
      navigation.navigate('Shop');
    }
  }, [handleAddToCart]);

  const handleQuantityChange = text => {
    // Validate the input if needed
    const parsedQuantity = parseInt(text, 10);
    if (!isNaN(parsedQuantity)) {
      setQuantity(parsedQuantity);
    }
  };

  console.log("^^ items>> ^^", items)

  return (
    <ScrollView>
      <View style={{ backgroundColor: '#fff', flex: 1 }}>
        <Spinner visible={isLoading} />
        <Spinner visible={isCartLoading} />
        {productRollDataIs.length === 0 ? (
          <View
            style={{
              flex: 1,
              //  justifyContent:'center',
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
            <View
              style={{
                width: wp('94%'),
                height: hp('15%'),
                alignSelf: 'center',
                marginTop: hp('3%'),
              }}>
              <View
                style={{
                  width: '100%',
                  height: hp('5%'),
                  alignSelf: 'center',
                  backgroundColor: '#000',
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: '#fff',
                    fontSize: wp('2.5%'),

                    flex: 1,
                    textAlign: 'center',
                  }}>
                  Description
                </Text>
              </View>
              <FlatList
                data={productDetailsOnly}
                renderItem={renderItemDes}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>

            <View
              style={{
                width: wp('94%'),
                height: hp('15%'),
                alignSelf: 'center',
                marginTop: hp('3%'),
              }}>
              <View
                style={{
                  width: '100%',
                  height: hp('5%'),
                  alignSelf: 'center',
                  backgroundColor: '#000',
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: '#fff',
                    fontSize: wp('2.5%'),

                    flex: 1,
                    textAlign: 'center',
                  }}>
                  Unit of Measure Code

                </Text>
                <Text
                  style={{
                    color: '#fff',
                    fontSize: wp('2.5%'),

                    flex: 1,
                    textAlign: 'center',
                  }}>
                  Projected Available Quantity
                </Text>
                <Text
                  style={{
                    color: '#fff',
                    fontSize: wp('2.5%'),

                    flex: 1,
                    textAlign: 'center',
                  }}>
                  Projected Available Date
                </Text>
              </View>
              <FlatList
                data={productDetailsOnly}
                renderItem={renderItem1}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>


            <View
              style={{
                width: wp('94%'),
                // height: hp('20%'),
                alignSelf: 'center',
                // marginTop: hp('3%'),
              }}>
              <View
                style={{
                  width: '100%',
                  height: hp('5%'),
                  alignSelf: 'center',
                  backgroundColor: '#000',
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: '#fff',
                    fontSize: wp('2.5%'),

                    flex: 1,
                    textAlign: 'center',
                  }}>
                  Roll No
                </Text>
                <Text
                  style={{
                    color: '#fff',
                    fontSize: wp('2.5%'),

                    flex: 1,
                    textAlign: 'center',
                  }}>
                  Available Quantity
                </Text>

                <Text
                  style={{
                    color: '#fff',
                    fontSize: wp('2.5%'),

                    flex: 1,
                    textAlign: 'center',
                  }}>
                  Quantity
                </Text>
              </View>
              <FlatList
                data={items}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
            <View
              style={{
                width: wp('90%'),
                height: hp('7%'),
                borderRadius: 8,
                borderColor: '#EBEBEB',
                borderWidth: 1,
                backgroundColor: '#FFFFFF',
                alignSelf: 'center',
                marginTop: hp('1.5%'),
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text>
                Total Quantity :
              </Text>
              <Text
                style={{
                  color: '#000',
                  fontSize: wp('4%'),
                  textAlignVertical: 'center',
                  textAlign: 'center',
                  width: '30%',
                  borderLeftColor: '#EBEBEB',
                  borderLeftWidth: 1,
                  height: '100%',
                  alignSelf: 'center'
                }}
              >
                {isNaN(totalUnitPrice) ? '' : totalUnitPrice}
              </Text>
            </View>
            {CartError && (
              <Text
                style={{
                  color: '#153F5E',

                  fontSize: wp('4%'),
                  textAlign: 'center',
                  marginTop: hp('2%'),
                }}>
                {CartError}
              </Text>
            )}
            <TouchableOpacity
              style={{
                width: 344,
                height: 55,
                borderRadius: 50,
                backgroundColor: '#292929',
                alignSelf: 'center',
                marginTop: hp('2%'),
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: '10%'
              }}
              //onPress={() => navigation.navigate('Shop')}
              onPress={() => {
                if (totalUnitPrice == 0) {
                  alert('please enter quantity greater than 0');
                  return
                } else {
                  handleAddToCart()
                }
              }}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 18,
                  textAlign: 'center',

                }}>
                Add to Cart
              </Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </ScrollView>
  );
};

export default Searching;

const styles = StyleSheet.create({});
