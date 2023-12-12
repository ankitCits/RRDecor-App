import React, {useEffect, useState} from 'react';
import {
  Image,
  Linking,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
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
import IconM from 'react-native-vector-icons/Zocial';
import IconG from 'react-native-vector-icons/FontAwesome';
import IconL from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import Spinner from 'react-native-loading-spinner-overlay/lib';
import {signUp} from '../Redux/Slices/authSlice';
import {useDispatch, useSelector} from 'react-redux';

const Signup = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [company, setCompany] = useState('');

  const [gstNo, setgstNo] = useState('');
  const [gstType, setgstType] = useState('');
  const [address, setaddress] = useState('');
  const {isLoading, signUperror, sentOtp} = useSelector(state => state.auth);

  const [localError, setLocalError] = useState('');
  var re = /\S+@\S+\.\S+/;

  const dispatch = useDispatch();
  const [sendOtp, setSendOtp] = useState(false);

  const handleSignUp = () => {
    if (name === '') {
      setLocalError('Please enter your full name');
      return;
    } else {
      setLocalError('');
    }

    if (re.test(email) === false) {
      setLocalError('Please enter valid email address');
      return;
    } else {
      setLocalError('');
    }
    if (password.length < 6) {
      setLocalError('Please enter minimum 6 digit password');
      return;
    } else {
      setLocalError('');
    }
    if (password !== confirmPassword) {
      setLocalError('Passwords do not match');
      return;
    } else {
      setLocalError('');
    }
    

    const credentials = {
      name: name,
      email: email,
      mobile_number: mobile,
      password: password,
      confirm_password: confirmPassword,
      // city: city,
      // state: state,
      // company: company,
      // gst_no:gstNo,
      // gst_type:gstType,
      // address:address
    };
    dispatch(signUp(credentials));
  };
  // if (sentOtp === true) {
  //   navigation.navigate('Otp', {
  //     email: email,
  //   });
  // }
  useEffect(() => {
    if (sentOtp === true) {
      navigation.navigate('Otp', {
        email: email,
      });
    }
  }, [handleSignUp]);

  return (
    <SafeAreaView style={{backgroundColor:'#fff'}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Spinner visible={isLoading} />
        <View style={styles.contentContainer}>
          <Image
            source={require('../Assets/Image/logo3x.png')}
            style={{width: wp('70%'), height: hp('10%'),marginTop:'15%'}}
          resizeMode="contain"
          />
          <Text
          style={{
            
            fontSize: wp('7%'),
            color: '#000',
            marginVertical: hp('2%'),
            fontWeight:'600'
          }}>
          Sign Up
        </Text>
          <View style={styles.inputContainer}>
            <View style={styles.inputIconContainer}>
              <IconG name="user" size={20} />
            </View>
            <TextInput
              style={styles.input}
              onChangeText={text => setName(text)}
              value={name}
              placeholder="Full Name"
              placeholderTextColor="#999999"
            />
          </View>
          <View style={[styles.inputContainer, styles.inputContainerPassword]}>
            <View style={styles.inputIconContainer}>
              <IconM name="email" size={18} />
            </View>
            <TextInput
              style={styles.input}
              onChangeText={text => setEmail(text)}
              value={email}
              placeholder="Email"
              placeholderTextColor="#999999"
            />
          </View>
          <View style={[styles.inputContainer, styles.inputContainerPassword]}>
            <View style={styles.inputIconContainer}>
              <Image
                source={require('../Assets/Icons/lock.png')}
                style={{width: 18, height: 18}}
                resizeMode="contain"
              />
            </View>
            <TextInput
              style={styles.input}
              onChangeText={text => setPassword(text)}
              value={password}
              placeholder="Password"
              placeholderTextColor="#999999"
              secureTextEntry={true}
            />
          </View>
          <View style={[styles.inputContainer, styles.inputContainerPassword]}>
            <View style={styles.inputIconContainer}>
              <Image
                source={require('../Assets/Icons/lock.png')}
                style={{width: 18, height: 18}}
                resizeMode="contain"
              />
            </View>
            <TextInput
              style={styles.input}
              onChangeText={text => setConfirmPassword(text)}
              value={confirmPassword}
              placeholder="Confirm Password"
              placeholderTextColor="#999999"
              secureTextEntry={true}
            />
          </View>

          <View style={[styles.inputContainer, styles.inputContainerPassword]}>
            <View style={styles.inputIconContainer}>
              <IconG name="mobile-phone" size={25} />
            </View>
            <TextInput
              style={styles.input}
              onChangeText={text => setMobile(text)}
              value={mobile}
              placeholder="Mobile Number ( optional )"
              placeholderTextColor="#999999"
              keyboardType='number-pad'
            />
          </View>
          {/* <View style={[styles.inputContainer, styles.inputContainerPassword]}>
            <View style={styles.inputIconContainer}>
              <IconL name="location-sharp" size={25} />
            </View>
            <TextInput
              style={styles.input}
              onChangeText={text => setCompany(text)}
              value={company}
              placeholder="Company"
              placeholderTextColor="#999999"
            />
          </View>
          <View style={[styles.inputContainer, styles.inputContainerPassword]}>
            <View style={styles.inputIconContainer}>
              <IconL name="navigate-circle-outline" size={25} />
            </View>
            <TextInput
              style={styles.input}
              onChangeText={text => setaddress(text)}
              value={address}
              placeholder="Address"
              placeholderTextColor="#999999"
            />
          </View>
          <View style={[styles.inputContainer, styles.inputContainerPassword]}>
            <View style={styles.inputIconContainer}>
              <IconL name="globe-outline" size={25} />
            </View>
            <TextInput
              style={styles.input}
              onChangeText={text => setCity(text)}
              value={city}
              placeholder="City"
              placeholderTextColor="#999999"
            />
          </View>
          <View style={[styles.inputContainer, styles.inputContainerPassword]}>
            <View style={styles.inputIconContainer}>
              <IconL name="globe-outline" size={25} />
            </View>
            <TextInput
              style={styles.input}
              onChangeText={text => setState(text)}
              value={state}
              placeholder="State"
              placeholderTextColor="#999999"
            />
          </View>

          <View style={[styles.inputContainer, styles.inputContainerPassword]}>
            <View style={styles.inputIconContainer}>
              <IconL name="card-outline" size={25} />
            </View>
            <TextInput
              style={styles.input}
              onChangeText={text => setgstNo(text)}
              value={gstNo}
              placeholder="Gst Number"
              placeholderTextColor="#999999"
            />
          </View> */}

          <TouchableOpacity 
          onPress={ ()=>{ Linking.openURL('https://www.rrdecor.com/privacy-policy.php')}}
          style={{
            margin:'5%',
            // backgroundColor:'red',
            width:'100%',
            height:30,
            justifyContent:'center',
            alignItems:'center',
            marginBottom:'2%'
          }}
          
          >
              <Text
              style={{
                textDecorationLine:'underline'
              }}
              >Privacy Policy</Text>
          </TouchableOpacity>



          {localError && <Text style={styles.errorText}>{localError}</Text>}
          {signUperror && <Text style={styles.errorText}>{signUperror}</Text>}
          <TouchableOpacity style={styles.loginButton} onPress={handleSignUp}>
            <Text style={styles.loginButtonText}>Sign Up</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.signupText}>
              Already created an account?{' '}
              <Text style={styles.signupLink}>Login</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    alignItems: 'center',
    backgroundColor: '#fff',
    marginBottom:'30%'
  },
  loginImage: {
    marginBottom: hp('4%'),
    marginTop: hp('3%'),
  },
  inputContainer: {
    width: wp('90%'),
    backgroundColor: '#ffffff',
    height: 63,
    borderRadius: 9,
    flexDirection: 'row',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 0.05,
        shadowRadius: 2,
      },
      android: {
        elevation: 1,
      },
    }),
    borderColor: '#EEE',
    borderWidth: 0.3,
  },
  inputIconContainer: {
    width: 48,
    height: 46,
    backgroundColor: '#E3EFF8',
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: wp('3%'),
  },
  input: {
    height: 44,
    marginLeft: wp('3%'),
    color: '#000',
    // backgroundColor:'red',
    width: '80%',
    
  },
  inputContainerPassword: {
    marginTop: hp('2%'),
  },
  errorText: {
    color: '#153F5E',
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
    // fontFamily: 'Poppins-Regular',
    marginTop: hp('2%'),
  },
  forgotPasswordText: {
    color: '#153F5E',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'right',
    marginTop: hp('2%'),
    alignSelf: 'flex-end',
    marginRight: wp('5%'),
  },
  loginButton: {
    backgroundColor: '#292929',
    width: wp('70%'),
    height: hp('8%'),
    borderRadius: wp('10%'),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp('1%'),
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    
    textAlign: 'center',
  },
  signupText: {
    color: '#999999',
    fontSize: 14,
    
    marginTop: hp('4%'),
    marginBottom: hp('6%'),
  },
  signupLink: {
    color: '#153F5E',
    
  },
  icon: {
    fontSize: 28,
    color: '#153F5E',
  },
  icon1: {
    fontSize: 33,
    color: '#153F5E',
  },
});

export default Signup;
