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
import React, {useState, useContext, useEffect} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  useRoute,
  useNavigation,
  useFocusEffect,
} from '@react-navigation/native';
import {AuthContext} from '../context/AuthContext';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {
  updateSentOtpValue,
  verifyEmail,
  resendOtp,
  selectIsSignUpVerified,
} from '../Redux/Slices/authSlice';
import {useDispatch, useSelector} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay/lib';
import { BASE_URL } from '../conifg';

const Otp = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const route = useRoute();
  const {email} = route.params;
  console.log('email is', email);
  const {isLoading, verifyMessage, error} = useSelector(state => state.auth);
  const [localError, setLocalError] = useState('');

  const CELL_COUNT = 6;
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  //on click of resend button
  const onResendOtpButtonPress = () => {
    //clear input field
    setError('');
    setValue('');
  };

  // useEffect(() => {
  //   dispatch(updateSentOtpValue());
  // }, []);

  // useEffect(() => {
  //   // Listen for navigation changes
  //   const unsubscribe = navigation.addListener('focus', () => {
  //     dispatch(updateSentOtpValue());
  //   });

  //   // Clean up the listener when the component unmounts
  //   return unsubscribe;
  // }, [navigation]);

  const handleLogin = async() => {
    if (value.length !== 6) {
      setLocalError('Please add 6 digit otp');

      return;
    } else {
      setLocalError('');


      const res = await fetch(`${BASE_URL}/verifyemail/`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          // Authorization: await AsyncStorage.getItem('token'),
        },
        body: JSON.stringify({
          email: email,
          otp: value,
        }),
      });
      const result = await res.json();
      if(result?.auth_token){
        navigation.navigate('Login');
      }else{
        setLocalError(result?.result);
      }
      // let checkResponse = await dispatch(verifyEmail(result));
      console.log(">>>>checkResponse >> ",result)
      return
    }
  };

  const handleResendOtp = () => {
    dispatch(resendOtp(email));
    setValue('');
  };

  // const isUserEmailVerified = useSelector(selectIsSignUpVerified);
  // console.log("isUserEmailVerified>>>>",isUserEmailVerified);


  // useEffect(() => {
  //   if (isUserEmailVerified === true) {
  //     navigation.navigate('Login');
  //   }
  // }, [handleLogin]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent barStyle="dark-content" backgroundColor="#fff" />
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
         Otp Verification
        </Text>
        <Text
          style={{
            textAlign: 'center',
            color: '#153F5E',
            
          }}>
          otp sent to {email}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            width: wp('90%'),
          }}>
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
        </View>

        <TouchableOpacity
          onPress={handleResendOtp}
          style={{
            marginTop: hp('2%'),
            alignSelf: 'flex-end',
            marginRight: wp('7%'),
            backgroundColor: '#fff',
          }}>
          <Text style={styles.forgotPasswordText}>Resend Otp</Text>
        </TouchableOpacity>
        {localError && <Text style={{color: 'red'}}>{localError}</Text>}
        {error && <Text style={{color: 'red'}}>{error}</Text>}
        {verifyMessage && <Text style={{color: 'red'}}>{verifyMessage}</Text>}
        <TouchableOpacity
          style={styles.loginButton}
          onPress={handleLogin}
          //</View> disabled={value.length !== 4 ? true : false}
        >
          <Text style={styles.loginButtonText}>Verify</Text>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginImage: {
    marginVertical: hp('5%'),
  },

  forgotPasswordText: {
    color: '#153F5E',
    fontSize: 14,
    fontWeight: '500',

    // fontFamily: 'Poppins-Regular',
  },
  loginButton: {
    backgroundColor: '#292929',
    width: 219,
    height: 62,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp('3%'),
    marginBottom: hp('10%'),
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
    // fontFamily: 'Poppins-Regular',
  },

  input: {
    width: wp('15%'),
    height: wp('15%'),
    borderRadius: wp('2%'),
    ...Platform.select({
      ios: {
        shadowColor: '#DADADA',
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 0.01,
        shadowRadius: 1,
      },
      android: {
        elevation: 1,
      },
    }),
    borderColor: '#EEE',
    borderWidth: 2,
    fontSize: wp('5%'),

    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',

    // fontFamily: 'Poppins',
    color: '#000',
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
    padding:10,
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

    // fontFamily: 'Poppins',
    color: '#000',
    marginRight: wp('2%'),
  },
  focusCell: {
    borderColor: '#000',
    padding:10
  },
});

export default Otp;
