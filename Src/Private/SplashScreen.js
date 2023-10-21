import {View, ActivityIndicator, Image, Text} from 'react-native';
import React from 'react';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';

const SplashScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        // marginTop:'50%'
      }}>
       
      <View
      style={{
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        marginTop:'50%'
      }}
      >
      <Image
        source={require('../Assets/Image/logo3x.png')}
        style={{
          width: widthPercentageToDP('70%'),
          height: heightPercentageToDP('20%'),
        }}
        resizeMode="contain"
      />
       <ActivityIndicator 
       size="small" color={"#000"} 
        />
      </View>
    </View>
  );
};

export default SplashScreen;
