import {
    Image,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    TextInput,
    ScrollView,
    Modal,
    FlatList,
    RefreshControl,
    LogBox,
    Platform,
    ActivityIndicator
  } from 'react-native';
  import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
  import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
  
  import { WebView } from 'react-native-webview';
  import { widthPercentageToDP } from 'react-native-responsive-screen';
  
  const TermsScreen = () => {
    const [loading, setLoading] = useState(true);
  
    const handleLoad = () => {
        setLoading(false);
    };
  
  
  
  
  
  
  const isFocused = useIsFocused();
  useEffect(() => {
    LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
    LogBox.ignoreAllLogs();
    if (isFocused) {
      // callCheckLastPayment()
      setStatusBarBackgroundColor('#fff');
    }
  }, [isFocused]);
  
  const setStatusBarBackgroundColor = (color) => {
    if (Platform.OS === 'android') {
      StatusBar.setBarStyle('dark-content');
      StatusBar.setBackgroundColor(color);
    } else if (Platform.OS === 'ios') {
      StatusBar.setBarStyle('dark-content');
      // StatusBar.setBarStyle('default');
    }
  };
  
  
    return (
        <View style={styles.main}>
            <StatusBar barStyle={'dark-content'} />
            <View style={styles.inner1}>
                {/* <HeaderCommon title={'Notebook'} nav={navigation} /> */}
            </View>
            <View style={styles.inner2}>
            {loading ? (
                    <View>
                        <ActivityIndicator size="small" color={'#000'} style={{marginTop:'70%'}}/>
                    </View>
                ) : null}
                    <WebView
                    style={{ marginTop: 0, width: widthPercentageToDP('100'), height: widthPercentageToDP('100'),flex:1 }}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    source={{ uri: `https://www.rrdecor.com/terms-&-conditions.php` }}
                    mediaPlaybackRequiresUserAction={true}
                    onLoad={handleLoad} // Add the onLoad prop here
                />
            </View>
        </View>
    );
  };
  
  export default TermsScreen;
  
  const styles = StyleSheet.create({
    main: {
        flex: 1,
        // backgroundColor: COLORS.white
    },
    inner1: {
        // backgroundColor: COLORS.grey,
        // height:50
        // flex: 2,
        // backgroundColor:'red'
    },
    inner2: {
        backgroundColor: '#fff',
        width: '100%',
        alignSelf: 'center',
        flex:1
    },
    boxView: {
        height: 120,
        width: '95%',
        marginTop: '2%',
        flexDirection: 'row',
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        // Required to prevent clipping on iOS
        elevation: 4,
        borderRadius: 12,
        alignSelf: 'center',
        marginTop: '5%'
    },
    boxInnerImg: {
        // flexDirection: 'row'
        width: '35%',
        // backgroundColor:'green',
        justifyContent: 'center'
    },
    boxInnerText: {
        width: '65%',
        // backgroundColor:'pink',
        padding: 20
    },
    boxImg: {
        width: 110,
        height: 110,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        alignSelf: 'center'
        // borderWidth: 0.6,
        // borderColor: COLORS.red,
        // borderRadius:10
        // marginLeft:10
    },
    innerTextTitle: {
        fontSize: 15,
        fontWeight: '600',
        fontFamily: 'Montserrat',
    },
    innerTextName: {
        fontSize: 12,
        fontWeight: '400',
        fontFamily: 'Montserrat',
        marginTop: '2%'
    }
  
  });
  