import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Alert,
  Vibration,
  Dimensions,
} from 'react-native';
import React, { useContext, useState } from 'react';
import IconG from 'react-native-vector-icons/MaterialIcons';
//   import ToggleSwitch from 'toggle-switch-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import IconI from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectToken } from '../Redux/Slices/authSlice';
import { BASE_URL } from '../conifg';
// import {setSignOut} from '../../Redux/slices/AuthSlice';
// import {useDispatch} from 'react-redux';

const SettingScreen = ({ navigation }) => {
  const profileData = useSelector(selectToken);
  const [windowWidth, setWindowWidth] = useState(Dimensions.get('window').width);
  const [windowHeight, setWindowHeight] = useState(Dimensions.get('window').height);

  const { isLoading, error } = useSelector(state => state.auth);
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


  const handleDeleteOption = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to Delete your account?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => handleDelete(), // Wrap dispatch in an arrow function
        },
      ]
    );
  };

  
const handleDelete = () => {
console.log(">>>>>>>",profileData.auth_token)
var myHeaders = new Headers();
myHeaders.append("Authorization", `token ${profileData.auth_token}`);

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

fetch(`${BASE_URL}/user-delete/`, requestOptions)
  .then(response => response.json())
  .then(result => {
    dispatch(logout())
    console.log(result)})
  .catch(error => console.log('error', error));

}
  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>

      {/* <View
              style={{
                  width: windowWidth * 0.9,
                  alignSelf: 'center',

                  flexDirection: 'row',
                  alignItems: 'center',
                  borderBottomColor: '#EAEAEA',
                  borderBottomWidth: 1,
                  marginTop: windowHeight * 0.02,
              }}>
              <Text
                  style={{
                      color: '#000',
                      fontSize: windowWidth * 0.05,
                      marginLeft: '4%',
                      fontFamily: 'Poppins-SemiBold',
                      marginTop: '2%',
                  }}>
                  About
              </Text>
          </View> */}
      <View
        style={{
          flexDirection: 'column',

          width: windowWidth * 0.9,
          alignSelf: 'center',
          marginTop: windowHeight * 0.02,
        }}>

        <TouchableOpacity
          onPress={() => navigation.navigate('AboutScreen')}
          style={{
            flexDirection: 'row',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: windowHeight * 0.02,
          }}>
          <Text style={{ color: '#5B5B5B', fontSize: windowWidth * 0.04 }}>
            About Us
          </Text>
          <IconG
            name="chevron-right"
            color={'#5B5B5B'}
            size={windowWidth * 0.07}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('PrivacyScreen')}
          style={{
            flexDirection: 'row',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: windowHeight * 0.02,
          }}>
          <Text style={{ color: '#5B5B5B', fontSize: windowWidth * 0.04 }}>
            Privacy & Policy
          </Text>
          <IconG
            name="chevron-right"
            color={'#5B5B5B'}
            size={windowWidth * 0.07}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('TermsScreen')}
          style={{
            flexDirection: 'row',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: windowHeight * 0.02,
          }}>
          <Text style={{ color: '#5B5B5B', fontSize: windowWidth * 0.04 }}>
            Terms & Conditions
          </Text>
          <IconG
            name="chevron-right"
            color={'#5B5B5B'}
            size={windowWidth * 0.07}
          />
        </TouchableOpacity>


      </View>
      {profileData?.userData?.email != "help@rrdecor.com" &&

        <>
          <TouchableOpacity
            onPress={handleDeleteOption}
            style={{
              marginTop: windowHeight * 0.03,
              position: 'absolute',
              bottom: windowHeight * 0.18,
              width: windowWidth * 0.9,
              alignSelf: 'center',
              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: '#fff',
              padding: windowHeight * 0.015,
              borderRadius: windowWidth * 0.02,
              height: windowHeight * 0.1,
              elevation: 5,
              flexDirection: 'row',
              borderWidth: 1,
              borderColor: 'red'
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                width: '80%',
                height: '95%',
                // justifyContent:'center'
              }}>
              <View
                style={{
                  width: windowWidth * 0.12,
                  backgroundColor: 'red',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: windowWidth * 0.12,
                  borderRadius: windowWidth * 0.02,
                }}>
                {/* <Image source={require('../Assets/Icons/logout.png')} /> */}
                <IconI
                name="trash-bin-sharp"
                color={'white'}
                size={windowWidth * 0.08}
              />
              </View>
              <View
                style={{
                  marginLeft: '5%',

                  width: '50%',
                  height: '100%',
                  fontSize: windowWidth * 0.04,
                  fontFamily: 'Poppins-SemiBold',
                  color: '#000',
                  textAlignVertical: 'center',
                  //   alignSelf:'center'
                  //   backgroundColor:'red',
                  justifyContent: 'center',
                  //   border
                }}
              >
                <Text
                  style={{

                    fontSize: windowWidth * 0.04,
                    fontFamily: 'Poppins-SemiBold',
                    color: 'red',
                    textAlignVertical: 'center',
                  }}>
                  Delete Account
                </Text>
              </View>
            </View>
            <View
              style={{
                width: '20%',

                height: '95%',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <IconI
                name="chevron-forward-outline"
                color={'red'}
                size={windowWidth * 0.08}
              />
            </View>
          </TouchableOpacity>







          <TouchableOpacity
            onPress={handleLogout}
            style={{
              marginTop: windowHeight * 0.03,
              position: 'absolute',
              bottom: windowHeight * 0.05,
              width: windowWidth * 0.9,
              alignSelf: 'center',
              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: '#fff',
              padding: windowHeight * 0.015,
              borderRadius: windowWidth * 0.02,
              height: windowHeight * 0.1,
              elevation: 5,
              flexDirection: 'row',
              borderWidth: 1,
              borderColor: 'grey'
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                width: '80%',
                height: '95%',
                // justifyContent:'center'
              }}>
              <View
                style={{
                  width: windowWidth * 0.12,
                  backgroundColor: '#000',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: windowWidth * 0.12,
                  borderRadius: windowWidth * 0.02,
                }}>
                <Image source={require('../Assets/Icons/logout.png')} />
              </View>
              <View
                style={{
                  marginLeft: '5%',

                  width: '50%',
                  height: '100%',
                  fontSize: windowWidth * 0.04,
                  fontFamily: 'Poppins-SemiBold',
                  color: '#000',
                  textAlignVertical: 'center',
                  //   alignSelf:'center'
                  //   backgroundColor:'red',
                  justifyContent: 'center',
                  //   border
                }}
              >
                <Text
                  style={{

                    fontSize: windowWidth * 0.04,
                    fontFamily: 'Poppins-SemiBold',
                    color: '#000',
                    textAlignVertical: 'center',
                  }}>
                  Sign Out
                </Text>
              </View>
            </View>
            <View
              style={{
                width: '20%',

                height: '95%',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <IconI
                name="chevron-forward-outline"
                color={'#000'}
                size={windowWidth * 0.08}
              />
            </View>
          </TouchableOpacity>
        </>
      }


    </View>
  );
};

export default SettingScreen;

const styles = StyleSheet.create({});
