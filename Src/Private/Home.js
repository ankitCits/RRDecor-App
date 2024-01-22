import {
  Dimensions,
  FlatList,
  Image,
  RefreshControl,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import SwiperFlatList from 'react-native-swiper-flatlist';
import { ScrollView } from 'react-native-virtualized-view';
import { getCollectionData } from '../Redux/Slices/collectionSlice';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectToken } from '../Redux/Slices/authSlice';
import { BASE_URL } from '../conifg';
import Spinner from 'react-native-loading-spinner-overlay/lib';
import { getBannerData, selectBannerData } from '../Redux/Slices/bannerSlice';
const Home = () => {
  const [windowWidth, setWindowWidth] = useState(Dimensions.get('window').width);
  const [windowHeight, setWindowHeight] = useState(Dimensions.get('window').height);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const profileData = useSelector(selectToken);
  const [refreshing, setRefreshing] = useState(false);
  // const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);
  const { isLoading, error, collectionData } = useSelector(
    state => state.collection,
  );

  const { isBannerLoading, bannerError } = useSelector(state => state.banner);

  const [currentIndex, setCurrentIndex] = React.useState(0);
  const bannerData = useSelector(selectBannerData);

  useEffect(() => {
    dispatch(getCollectionData(profileData.auth_token));
    dispatch(getBannerData());
  }, []);




  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      dispatch(getCollectionData(profileData.auth_token));
      dispatch(getBannerData());
      setRefreshing(false);
    }, 2000);
  }, []);
  // const renderPagination = () => {
  //   return (
  //     <View style={styles.paginationContainer}>
  //       {bannerData.map((_, index) => (
  //         <View
  //           key={index}
  //           style={[
  //             styles.paginationDot,
  //             index === currentIndex
  //               ? { backgroundColor: '#153F5E' }
  //               : { backgroundColor: 'gray' },
  //           ]}
  //         />
  //       ))}
  //     </View>
  //   );
  // };

  const data = [
    {
      key: '7',

      image: require('../Assets/Image/EssentialsLogo.png'),
      width: 120,
      height: 30.4
      // image: require('../Assets/Image/VersaceLogo.png'),
      // width: 78.13,
    },
    {
      key: '1',
      image: require('../Assets/Image/ArezzoLogo.png'),
      height: 48,
      width: 80
    },


    // {
    //   key: '6',
    //   image: require('../Assets/Image/RRDecorLogo.png'),
    //   width: 401.79,
    //   // image: require('../Assets/Image/Sketch23Logo.png'),
    //   // width: 125.42,
    // },
  ];

  const data2 = [
    {
      key: '4',
      image: require('../Assets/Image/RasayaLogo.png'),
      height: 55.28,
      width: 80
    },
    {
      key: '3',
      image: require('../Assets/Image/PersanLogo.png'),
      height: 52.95,
      width: 75
    },
    {
      key: '2',
      image: require('../Assets/Image/VersaceLogo.png'),
      height: 51.2,
      width: 80
    },
    // {
    //   key: '5',
    //   image: require('../Assets/Image/Sketch23Logo.png'),
    //   width: 39.87,
    // },




    // {
    //   key: '6',
    //   image: require('../Assets/Image/RRDecorLogo.png'),
    //   width: 401.79,
    //   // image: require('../Assets/Image/Sketch23Logo.png'),
    //   // width: 125.42,
    // },
  ];


  const renderItemLogo = ({ item }) => {
    return (
      <View style={{ padding: 5, marginLeft: 10, justifyContent: 'center', alignSelf: 'center' }}>
        <Image
          source={item.image}
          style={{ height: item.height, width: item.width, }}
        />
      </View>

    );
  };

  const renderItem = ({ item }) => {
    const addUrl = item?.homepage_name_image;

    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() =>
          navigation.navigate('Categories', {
            id: item.id,
          })
        }>
        <Image
          source={{
            uri: `https://rrdecor.wooshelf.com${addUrl}`,
          }}
          style={styles.image1}
          resizeMode="contain"
        />
        <Text style={styles.text}>{item?.homepage_name}</Text>
      </TouchableOpacity>
    );
  };


  const renderPagination = () => (
    <View style={styles.pagination}>
      {bannerData.map((_, index) => (
        <View
          key={index}
          style={[styles.dot, index === currentIndex ? styles.activeDot : null]}
        />
      ))}
    </View>
  );

  const handlePaginationPress = (index) => {
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({ index, animated: true });
    }
  };

  const renderItemPag = ({ item }) => (
    <View style={styles.child}>
      <Image
        source={{ uri: `https://rrdecor.wooshelf.com${item.banner_image}` }}
        style={styles.image}
        resizeMode="cover"
      />
    </View>
  );




  console.log("^^ collectionData ^^", collectionData)
  

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>

      <StatusBar
        backgroundColor="white"
        barStyle={'dark-content'}
      />
      {/* <Spinner visible={isLoading || isBannerLoading} /> */}
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }

        showsVerticalScrollIndicator={false}
        style={{ backgroundColor: '#fff', marginTop: '0%' }}>
        <View
          style={{
            height: hp('7%'),
            backgroundColor: '#fff',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderColor: '#DADADA',
            borderBottomWidth: 1,
          }}>
          <TouchableOpacity
            style={{
              // backgroundColor:'red',
              height: '100%',
              width: 50,
              justifyContent: 'center'
            }}
            onPress={() => navigation.toggleDrawer()}>
            <Image
              source={require('../Assets/Icons/menu.png')}
              style={{ marginLeft: wp('4%') }}
              resizeMode="contain"
            />
          </TouchableOpacity>

          <Text
            style={{
              fontSize: 18,
              color: '#000',
              fontWeight: '500',
              marginLeft: wp('6%'),

            }}>
            Home
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginRight: wp('3%'),
              // backgroundColor:'red',
              height: '100%',
              width: 75,
              justifyContent: 'space-between'
            }}>
            <TouchableOpacity

              onPress={() => navigation.navigate('Shop')}>
              {profileData?.userData?.email != "help@rrdecor.com" &&
                <Image
                  source={require('../Assets/Icons/store.png')}
                  style={{ marginRight: wp('3%') }}
                  resizeMode="contain"
                />
              }

            </TouchableOpacity>
            {profileData?.userData?.email != "help@rrdecor.com" ?
            
            <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <Image
              source={require('../Assets/Icons/user.png')}
              resizeMode="contain"
            />
          </TouchableOpacity>

          :
          <TouchableOpacity 
          style={{
            width: windowWidth * 0.07,
            // backgroundColor: '#000',
            alignItems: 'center',
            justifyContent: 'center',
            height: windowWidth * 0.07,
            borderRadius: windowWidth * 0.02,
          }}
          onPress={()=>dispatch(logout())}>
           <Image
              source={require('../Assets/Icons/user.png')}
              resizeMode="contain"
            />
        </TouchableOpacity>
            }

          </View>
        </View>

        <View style={styles.container}>
          {/* <SwiperFlatList
            // autoplay
            // autoplayDelay={3}
            // autoplayLoop
            index={currentIndex}
            showPagination
            PaginationComponent={renderPagination}
            data={bannerData}
            keyExtractor={item => item.id}
            renderItem={({ item }) => {
              const addUrl = item.banner_image;
              console.log("^^ addUrl ^^", addUrl)
              return (
                <View style={styles.child}>
                  <Image
                    source={{ uri: `https://rrdecor.wooshelf.com${addUrl}` }}
                    style={styles.image}
                    resizeMode="cover"
                  />
                </View>
              );
            }}
            onChangeIndex={({ index }) => setCurrentIndex(index)}
          /> */}

          <View
            style={[styles.logoInner,]}
          >
            <Image
              source={require('../Assets/Image/RRDecorLogo.png')}
              style={{ height: 14.93, width: 120, }}
            />
          </View>

          <FlatList
            ref={flatListRef}
            data={bannerData}
            renderItem={renderItemPag}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            snapToInterval={Dimensions.get('window').width}
            decelerationRate="fast"
          />
          {renderPagination()}
        </View>

        <View style={styles.containers}>


          <View
            style={styles.logoInner}
          >
            <FlatList
              data={data}
              renderItem={renderItemLogo}
              keyExtractor={(item) => item.key}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </View>

          <View
            style={styles.logoInner}
          >
            <FlatList
              data={data2}
              renderItem={renderItemLogo}
              keyExtractor={(item) => item.key}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </View>



          <View
            style={[styles.logoInner,]}
          >
            <Image
              source={require('../Assets/Image/Sketch23Logo.png')}
              style={{ height: 47.84, width: 120, }}
            />
          </View>

        </View>

        <Text
          style={{
            color: '#000',
            backgroundColor: '#fff',
            height: hp('5%'),
            width: wp('100%'),
            fontSize: 24,
            fontWeight: '500',
            paddingLeft: wp('4%'),
            paddingTop: hp('1%'),
            textAlign: 'center'

          }}>
          Collections
        </Text>

        <View
          style={{
            flex: 1,
            // backgroundColor:'red',
            alignItems: 'center',
            marginBottom:'8%'
          }}
        >
          <FlatList
            data={collectionData}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            numColumns={2}
            contentContainerStyle={styles.flatListContainer}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;
