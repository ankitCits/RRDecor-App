import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Linking,
  Image,
  RefreshControl,
} from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import IconG from 'react-native-vector-icons/EvilIcons';
import IconD from 'react-native-vector-icons/Feather';
import Spinner from 'react-native-loading-spinner-overlay/lib';
import { ScrollView } from 'react-native-virtualized-view';
import { getOrderData, selectOrderData } from '../Redux/Slices/orderSlice';
import { useDispatch, useSelector } from 'react-redux';
import { selectToken } from '../Redux/Slices/authSlice';
import { useNavigation } from '@react-navigation/native';
const OrderHistory = () => {
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);
  const profileData = useSelector(selectToken);
  const navigation = useNavigation();
  useEffect(() => {
    // Listen for navigation changes
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(getOrderData(profileData.auth_token));
    });

    // Clean up the listener when the component unmounts
    return unsubscribe;
  }, [navigation]);

  const orderDataIs = useSelector(selectOrderData);
  const { isOrderLoading } = useSelector(state => state.order);


  const handleLinkPress = link => {
    const url = link; // Replace with your desired URL
    Linking.openURL(url);
  };

  const renderItem = ({ item }) => {
    const date = item.order_date;
    const filteredDate = date.split('-');
    console.log('filtered date is', filteredDate);
    const day = filteredDate[2].split('T');

    const addUrl = item.product_image;
    return (
      <View style={styles.container}>
        <View
          style={{
            flexDirection: 'column',
            width: '70%',
            height: '60%',
            justifyContent: 'space-evenly',
          }}>
          <View style={styles.textContainer}>
            <Text style={styles.titleText}>
              Order Status:
            </Text>

            <Text style={styles.subTitleText}>{item?.order_status}</Text>
          </View>

          <View style={styles.textContainer}>
            <Text style={styles.titleText}>
              Product Name:
            </Text>

            <Text style={styles.subTitleText}>{item.product_name}</Text>
          </View>


          <View style={styles.textContainer}>
            <Text style={styles.titleText}>Quantity:</Text>

            <Text style={styles.subTitleText}>{item.quantity}</Text>
          </View>
        </View>

        <View
          style={{
            width: '25%',
            height: '100%',

            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            source={{ uri: `https://rrdecor.wooshelf.com${addUrl}` }}
            style={{
              width: '100%',
              height: '90%',
              borderRadius: wp('2%'),
            }}
            resizeMode="cover"
          />
        </View>
      </View>
    );
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      dispatch(getOrderData(profileData.auth_token));
      setRefreshing(false);
    }, 2000);
  }, []);
  return (
    <ScrollView 
    showsVerticalScrollIndicator={false}
    refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
    }
    style={{ flex: 1, backgroundColor: '#fff' }}>
      <Spinner visible={isOrderLoading} />
      {orderDataIs.length === 0 ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
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
        <FlatList
          style={{ marginVertical: hp('2%') }}
          data={orderDataIs}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      )}
    </ScrollView>
  );
};

export default OrderHistory;

const styles = StyleSheet.create({
  container: {
    width: wp('90%'),
    backgroundColor: '#fff',
    height: hp('10%'),
    borderRadius: wp('1%'),
    alignSelf: 'center',
    marginTop: hp('2%'),
    borderColor: '#EAEAEA',
    borderWidth: 1,
    elevation: 5,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: hp('1%'),
    marginLeft: wp('2%'),
    marginRight: wp('2%'),
  },

  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleText: {
    fontSize: wp('3.5%'),
    // fontFamily: 'Poppins-Regular',
    color: '#000',
  },
  subTitleText: {
    fontSize: wp('3.5%'),

    color: '#6A6A6A',
  },
  rightText: {
    fontSize: 11,
    fontFamily: 'Poppins-Regular',
    color: '#6A6A6A',
    textAlign: 'right',
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  button: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
