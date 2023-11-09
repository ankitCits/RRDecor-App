import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  StatusBar,
  TextInput,
  Platform,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import Spinner from 'react-native-loading-spinner-overlay/lib';
import {useDispatch, useSelector} from 'react-redux';
import IconM from 'react-native-vector-icons/Zocial';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {forgotpasswordotp, forgotpassword} from '../Redux/Slices/authSlice';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {useNavigation} from '@react-navigation/native';

const ForgotPassword = () => {
  const navigation = useNavigation();
  const {isLoading, error, forgotOtp, passwordChanged} = useSelector(
    state => state.auth,
  );
  const [email, setEmail] = useState('');
  const [localError, setLocalError] = useState('');
  const dispatch = useDispatch();
  var re = /\S+@\S+\.\S+/;
  const handleResetPasswordOtp = () => {
    if (re.test(email) == false) {
      setLocalError('Enter Valid Email Address');
      return;
    } else {
      setLocalError('');
    }

    dispatch(forgotpasswordotp(email));
  };

  const CELL_COUNT = 6;
  const [value, setValue] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const handleResetPassword = () => {
    if (password.length < 6) {
      setLocalError('Enter Minimum 6 digits Password');
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
    if (value.length !== 6) {
      setLocalError('Enter Valid 6 digit otp');
      return;
    } else {
      setLocalError('');
    }
    const credentials = {
      email: email,
      value: value,
      password: password,
      confirmPassword: confirmPassword,
    };
    dispatch(forgotpassword(credentials));
  };

  if (passwordChanged === true) {
    navigation.navigate('Login', {
      email: email,
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent barStyle="dark-content" backgroundColor="#fff" />
      <Spinner visible={isLoading} />
      <View
        style={{
          width: '100%',
          // height: hp('40%'),

          alignSelf: 'center',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop:'15%'
        }}>
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
          Forget Password
        </Text>
      </View>
      {forgotOtp === false ? (
        <>
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
          {localError && <Text style={styles.errorText}>{localError}</Text>}
          {error && <Text style={styles.errorText}>{error}</Text>}
          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleResetPasswordOtp}>
            <Text style={styles.loginButtonText}>Reset Password OTP</Text>
          </TouchableOpacity>
        </>
      ) : (
        <View style={{alignItems: 'center'}}>
          <Text style={styles.errorText}>otp sent to {email}</Text>
          {localError && <Text style={styles.errorText}>{localError}</Text>}
          {error && <Text style={styles.errorText}>{error}</Text>}
          <CodeField
            ref={ref}
            {...props}
            // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
            value={value}
            onChangeText={setValue}
            cellCount={CELL_COUNT}
            rootStyle={styles.codeFieldRoot}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            renderCell={({index, symbol, isFocused}) => (
              <Text
                key={index}
                style={[styles.cell, isFocused && styles.focusCell]}
                onLayout={getCellOnLayoutHandler(index)}>
                {symbol || (isFocused ? <Cursor /> : null)}
              </Text>
            )}
          />

          <View style={styles.inputContainer}>
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
              placeholder="password"
              placeholderTextColor="#999999"
              secureTextEntry={true}
            />
          </View>

          <View style={styles.inputContainer}>
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

          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleResetPassword}>
            <Text style={styles.loginButtonText}>Reset Password</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    flex: 1,
    alignItems: 'center',
  },
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
    flex: 0.5,
  },
  inputContainer: {
    width: wp('90%'),
    alignSelf: 'center',

    marginTop: hp('5%'),
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
    height: 44,
    marginLeft: wp('3%'),
    color: '#000',
    // fontFamily: 'Poppins-Regular',

    width: '70%',
  },
  loginButton: {
    backgroundColor: '#292929',
    width: wp('70%'),
    height: 62,
    borderRadius: 50,
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
    marginTop: hp('2%'),
  },
  codeFieldRoot: {marginTop: 20},
  cell: {
    width: wp('12%'),
    height: wp('12%'),
    borderRadius: wp('2%'),

    fontSize: wp('4%'),
    borderWidth: 1,
    borderColor: '#00000030',
    textAlign: 'center',
    textAlignVertical: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#DADADA',
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 0.01,
        shadowRadius: 1,
      },
      android: {
        elevation: 0,
      },
    }),

    borderColor: '#EEE',
    borderWidth: 2,

    fontFamily: 'Poppins',
    color: '#000',
    marginRight: wp('2%'),
  },
  focusCell: {
    borderColor: '#000',
  },
});