const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    width: wp('100%'),
    backgroundColor: 'white',
    height: hp('28%'),
    alignSelf: 'center',
  },
  child: { width, justifyContent: 'center', alignItems: 'center' },

  image: {
    width: 350,
    height: 175,
    borderRadius: 10
  },
  itemContainer: {
    width: wp('50%'),
    height: hp('25%'),
    borderRadius: 7,
    // backgroundColor: 'red',
    borderColor: '#EAEAEA',
    borderWidth: 0.5,
    margin: 0,
    // justifyContent: 'center',
    // alignItems: 'center'
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginBottom: 0,
    // alignItems:'center'
  },
  image1: {
    alignSelf: 'center',
    marginTop: 8,
    width: 100,
    // borderRadius: 5,
    height: 150,
  },
  text: {
    color: '#000',
    // fontSize: 1,
    fontWeight: '400',
    marginTop: 4,
    marginLeft: wp('2%'),
    fontSize: wp('3%'),
    // backgroundColor:'red',
    width: '75%',
    textAlign: 'center'
  },
  paginationContainer: {
    position: 'absolute',
    bottom: 12,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  paginationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  flatListContainer: {
    justifyContent: 'space-around',
    width: wp('98%'),
    paddingHorizontal: 0,
    paddingTop: 2,
  },
  containers: {
    flex: 1,
    justifyContent: 'center',
    padding: 10,
    // flexDirection: 'row',
    // marginLeft:10
    // backgroundColor: '#ecf0f1',
  },
  logoInner: {
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor:'red'
  }
  // image: {
  //   width: 50,
  //   height: 50,
  //   margin: 5,
  //   padding:10
  // },
});
