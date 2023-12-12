import React from 'react';

import { createDrawerNavigator } from '@react-navigation/drawer';

import { Alert, Image, TouchableOpacity } from 'react-native';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { DrawerActions } from '@react-navigation/native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { View } from 'react-native';
import { Text } from 'react-native';

import Profile from '../Private/Profile';
import CustomDrawers from './custom';
import Home from '../Private/Home';
import About from '../Private/About';
import IconG from 'react-native-vector-icons/MaterialIcons';
import Collection from '../Private/Collection';
import Press from '../Private/Press';
import Setting from '../Private/Setting';
import Invoice from '../Private/Invoice';
import Search from '../Private/Search';
import Ledge from '../Private/Ledge';
import Contact from '../Private/Contact';
import { logout, selectToken } from '../Redux/Slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import OrderHistory from '../Private/OrderHistory';

const Drawer = createDrawerNavigator();

function MyDrawer() {
  const profileData = useSelector(selectToken);
  const dispatch = useDispatch();
  console.log('user data is ', profileData);
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
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={props => <CustomDrawers {...props} />}
      screenOptions={{ headerShown: false }}>

        {profileData?.userData?.email != "help@rrdecor.com" && 
        
        <Drawer.Screen
        name="Profile"
        component={Profile}
        options={({ navigation }) => ({
          drawerActiveBackgroundColor: '#FFFF',
          drawerIcon: ({ color }) => (
            <View
              style={{
                marginTop: hp('2%'),
                flexDirection: 'row',
                marginBottom: hp('3%'),
              }}>
              <Image
                source={require('../Assets/Image/user.png')}
                style={{ width: 65, height: 65, borderRadius: 33 }}
              />
              <View
                style={{
                  flexDirection: 'column',
                  marginLeft: wp('3%'),
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    color: '#000',
                    fontSize: 18,


                  }}>
                  {profileData.userData.name}
                </Text>
                <TouchableOpacity>
                  <Text
                    style={{
                      color: '#707070',
                      fontSize: 13,


                    }}>
                    {profileData.userData.email}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ),
          headerShown: true,
          headerTitle: 'Profile',
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
              style={{ paddingLeft: 10, backgroundColor: '#fff', height: '100%', width: 50, justifyContent: 'center' }}>
              <IconG name="chevron-left" size={30} color="black" />
            </TouchableOpacity>
          ),
          headerTitleAlign: 'center',
        })}
      />
        }

      <Drawer.Screen
        name="Home"
        component={Home}
        options={{
          drawerActiveBackgroundColor: '#FFFF',
          drawerActiveTintColor: '#000000',
          drawerInactiveTintColor: '#000000',
          drawerLabelStyle: {

          },
          headerTitleStyle: {

          },
        }}
      />
      <Drawer.Screen
        name="Search Stock"
        component={Search}
        options={({ navigation }) => ({
          headerShown: true,
          drawerActiveBackgroundColor: '#FFFF',
          drawerActiveTintColor: '#000000',
          drawerInactiveTintColor: '#000000',

          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
              style={{ paddingLeft: 10, backgroundColor: '#fff', height: '100%', width: 50, justifyContent: 'center' }}>
              <IconG name="chevron-left" size={30} color="black" />
            </TouchableOpacity>
          ),
          headerTitleAlign: 'center',
          headerTitle: 'Search',
          drawerLabelStyle: {

          },
          headerTitleStyle: {

          },
        })}
      />

      {profileData?.userData?.email != "help@rrdecor.com" &&
      
      <Drawer.Screen
      name="Order History"
      component={OrderHistory}
      options={({ navigation }) => ({
        headerShown: true,
        drawerActiveBackgroundColor: '#FFFF',
        drawerActiveTintColor: '#000000',
        drawerInactiveTintColor: '#000000',

        headerLeft: () => (
          <TouchableOpacity
            onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
            style={{ paddingLeft: 10, backgroundColor: '#fff', height: '100%', width: 50, justifyContent: 'center' }}>
            <IconG name="chevron-left" size={30} color="black" />
          </TouchableOpacity>
        ),
        headerTitleAlign: 'center',
        drawerLabelStyle: {

        },
        headerTitleStyle: {

        },
      })}
    />
      }



      <Drawer.Screen
        name="Collection"
        component={Collection}
        options={({ navigation }) => ({
          headerShown: true,
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
              style={{ paddingLeft: 10, backgroundColor: '#fff', height: '100%', width: 50, justifyContent: 'center' }}>
              <IconG name="chevron-left" size={30} color="black" />
            </TouchableOpacity>
          ),
          headerTitle: 'Discontinued Collections',
          headerTitleStyle: { textAlign: 'center', fontSize: 17 },
          drawerActiveBackgroundColor: '#FFFF',
          drawerActiveTintColor: '#000000',
          drawerInactiveTintColor: '#000000',
          drawerLabel: 'Discontinued Collections',
          headerTitleAlign: 'center',
          drawerLabelStyle: {

          },
          headerTitleStyle: {

          },
        })}
      />

      {/* <Drawer.Screen
        name="Invoice"
        component={Invoice}
        options={({navigation}) => ({
          headerShown: true,
          drawerActiveBackgroundColor: '#FFFF',
          drawerActiveTintColor: '#000000',
          drawerInactiveTintColor: '#000000',

          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
              style={{paddingLeft: 10,backgroundColor:'#fff',height:'100%',width:50,justifyContent:'center'}}>
              <IconG name="chevron-left" size={30} color="black" />
            </TouchableOpacity>
          ),
          headerTitleAlign: 'center',
          drawerLabelStyle: {
            
          },
          headerTitleStyle: {
            
          },
        })}
      /> */}

      {profileData?.userData?.email != "help@rrdecor.com" &&
      
      <Drawer.Screen
      name="Legder"
      component={Ledge}
      options={({navigation}) => ({
        headerShown: true,
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
            style={{paddingLeft: 10,backgroundColor:'#fff',height:'100%',width:50,justifyContent:'center'}}>
            <IconG name="chevron-left" size={30} color="black" />
          </TouchableOpacity>
        ),
        headerTitle: 'Ledger',
        headerTitleStyle: {textAlign: 'center', fontSize: 17},
        drawerActiveBackgroundColor: '#FFFF',
        drawerActiveTintColor: '#000000',
        drawerInactiveTintColor: '#000000',

        headerTitleAlign: 'center',
        drawerLabelStyle: {
          
        },
        headerTitleStyle: {
          
        },
      })}
    />
      }



      <Drawer.Screen
        name="Contact"
        component={Contact}
        options={({ navigation }) => ({
          headerShown: true,
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
              style={{ paddingLeft: 10, backgroundColor: '#fff', height: '100%', width: 50, justifyContent: 'center' }}>
              <IconG name="chevron-left" size={30} color="black" />
            </TouchableOpacity>
          ),
          headerTitle: 'Contact Us',
          headerTitleStyle: { textAlign: 'center', fontSize: 17 },
          drawerActiveBackgroundColor: '#FFFF',
          drawerActiveTintColor: '#000000',
          drawerInactiveTintColor: '#000000',

          headerTitleAlign: 'center',
          drawerLabelStyle: {

          },
          headerTitleStyle: {

          },
        })}
      />
      {/* <Drawer.Screen
        name="Press Release"
        component={Press}
        options={({navigation}) => ({
          headerShown: true,
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
              style={{paddingLeft: 10,backgroundColor:'#fff',height:'100%',width:50,justifyContent:'center'}}>
              <IconG name="chevron-left" size={30} color="black" />
            </TouchableOpacity>
          ),
          headerTitle: 'Press Release',
          headerTitleStyle: {textAlign: 'center', fontSize: 17},
          drawerActiveBackgroundColor: '#FFFF',
          drawerActiveTintColor: '#000000',
          drawerInactiveTintColor: '#000000',

          headerTitleAlign: 'center',
          drawerLabelStyle: {
            
          },
          headerTitleStyle: {
            
          },
        })}
      /> */}
      <Drawer.Screen
        name="Setting"
        component={Setting}
        options={({navigation}) => ({
          headerShown: true,
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
              style={{paddingLeft: 10,backgroundColor:'#fff',height:'100%',width:50,justifyContent:'center'}}>
              <IconG name="chevron-left" size={30} color="black" />
            </TouchableOpacity>
          ),
          headerTitle: 'Setting',
          headerTitleStyle: {textAlign: 'center', fontSize: 17},
          drawerActiveBackgroundColor: '#FFFF',
          drawerActiveTintColor: '#000000',
          drawerInactiveTintColor: '#000000',

          headerTitleAlign: 'center',
          drawerLabelStyle: {
            
          },
          headerTitleStyle: {
            
          },
        })}
      />

