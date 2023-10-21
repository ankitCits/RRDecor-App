import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {ScrollView} from 'react-native-virtualized-view';

const ShippingAddressItem = ({item, setSelectAddress, selectAddress}) => {
  console.log('shipping item is', item);
  const [isChecked, setChecked] = useState(false);
  const handleCheck = () => {
    //setChecked(!isChecked);

    setSelectAddress(item);
    console.log('slected item', item);
  };
  return (
    <View style={styles.itemContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.nameText}>
          Name: <Text style={styles.addressText}>{item.address}</Text>
        </Text>
        {/* <Text style={styles.editText}>Edit</Text> */}
      </View>
      <View style={styles.addressContainer}>
        <Text style={styles.labelText}>
          Shipping Address:{' '}
          <Text style={styles.addressText}>{item.address}</Text>
        </Text>
      </View>
      <View style={styles.addressContainer}>
        <Text style={styles.labelText}>
          Billing Address:{' '}
          <Text style={styles.addressText}>{item.billing_address}</Text>
        </Text>
      </View>

      <View style={styles.addressContainer}>
        <Text style={styles.labelText}>
          City: <Text style={styles.addressText}>{item.city}</Text>
        </Text>
      </View>

      <View style={styles.addressContainer}>
        <Text style={styles.labelText}>
          State: <Text style={styles.addressText}>{item.state}</Text>
        </Text>
      </View>

      <View style={styles.addressContainer}>
        <Text style={styles.labelText}>
          Zipcode: <Text style={styles.addressText}>{item.zipcode}</Text>
        </Text>
      </View>
      <View style={styles.checkboxContainer}>
        <TouchableOpacity style={styles.checkboxButton} onPress={handleCheck}>
          {item === selectAddress ? (
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
};

export default ShippingAddressItem;

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

    
  },
  addressText: {
    color: '#222222',
    fontWeight: '100',
    // fontFamily: 'Poppins-Light',
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
});
