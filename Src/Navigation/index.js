import React, { useEffect, useState } from 'react';
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import PublicRoute from '../Navigation/public';
import PrivateStack from '../Navigation/private';
import { useSelector, useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { login, selectIsLoggedIn } from '../Redux/Slices/authSlice';
import SplashScreen from '../Private/SplashScreen';
const Navigation = () => {
  const navRef = useNavigationContainerRef();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for saved user credentials in AsyncStorage
    const checkSavedCredentials = async () => {
      try {
        const savedCredentials = await AsyncStorage.getItem('userCredentials');
        if (savedCredentials) {
          // Parse and use saved credentials to log in
          const credentials = JSON.parse(savedCredentials);
          let data = await dispatch(login(credentials));
          if(data?.payload){
            // console.log("data>>",data)
            setLoading(false)
          }
        }
        else {
          setLoading(false)
        }
      } catch (error) {
        // Handle AsyncStorage errors
        console.error('Error reading user credentials from AsyncStorage:', error);
        setLoading(false)
      }
    };

    checkSavedCredentials();
  }, [dispatch]);

  return (
    <NavigationContainer ref={navRef} options={{ headerShown: false }}>
      {loading ?
        <SplashScreen />
        :
        <>
          {isLoggedIn ? <PrivateStack /> : <PublicRoute />}
        </>
      }

    </NavigationContainer>
  );
};

export default Navigation;