{/* <Drawer.Screen
        name="About"
        component={About}
        options={({ navigation }) => ({
          headerShown: true,
          drawerActiveBackgroundColor: '#FFFF',
          drawerActiveTintColor: '#000000',
          drawerInactiveTintColor: '#000000',

          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
              style={{ paddingLeft: 10, backgroundColor: '#fff', height: '100%', width: 50, justifyContent: 'center' }}>
              <IconG name="chevron-left" size={30} color="black" />
            </TouchableOpacity>
          ),
          headerTitleAlign: 'center',
          headerTitleStyle: {

          },
          drawerLabelStyle: {

          },
        })}
      /> */}

{/* <Drawer.Screen
  name="Logout"
  options={({ navigation }) => ({
    drawerLabel: 'Logout',
    drawerIcon: ({ color }) => (
      <IconG name="exit-to-app" size={30} color={color} />
    ),
    headerShown: true,
    headerLeft: () => (
      <TouchableOpacity onPress={() => handleLogout(navigation)}>
        <View style={{ flexDirection: 'row', alignItems: 'center', padding: 16 }}>
          <Text style={{ fontSize: 16, marginRight: 8 }}>Logout</Text>
        </View>
      </TouchableOpacity>
    ),
    headerTitleAlign: 'center',
    headerTitleStyle: {},
    drawerLabelStyle: {},
  })}
/> */}

    </Drawer.Navigator>
  );
}

export default MyDrawer;
