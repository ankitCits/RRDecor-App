import {
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {ScrollView} from 'react-native-virtualized-view';
import { useNavigation } from '@react-navigation/native';
import { BASE_URL } from '../conifg';
import Spinner from 'react-native-loading-spinner-overlay/lib';

const Collection = () => {
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const [disData, setDisData] = useState([])
  const [loader, setLoader] = useState(true)

  const renderItem = ({item}) => (
    <TouchableOpacity style={styles.itemContainer}>
      <Image source={{uri:`https://rrdecor.wooshelf.com${item.image}`}} style={styles.image1} />
      <Text style={styles.text}>{item.title}</Text>
    </TouchableOpacity>
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      // dispatch(getOrderData(profileData.auth_token));
      setRefreshing(false);
    }, 2000);
  }, []);


  useEffect(() => {
    // Listen for navigation changes
    const unsubscribe = navigation.addListener('focus', () => {
      getDiscontinue();
    });

    // Clean up the listener when the component unmounts
    return unsubscribe;
  }, [navigation]);


  const getDiscontinue = ()=>{
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    
    fetch(`${BASE_URL}/discontinue-list`, requestOptions)
      .then(response => response.json())
      .then(result => {
        setDisData(result?.response)
        setLoader(false)
        console.log(result?.response)})
      .catch(error => {
        setLoader(false)
        console.log('error', error)});
  }
  return (
    <ScrollView 
    refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
    }
    style={{backgroundColor: '#fff', flex: 1}}>
      <Spinner visible={loader} />
      <FlatList
        data={disData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        contentContainerStyle={styles.flatListContainer}
      />
    </ScrollView>
  );
};

export default Collection;

const styles = StyleSheet.create({
  container: {
    width: wp('100%'),
    backgroundColor: 'white',
    height: hp('28%'),
    alignSelf: 'center',
  },

  image: {
    width: wp('90%'),
    height: hp('20%'),
  },
  itemContainer: {
    width: wp('45%'),
    height: 201,
    borderRadius: 7,
    // backgroundColor: '#FFFAF4',
    // borderColor: '#EAEAEA',
    // borderWidth: 1,
    margin: 8,
    // justifyContent: 'center',
    // alignItems: 'center'
  },
  image1: {
    alignSelf: 'center',
    marginTop: 8,
    width: wp('40%'),
    borderRadius: 5,
    height:160,
    width:140
  },
  text: {
    color: '#000',
    fontSize: 12,

    
    marginTop: 4,
    marginTop: wp('2%'),
    textAlign:'center'
  },

  flatListContainer: {
    justifyContent: 'space-around',
    width: wp('98%'),
    paddingHorizontal: 0,
    paddingTop: 2,
  },
});
