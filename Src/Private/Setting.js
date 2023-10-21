import React, {useContext} from 'react';
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {logout} from '../Redux/Slices/authSlice';
import {useSelector, useDispatch} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay/lib';
const Setting = () => {
  const {isLoading, error} = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => dispatch(logout()), // Wrap dispatch in an arrow function
        },
      ]
    );
  };
  return (
    <ScrollView style={styles.container}>
      <Spinner visible={isLoading} />
      <Text style={styles.heading}>Account</Text>
      {/* <View style={styles.itemContainer}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={styles.iconContainer}>
            <Image source={require('../Assets/Icons/re.png')} />
          </View>
          <Text style={styles.itemText}>Change Password</Text>
        </View>

        <Image
          source={require('../Assets/Icons/vec.png')}
          style={styles.arrowIcon}
        />
      </View> */}
      <TouchableOpacity style={styles.itemContainer} onPress={handleLogout}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={styles.iconContainer}>
            <Image
              source={require('../Assets/Icons/logout.png')}
              style={styles.logoutIcon}
            />
          </View>
          <Text style={styles.itemText}>Sign Out</Text>
        </View>

        <Image
          source={require('../Assets/Icons/vec.png')}
          style={styles.arrowIcon}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  heading: {
    color: '#000',
    fontSize: 23,
    
    marginLeft: wp('5%'),
    marginTop: hp('2%'),
  },
  itemContainer: {
    width: wp('90%'),
    height: hp('8%'),
    borderRadius: 9,
    alignSelf: 'center',
    marginTop: hp('2%'),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderColor: '#EDEDED',
    borderBottomWidth: 0.5,
  },
  iconContainer: {
    backgroundColor: '#153F5E',
    width: 48,
    height: 48,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: wp('2%'),
  },
  itemText: {
    color: '#6A6A6A',
    fontSize: 16,
    marginLeft: wp('2%'),
    
  },
  logoutIcon: {
    width: 25,
    height: 25,
  },
  arrowIcon: {
    marginRight: wp('2%'),
  },
});

export default Setting;
