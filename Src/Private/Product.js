import {
  Alert,
  FlatList,
  Image,
  Modal,
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
import { ScrollView } from 'react-native-virtualized-view';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { selectToken } from '../Redux/Slices/authSlice';
import { selectProductData } from '../Redux/Slices/productSlice';
import { getProductData } from '../Redux/Slices/productSlice';
import Spinner from 'react-native-loading-spinner-overlay/lib';
import IconD from 'react-native-vector-icons/AntDesign';
const Product = () => {
  const route = useRoute();
  const [refreshing, setRefreshing] = useState(false);
  const { id } = route.params;
  const [modalOpen, setModalOpen] = useState(false)
  const [modalData, setModalData] = useState(null)
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

  const { isLoading } = useSelector(state => state.product);

  const renderItem = ({ item }) => {
    const addUrl = item.image;

    return (
      <TouchableOpacity
        onPress={() => {
          setModalData(item)
          setModalOpen(true)
        }}

      >
        <View style={styles.itemContainer}>
          <Image
            source={{
              uri: `https://rrdecor.wooshelf.com${addUrl}`,
            }}
            style={styles.image1}
          />

          <Text style={styles.text}>{item.product_name}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const MyListItem = ({ item }) => {
    const navigation = useNavigation();
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() => {
          setModalData(null)
          setModalOpen(false)
          navigation.navigate('Searching', {
            item: item,
          })
        }
        }

      >
        <View style={styles.leftContainer}>
          <Text style={styles.title} numberOfLines={3}>
            {item?.item_description}
          </Text>
        </View>
        <View style={styles.rightContainer}>
          <View style={styles.iconContainer}>
            <Image source={require('../Assets/Icons/Chevron1.png')} style={{ width: 10, height: 10 }} />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  // console.log("productDataIs>>>>>",productDataIs[0]?.product_details)
  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      showsVerticalScrollIndicator={false}
      style={{ backgroundColor: '#FFFF' }}>
      <Spinner visible={isLoading} />
      {productDataIs.length === 0 ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            marginTop: '50%'
          }}
        >
          <Image
            source={require('../Assets/Image/norecordfound.png')}
            style={{ width: 120, height: 120 }}
            resizeMode="contain"
          />
        </View>
      ) : (
        <FlatList
          style={{ marginVertical: hp('2%') }}
          data={productDataIs}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          numColumns={2}
          contentContainerStyle={styles.flatListContainer}
        />
      )}


      <Modal
        animationType="slide"
        transparent={true}
        visible={modalOpen}
        onRequestClose={() => {
          setModalData(null)
          setModalOpen(!modalOpen);
        }}>
        <View style={styles.centeredView}>
          <TouchableOpacity
            onPress={() => {
              setModalData(null)
              setModalOpen(!modalOpen)
            }}
            style={styles.modalViewTouch}>
          </TouchableOpacity>

          <View style={styles.modalView}>

            {/* Header with close button */}
            <View style={styles.modalHeader}>
            <TouchableOpacity
                onPress={() => {
                  setModalData(null);
                  setModalOpen(!modalOpen);
                }}
                style={{alignSelf:'center',}}
                >
                {/* <Text>Curtains</Text> */}
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setModalData(null);
                  setModalOpen(!modalOpen);
                }}
                style={{alignSelf:'center',right:wp('5%')}}
                >
                <IconD name="close" size={25} color="#000" />
              </TouchableOpacity>
            </View>
            {/* <Text style={styles.text}>{modalData?.product_details?.length}</Text> */}
            <FlatList
              style={{ marginVertical: hp('2%') }}
              data={modalData?.product_details}
              keyExtractor={item => item?.id}
              renderItem={({ item }) => <MyListItem item={item} />}
            />
          </View>
        </View>
      </Modal>
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
    width: wp('50%'),
    height: hp('30%'),
    borderRadius: 7,
    backgroundColor: '#fff',
    borderColor: '#EAEAEA',
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    // margin: 8,
    justifyContent: 'center',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    // borderWidth:1
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
  centeredView: {
    flex: 1,
    // justifyContent: 'flex-end',
    alignItems: 'center',

    // marginTop: 22,
  },
  modalViewTouch: {
    marginTop: 0,
    backgroundColor: 'rgba(0,0,0,0.2)',

    alignItems: 'center',

    width: '100%',
    height: wp('120')
  },
  modalView: {
    marginBottom: hp('10%'),
    marginTop: 0,
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '100%',
    height: wp('100')
  },
  container: {
    flexDirection: 'row',
    width: '90%',
    backgroundColor: '#fff',
    // borderRadius: 7,
    // borderWidth: 1,
    // borderColor: '#EAEAEA',
    // shadowColor: '#000',
    // shadowOffset: {width: 0, height: 0},
    // shadowOpacity: 0.1,
    // shadowRadius: 5,
    // elevation: 1,
    height: hp('5%'),
    alignSelf: 'center',
    marginTop: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 0.2,
    borderColor: 'gray'
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
    width: 20,
    height: 20,
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
  modalHeader: {
    // flex:1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height:50,
    // backgroundColor:'red',
    width:'100%',
    borderBottomWidth:wp(0.09)
    // padding: 10,
  },
});

 