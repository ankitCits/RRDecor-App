import React, { useState, useEffect } from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useSelector, useDispatch } from 'react-redux';
import { selectToken } from '../Redux/Slices/authSlice';
import { postShippingData } from '../Redux/Slices/shippingSlice';
import Spinner from 'react-native-loading-spinner-overlay/lib';
import { clearShippingData } from '../Redux/Slices/shippingSlice';

const Addship = ({ navigation }) => {
  const [fullName, setFullName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState(0);
  const [country, setCountry] = useState('');
  const [gstId, setGstId] = useState('');
  const [mobileNo, setMobileNo] = useState('')
  const { isLoading, error, shippingAdded } = useSelector(
    state => state.shipping,
  );
  const profileData = useSelector(selectToken);
  const dispatch = useDispatch();
  const handleSubmitAddress = () => {
    const params = {
      name: fullName,
      companyName: companyName,
      address: address,
      city: city,
      state: state,
      zipcode: zipCode,
      country: country,
      gstId: gstId,
      mobileNo: mobileNo,
      userToken: profileData.auth_token,

    };
    dispatch(postShippingData(params));
  };

  useEffect(() => {
    if (shippingAdded === true) {
      setAddress('');
      setCity('');
      setCountry('');
      setFullName('');
      setState('');
      setZipCode('');
      navigation.navigate('Shop');
      dispatch(clearShippingData());
    }
  }, [handleSubmitAddress]);

  const handleQuantityChange = text => {
    // Validate the input if needed
    const parsedQuantity = parseInt(text, 10);
    if (!isNaN(parsedQuantity)) {
      setZipCode(parsedQuantity);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, }}
      // behavior="padding" // Set behavior to 'padding'
    >
      <ScrollView style={styles.container}>
        <Spinner visible={isLoading} />
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Full name</Text>
          <TextInput
            placeholderTextColor="#000"
            // placeholder="Enter Your Name"
            style={styles.input}
            value={fullName}
            onChangeText={text => setFullName(text)}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Mobile Number</Text>
          <TextInput
            placeholderTextColor="#000"
            // placeholder="Enter Your Name"
            style={styles.input}
            value={mobileNo}
            keyboardType='number-pad'
            onChangeText={text => setMobileNo(text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Company Name</Text>
          <TextInput
            placeholderTextColor="#000"
            // placeholder="Enter Your Name"
            style={styles.input}
            value={companyName}
            onChangeText={text => setCompanyName(text)}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Address</Text>
          <TextInput
            placeholderTextColor="#000"
            // placeholder="Enter Your Address"
            style={styles.input}
            value={address}
            onChangeText={text => setAddress(text)}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>City</Text>
          <TextInput
            placeholderTextColor="#000"
            // placeholder="Enter Your City"
            style={styles.input}
            value={city}
            onChangeText={text => setCity(text)}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>State/Province/Region</Text>
          <TextInput
            placeholderTextColor="#000"
            // placeholder="Enter Your State"
            style={styles.input}
            value={state}
            onChangeText={text => setState(text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Country</Text>
          <TextInput
            placeholderTextColor="#000"
            // placeholder="Enter Your Country"
            style={styles.input}
            value={country}
            onChangeText={text => setCountry(text)}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Zip Code</Text>
          <TextInput
            placeholderTextColor="#000"
            // placeholder="Enter Your Zipcode"
            style={styles.input}
            value={zipCode}
            keyboardType="numeric"
            onChangeText={handleQuantityChange}
          />
        </View>



        <View style={styles.inputContainer}>
          <Text style={styles.label}>Gst</Text>
          <TextInput
            placeholderTextColor="#000"
            // placeholder="Enter Your Country"
            style={styles.input}
            value={gstId}
            onChangeText={text => setGstId(text)}
          />
        </View>
        {error && (
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
        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSubmitAddress}
        //onPress={() => navigation.goBack()}
        >
          <Text style={styles.saveButtonText}>SAVE ADDRESS</Text>
        </TouchableOpacity>
        
      </ScrollView>

    </KeyboardAvoidingView>
  );
};

export default Addship;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flexGrow: 1,
    // bottom:'70%'
  },
  inputContainer: {
    backgroundColor: '#fff',
    borderRadius: 4,
    elevation: 5,
    shadowColor: '#DADADADA',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    width: wp('90%'),
    height: hp('8%'),
    alignSelf: 'center',
    marginTop: hp('2%'),
    borderColor: '#EAEAEA',
    borderWidth: 0.5,
  },
  label: {
    color: '#9B9B9B',
    fontSize: 12,

    marginLeft: wp('5%'),
    marginTop: hp('1%'),
  },
  input: {
    color: '#000',
    fontSize: 14,

    marginLeft: wp('4%'),
    // marginTop: hp('-1%'),
    padding: 10,
    paddingLeft: 0,
    // backgroundColor:'red'

  },
  saveButton: {
    backgroundColor: '#000',
    width: wp('80%'),
    height: hp('8%'),
    borderRadius: wp('15%'),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: hp('2%'),
    marginBottom: hp('2%'),
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,

  },
});
