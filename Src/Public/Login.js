import {
  Image,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import IconM from 'react-native-vector-icons/Zocial';
import {useNavigation} from '@react-navigation/native';

import Spinner from 'react-native-loading-spinner-overlay/lib';
import {login, resetLoginMessage, sendOtp} from '../Redux/Slices/authSlice';
import {useDispatch, useSelector} from 'react-redux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const Login = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {isLoading, error, sentOtp} = useSelector(state => state.auth);
  const [localError, setLocalError] = useState('');
  var re = /\S+@\S+\.\S+/;
  const handleLogin = () => {
    if (re.test(email) == false) {
      setLocalError('Enter Valid Email Address');
      return;
    } else {
      setLocalError('');
    }
    if (password.length < 1) {
      setLocalError('Please Enter Password ');
      return;
    } else {
      setLocalError('');
    }
    const credentials = {
      email: email,
      password: password,
    };
    dispatch(login(credentials));
  };

  useEffect(() => {
    dispatch(resetLoginMessage());
  }, [navigation]);

  useEffect(() => {
    // Listen for navigation changes
    const unsubscribe = navigation.addListener('blur', () => {
      dispatch(resetLoginMessage());
    });

    // Clean up the listener when the component unmounts
    return unsubscribe;
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent barStyle="dark-content" backgroundColor="#fff" />
      <Spinner visible={isLoading} />
      <View style={styles.contentContainer}>
        <Image
          source={require('../Assets/Image/logo3x.png')}
          style={{width: wp('70%'), height: hp('10%')}}
          resizeMode="contain"
        />
        <Text
          style={{
            
            fontSize: wp('7%'),
            color: '#000',
            marginVertical: hp('2%'),
            fontWeight:'600'
          }}>
          Login
        </Text>
        <View style={styles.inputContainer}>
          <View style={styles.inputIconContainer}>
            <IconM name="email" size={18} color="#153F5E" />
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
        <TouchableOpacity
          onPress={() => navigation.navigate('ForgotPassword')}
          style={{
            textAlign: 'right',
            marginTop: hp('2%'),
            alignSelf: 'flex-end',
            marginRight: wp('5%'),
          }}>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>

        {localError && <Text style={styles.errorText}>{localError}</Text>}
        {error && <Text style={styles.errorText}>{error}</Text>}
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.signupText}>
            Don't have an account?{' '}
            <Text style={styles.signupLink}>Sign Up</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginImage: {
    marginBottom: hp('5%'),
    marginTop: hp('5%'),
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
    width: wp('12%'),
    height: wp('12%'),
    backgroundColor: '#E3EFF8',
    borderRadius: wp('1%'),
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: wp('3%'),
  },
  input: {
    height: 50,
    marginLeft: wp('3%'),
    color: '#000',
    // fontFamily: 'Poppins-Regular',

    width: '70%',
  },
  inputContainerPassword: {
    marginTop: hp('2%'),
  },
  forgotPasswordText: {
    color: '#153F5E',
    fontSize: 14,

    // fontFamily: 'Poppins-Regular',
  },
  loginButton: {
    backgroundColor: '#292929',
    width: wp('60%'),
    height: hp('8%'),
    borderRadius: wp('10%'),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp('3%'),
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
    // fontFamily: 'Poppins-Regular',
  },
  errorText: {
    color: '#153F5E',
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
    // fontFamily: 'Poppins-Regular',
    marginVertical: hp('1%'),
  },
  signupText: {
    color: '#999999',
    fontSize: 14,
    marginTop: hp('4%'),
    marginBottom: hp('6%'),
    // fontFamily: 'Poppins-Regular',
  },
  signupLink: {
    color: '#153F5E',
    // fontFamily: 'Poppins-Regular',
  },
});

export default Login;
