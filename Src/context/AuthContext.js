import React, {createContext, useState, useEffect} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [splashLoading, setSplashLoading] = useState(false);

  //   const register = (
  //     firstName,
  //     lastName,
  //     email,
  //     password,
  //     referalCode,
  //     setError,
  //   ) => {
  //     setIsLoading(true);

  //     axios
  //       .post(`${BASE_URL}/auth/register/email/`, {
  //         first_name: firstName,
  //         last_name: lastName,
  //         email: email,
  //         password: password,
  //         referral: referalCode,
  //       })
  //       .then(res => {
  //         let userInfo = res.data;
  //         setUserInfo(userInfo.data);
  //         AsyncStorage.setItem('userInfo', JSON.stringify(userInfo.data));
  //         setIsLoading(false);
  //       })
  //       .catch(e => {
  //         setIsLoading(false);
  //         setError(`${e.response.data.data.email}`);
  //         console.log(e.response.data.data);
  //       });
  //   };

  const login = () => {
    setIsLoading(true);
    AsyncStorage.setItem('token', '12345');
    setUserInfo({token: '12345'});

    setIsLoading(false);
  };

  const logout = () => {
    AsyncStorage.removeItem('token');
    setUserInfo({});
    setIsLoading(false);
  };

  const isLoggedIn = async () => {
    try {
      setSplashLoading(true);
      let userInfo = await AsyncStorage.getItem('token');
      userInfo = JSON.parse(userInfo);
      if (userInfo) {
        setUserInfo(userInfo);
      }
      setSplashLoading(false);
    } catch (e) {
      setSplashLoading(false);
      console.log(`error logged in ${e}`);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        userInfo,

        login,
        logout,
        splashLoading,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
