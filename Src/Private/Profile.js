import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import IconG from 'react-native-vector-icons/FontAwesome';
import IconM from 'react-native-vector-icons/Zocial';
import IconL from 'react-native-vector-icons/Ionicons';
import {ScrollView} from 'react-native-virtualized-view';
import {useSelector} from 'react-redux';
import {selectToken} from '../Redux/Slices/authSlice';
const Profile = () => {
  const profileData = useSelector(selectToken);
  console.log('user data is ', profileData);
  return (
    <ScrollView style={{backgroundColor: '#fff', flex: 1}}>
      {/* <Text
        style={{
          color: '#153F5E',
          fontSize: 14,

          textAlign: 'right',
          marginRight: wp('2%'),
          marginVertical: hp('1%'),
          fontFamily: 'Poppins-Regular',
        }}>
        Edit Profile
      </Text> */}
      <Image
        source={require('../Assets/Image/user.png')}
        style={{
          width: wp('20%'),
          height: wp('20%'),
          borderRadius: wp('15%'),
          alignSelf: 'center',
          marginVertical: hp('1%'),
        }}
      />
      <Text
        style={{
          color: '#222222',
          fontSize: 18,
          
          textAlign: 'center',
          marginVertical: hp('1%'),
        }}>
        {profileData.userData.name}
      </Text>
      <View style={styles.container}>
        <View style={styles.iconContainer}>
          <IconG name="user" size={25} color="#153F5E" />
        </View>
        <Text style={styles.text}>{profileData.userData.name}</Text>
      </View>
      <View style={styles.container}>
        <View style={styles.iconContainer}>
          <IconM name="email" size={25} color="#153F5E" />
        </View>
        <Text style={styles.text}>{profileData.userData.email}</Text>
      </View>
      {profileData.userData.city && (
        <View style={styles.container}>
          <View style={styles.iconContainer}>
            <IconL name="location-sharp" size={25} color="#153F5E" />
          </View>
          <Text style={styles.text}>{profileData.userData.city}</Text>
        </View>
      )}
      {profileData.userData.mobile_no && (
        <View style={styles.container}>
          <View style={styles.iconContainer}>
            <IconG name="mobile-phone" size={25} color="#153F5E" />
          </View>
          <Text style={styles.text}>{profileData.userData.mobile_no}</Text>
        </View>
      )}
      {profileData.userData.state && (
        <View style={styles.container}>
          <View style={styles.iconContainer}>
            <IconL name="globe-outline" size={25} color="#153F5E" />
          </View>
          <Text style={styles.text}>{profileData.userData.state}</Text>
        </View>
      )}
      {profileData.userData.company && (
        <View style={styles.container}>
          <View style={styles.iconContainer}>
            <IconL name="globe-outline" size={25} color="#153F5E" />
          </View>
          <Text style={styles.text}>{profileData.userData.company}</Text>
        </View>
      )}
    </ScrollView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    width: wp('90%'),
    height: hp('7%'),
    alignSelf: 'center',
    flexDirection: 'row',
    marginTop: hp('2%'),
    alignItems: 'center',
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
        // elevation: 1,
      },
    }),
    borderColor: '#EEE',
    borderWidth: 1,
    bottom:5
  },
  iconContainer: {
    width: 48,
    height: 46,
    borderRadius: 9,
    backgroundColor: '#E3EFF8',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: wp('3%'),
  },
  icon: {
    fontSize: 28,
    color: '#153F5E',
  },
  text: {
    fontSize: 14,
    color: '#000',
    
    marginLeft: wp('2%'),
  },
});
