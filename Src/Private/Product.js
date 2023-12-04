import {
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {ScrollView} from 'react-native-virtualized-view';
import {useRoute} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {selectToken} from '../Redux/Slices/authSlice';
import {selectProductData} from '../Redux/Slices/productSlice';
import {getProductData} from '../Redux/Slices/productSlice';
import Spinner from 'react-native-loading-spinner-overlay/lib';
const Product = () => {
  const route = useRoute();
  const [refreshing, setRefreshing] = useState(false);
  const {id} = route.params;
  console.log('product is id', id);

  const dispatch = useDispatch();
  const profileData = useSelector(selectToken);

  const productDataIs = useSelector(selectProductData);

  useEffect(() => {
    const params = {
      userToken: profileData.auth_token,
      id: id,
    };
    dispatch(getProductData(params));
  }, []);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      const params = {
        userToken: profileData.auth_token,
        id: id,
      };
      dispatch(getProductData(params));
      setRefreshing(false);
    }, 2000);
  }, []);

  const {isLoading} = useSelector(state => state.product);

  const renderItem = ({item}) => {
    const addUrl = item.image;

    return (
      <View style={styles.itemContainer}>
        <Image
          source={{
            uri: `https://rrdecor.wooshelf.com${addUrl}`,
          }}
          style={styles.image1}
        />
        <Text style={styles.text}>{item.product_name}</Text>
      </View>
    );
  };
  return (
    <ScrollView 
    refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
    }
    showsVerticalScrollIndicator={false}
    style={{backgroundColor: '#FFFF'}}>
      <Spinner visible={isLoading} />
      {productDataIs.length === 0 ? (
       <View
       style={{
         flex:1,
         justifyContent:'center',
         alignItems:'center',
         alignSelf:'center',
         marginTop:'50%'
       }}
       >
        <Image
         source={require('../Assets/Image/norecordfound.png')}
         style={{width: 120, height: 120}}
         resizeMode="contain"
       />
       </View>
      ) : (
        <FlatList
          style={{marginVertical: hp('2%')}}
          data={productDataIs}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          numColumns={2}
          contentContainerStyle={styles.flatListContainer}
        />
      )}
    </ScrollView>
  );
};

export default Product;

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
    height: hp('30%'),
    borderRadius: 7,
    backgroundColor: '#fff',
    borderColor: '#EAEAEA',
    // borderWidth: 1,
    margin: 8,
    // justifyContent: 'center',
    // alignItems: 'center'
    justifyContent: 'space-evenly',
    alignItems:'center'
  },
  image1: {
    alignSelf: 'center',
    marginTop: 8,
    width: 100,
    borderRadius: 5,
    height: 150,
  },
  text: {
    color: '#000',
    fontSize: wp('3%'),
    fontWeight: '400',
    marginTop: 4,
    marginLeft: wp('2%'),

    
  },

  flatListContainer: {
    justifyContent: 'space-around',
    width: wp('98%'),
    paddingHorizontal: 0,
    paddingTop: 2,
  },
});
