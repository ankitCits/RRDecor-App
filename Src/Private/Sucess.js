import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import {resetOrderStatus} from '../Redux/Slices/orderSlice';
import {useDispatch} from 'react-redux';
const Sucess = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetOrderStatus());
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Image
        source={require('../Assets/Image/shop.png')}
        style={styles.image}
      />

      <Text style={styles.heading}>Success!</Text>
      <Text style={styles.message}>Your order will be delivered soon.</Text>
      <Text style={styles.thankYou}>Thank you for choosing our app!</Text>

      <TouchableOpacity
        style={styles.trackOrderButton}
        onPress={() => navigation.navigate('Order History')}>
        <Text style={styles.trackOrderButtonText}>Track Order</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.continueShoppingButton}
        onPress={() => navigation.navigate('Home')}>
        <Text style={styles.continueShoppingButtonText}>CONTINUE SHOPPING</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Sucess;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  image: {
    alignSelf: 'center',
    width: 200,
    height: 200,
    marginTop: hp('10%'),
  },
  heading: {
    fontSize: 34,
    color: '#000',

    textAlign: 'center',

    
  },
  message: {
    fontSize: 14,
    color: '#000',

    textAlign: 'center',
    marginTop: hp('2%'),

    
  },
  thankYou: {
    fontSize: 14,
    color: '#000',
    fontWeight: '500',
    textAlign: 'center',
  },
  trackOrderButton: {
    backgroundColor: '#fff',
    width: 343,
    height: 48,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: hp('15%'),
    marginBottom: hp('2%'),
    borderColor: '#000',
    borderWidth: 1,
  },
  trackOrderButtonText: {
    color: '#000',
    fontSize: 16,

    
  },
  continueShoppingButton: {
    backgroundColor: '#000',
    width: 343,
    height: 48,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: hp('2%'),
  },
  continueShoppingButtonText: {
    color: '#fff',
    fontSize: 16,

    
  },
});
