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
import {useFocusEffect, useNavigation, useRoute} from '@react-navigation/native';
import {ScrollView} from 'react-native-virtualized-view';
import {getCategoryData} from '../Redux/Slices/categorySlice';
import {useDispatch, useSelector} from 'react-redux';
import {selectToken} from '../Redux/Slices/authSlice';
import {selectCategoryData} from '../Redux/Slices/categorySlice';
import Spinner from 'react-native-loading-spinner-overlay/lib';



const Categories = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [refreshing, setRefreshing] = useState(false);
  const {id} = route?.params;

  const dispatch = useDispatch();
  const profileData = useSelector(selectToken);

  const categoryDataIs = useSelector(selectCategoryData);

  useEffect(() => {
    console.log("^^ AUTH ^^ ",profileData)
    const params = {
      userToken: profileData.auth_token,
      id: id,
    };
    dispatch(getCategoryData(params));
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      const params = {
        userToken: profileData.auth_token,
        id: id,
      };
      dispatch(getCategoryData(params));
      setRefreshing(false);
    }, 2000);
  }, []);

  useFocusEffect(
    useCallback(() => {
      // Fetch data or run any side effect that should only occur when screen is focused
      const params = {
        userToken: profileData.auth_token,
        id: id,
      };
      dispatch(getCategoryData(params));

      // Clean up the side effect when the component is unmounted or the focus is lost
      return () => {
        // Perform any necessary cleanup here
      };
    }, [])
  );

  const {isLoading} = useSelector(state => state.category);

  console.log("^^ categoryDataIs ^^",categoryDataIs)

  const MyListItem = ({item}) => {
    // const navigation = useNavigation();
    const addUrl = item?.category_image;
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() =>
          {
            if(item.sub_category_name == null){
              navigation.navigate('Product', {
                id: item?.id,
              })
            }else{
              navigation.navigate('CategoriesNext', {
                id: item?.id,
              })
            }
          }
  
        }>
        <View style={styles.leftContainer}>
          <Image
            source={{
              uri: `https://rrdecor.wooshelf.com${addUrl}`,
            }}
            style={{width: 110, height: 100, backgroundColor: '#fff',borderRadius:10}}
            resizeMode="cover"
          />
          <Text style={styles.title} numberOfLines={3}>
            {item?.category_name}
          </Text>
        </View>
        <View style={styles.rightContainer}>
          <View style={styles.iconContainer}>
            <Image source={require('../Assets/Icons/Chevron1.png')} />
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <ScrollView 
    refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
    }
    showsVerticalScrollIndicator={false}
    style={{flex: 1, backgroundColor: '#fff'}}>
      <Spinner visible={isLoading} />
      {categoryDataIs.length === 0 ? (
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
          data={categoryDataIs}
          keyExtractor={item => item?.id}
          renderItem={({item}) => <MyListItem item={item} />}
        />
      )}
    </ScrollView>
  );
};

export default Categories;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 7,
    // borderWidth: 1,
    // borderColor: '#EAEAEA',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 1,
    height: hp('15%'),
    alignSelf: 'center',
    marginTop: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftContainer: {
    flexDirection: 'row',
    marginLeft: '2%',
    width: '80%',
    alignItems: 'center',

    height: '100%',
  },
  title: {
    fontSize: wp('3%'),

    color: '#000',
    marginLeft: '5%',
    
    width: '60%',
  },
  rightContainer: {
    backgroundColor: '#FFFFFF',
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#F0F0F0',
    borderWidth: 1,
    marginRight: '2%',
  },
  iconContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
