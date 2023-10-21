import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MyDrawer from './drawer';
import Home from '../Private/Home';
import About from '../Private/About';
import IconG from 'react-native-vector-icons/MaterialIcons';
import Categories from '../Private/Categories';
import Product from '../Private/Product';
import Searching from '../Private/Searching';
// import Shopcart from '../Private/ShopCart';
import Shop from '../Private/Shop';
import Shiping from '../Private/Shiping';
import Addship from '../Private/Addship';
import Sucess from '../Private/Sucess';
import Shopcart from '../Private/Shopcart';
import LedgerDetail from '../Private/LedgerDetail';
import CategoriesNext from '../Private/CategoriesNext';
function PrivateStack() {
  const Stack = createNativeStackNavigator();

  const horizontalAnimation = {
    gestureDirection: 'horizontal',
    cardStyleInterpolator: ({ current, layouts }) => {
      return {
        cardStyle: {
          transform: [
            {
              translateX: current.progress.interpolate({
                inputRange: [0, 1],
                outputRange: [layouts.screen.width, 0],
              }),
            },
          ],
        },
      };
    },
  };
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: 'transparent' },
              cardOverlayEnabled: true,
              ...horizontalAnimation,
        drawerStyle: {
          backgroundColor: '#fff',
          width: '60%',
        },
      }}
      initialRouteName="Drawer">
      <Stack.Screen name="Drawer" component={MyDrawer} />
      {/* <Stack.Screen name="Home" component={Home} /> */}
      <Stack.Screen
      
        name="Categories"
        component={Categories}
        options={{
          headerBackTitleVisible: false, 
          headerShown: true,
          headerBackImage: () => (
            <IconG name="chevron-left" color="grey" size={26} />
          ),
          headerTitle: 'Categories',
          headerTitleAlign: 'center',
          headerTintColor: '#000',
          headerShown: true,

          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTitleStyle: {
            
          },
        }}
      />

    <Stack.Screen
        name="CategoriesNext"
        component={CategoriesNext}
        options={{
          headerBackTitleVisible: false, 
          headerShown: true,
          headerBackImage: () => (
            <IconG name="chevron-left" color="grey" size={26} />
          ),
          headerTitle: 'Sub Categories',
          headerTitleAlign: 'center',
          headerTintColor: '#000',
          headerShown: true,

          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTitleStyle: {
            
          },
        }}
      />

      <Stack.Screen
        name="Product"
        component={Product}
        options={{
          headerBackTitleVisible: false, 
          headerShown: true,
          headerBackImage: () => (
            <IconG name="chevron-left" color="grey" size={26} />
          ),
          headerTitle: 'Products',
          headerTitleAlign: 'center',
          headerTintColor: '#000',
          headerShown: true,

          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTitleStyle: {
            
          },
        }}
      />
      <Stack.Screen
        name="Searching"
        component={Searching}
        options={{
          headerBackTitleVisible: false, 
          headerShown: true,
          headerBackImage: () => (
            <IconG name="chevron-left" color="grey" size={26} />
          ),
          headerTitle: 'Collection',
          headerTitleAlign: 'center',
          headerTintColor: '#000',
          headerShown: true,

          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTitleStyle: {
            
          },
        }}
      />
      <Stack.Screen
        name="Shop"
        component={Shop}
        options={{
          headerBackTitleVisible: false, 
          headerShown: true,
          headerBackImage: () => (
            <IconG name="chevron-left" color="grey" size={26} />
          ),
          headerTitle: 'Shoping Cart',
          headerTitleAlign: 'center',
          headerTintColor: '#000',
          headerShown: true,

          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTitleStyle: {
            
          },
        }}
      />

      <Stack.Screen
        name="LedgerDetail"
        component={LedgerDetail}
        options={{
          headerBackTitleVisible: false, 
          headerShown: true,
          headerBackImage: () => (
            <IconG name="chevron-left" color="grey" size={26} />
          ),
          headerTitle: 'Ledger Details',
          headerTitleAlign: 'center',
          headerTintColor: '#000',
          headerShown: true,

          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTitleStyle: {
            
          },
        }}
      />
      <Stack.Screen
        name="Ship"
        component={Shiping}
        options={{
          headerBackTitleVisible: false, 
          headerShown: true,
          headerBackImage: () => (
            <IconG name="chevron-left" color="grey" size={26} />
          ),
          headerTitle: 'Shipping Addresses',
          headerTitleAlign: 'center',
          headerTintColor: '#000',
          headerShown: true,

          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTitleStyle: {
            
          },
        }}
      />
      <Stack.Screen
        name="Addship"
        component={Addship}
        options={{
          headerBackTitleVisible: false, 
          headerShown: true,
          headerBackImage: () => (
            <IconG name="chevron-left" color="grey" size={26} />
          ),
          headerTitle: 'Adding Shipping Address',
          headerTitleAlign: 'center',
          headerTintColor: '#000',
          headerShown: true,

          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTitleStyle: {
            
          },
        }}
      />
      <Stack.Screen name="Sucess" component={Sucess} />
      <Stack.Screen
        name="Shopcart"
        component={Shopcart}
        options={{
          headerBackTitleVisible: false, 
          headerShown: true,
          headerBackImage: () => (
            <IconG name="chevron-left" color="grey" size={26} />
          ),
          headerTitle: 'Shopping Cart',
          headerTitleAlign: 'center',
          headerTintColor: '#000',
          headerShown: true,

          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTitleStyle: {
            
          },
        }}
      />
    </Stack.Navigator>
  );
}
export default PrivateStack;
