import { StyleSheet, Text, View, TouchableOpacity, Image, Alert, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  getCartData,
  removeCartItem,
  removeSpecificItem,
} from '../../Redux/Slices/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { selectToken } from '../../Redux/Slices/authSlice';

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const profileData = useSelector(selectToken);
  const [loader, setLoader] = useState(false)
  const [isChecked, setChecked] = useState(false);
  const handleCheck = () => {
    setChecked(!isChecked);
  };

  const handleDeleteCartItem = () => {
    Alert.alert(
      'DELETE FROM CART',
      `${item?.item_description}`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Continue',
          onPress: async() => {
            setLoader(true)
            dispatch(removeSpecificItem(item));
            console.log('item id is', item.id);
            const params = {
              userToken: profileData.auth_token,
              id: item.id,
            };
            dispatch(removeCartItem(params));
            let data = await dispatch(getCartData(profileData.auth_token));
            if(data){

              setLoader(false)
            }
          },
        },
      ],
      { cancelable: false }
    );

  };

  const addUrl = item.product_image;

  return (
    <View style={styles.itemContainer}>
      <View style={styles.itemContent}>
        {/* <TouchableOpacity
          style={styles.checkboxContainer}
          onPress={handleCheck}>
          {isChecked ? (
            <Icon name="check-box" size={25} color="#C6C6C6" /> // Use the appropriate icon and styling
          ) : (
            <Icon name="check-box-outline-blank" size={25} color="#C6C6C6" />
          )}
        </TouchableOpacity> */}
        {/* <Image
          //source={require('../../Assets/Image/Dan.png')}
          source={{uri: `https://rrdecor.wooshelf.com${addUrl}`}}
          style={{
            width: wp('15%'),
            height: wp('15%'),
            borderRadius: wp('2%'),
            marginLeft: '5%',
          }}
        /> */}
        <View style={styles.itemDetails}>
          <Text style={styles.itemName}>
            Item Id : {item.id}
          </Text>
          <Text style={styles.itemQuantity}>Quantity: {item.quantity} {item?.unit_of_measure}</Text>
          <Text style={[styles.itemName, { fontSize: 12 }]}>
            {item.product_name}  ({item.item_description})
          </Text>
          {/* <Text style={[styles.itemName,{fontSize:12}]}>
            Desc : {item.item_description}
          </Text> */}
        </View>
      </View>
      <TouchableOpacity onPress={handleDeleteCartItem}>
        {loader ?
          <ActivityIndicator style={{marginRight: wp('5%'),}} size={'small'} color={'red'} />
          :
          <Image
            source={require('../../Assets/Icons/delete.png')}
            style={styles.deleteIcon}
          />
        }

      </TouchableOpacity>
    </View>
  );
};

export default CartItem;

const styles = StyleSheet.create({
  itemContainer: {
    width: wp('90%'),
    backgroundColor: '#fff',
    height: hp('12%'),
    borderRadius: 7,
    alignSelf: 'center',
    marginTop: hp('2%'),
    borderColor: '#EAEAEA',
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemContent: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  checkboxContainer: {
    marginLeft: wp('2%'),
    marginRight: wp('2%'),
  },
  itemDetails: {
    marginLeft: wp('5%'),

  },
  itemName: {
    color: 'black',
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
  },
  itemQuantity: {
    color: 'black',
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
  },
  deleteIcon: {
    marginRight: wp('5%'),
  },
});
