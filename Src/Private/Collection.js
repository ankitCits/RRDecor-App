import {
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useCallback, useState } from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {ScrollView} from 'react-native-virtualized-view';

const Collection = () => {
  const [refreshing, setRefreshing] = useState(false);
  const data = [
    {id: '1', image: require('../Assets/Image/dec10.png'), text: 'Bonita'},
    {
      id: '2',
      image: require('../Assets/Image/dec4.png'),
      text: 'Bonita Velvet',
    },
    {id: '3', image: require('../Assets/Image/dec9.png'), text: 'Lavinia'},
    {
      id: '4',
      image: require('../Assets/Image/dec1.png'),
      text: 'Lavinia Panel',
    },
    {id: '5', image: require('../Assets/Image/dec7.png'), text: 'Euphoria'},
    {
      id: '6',
      image: require('../Assets/Image/dec11.png'),
      text: 'Euphoria Velvet',
    },
    // Add more items as needed
  ];
  const renderItem = ({item}) => (
    <TouchableOpacity style={styles.itemContainer}>
      <Image source={item.image} style={styles.image1} />
      <Text style={styles.text}>{item.text}</Text>
    </TouchableOpacity>
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      // dispatch(getOrderData(profileData.auth_token));
      setRefreshing(false);
    }, 2000);
  }, []);
  return (
    <ScrollView 
    refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
    }
    style={{backgroundColor: '#fff', flex: 1}}>
      <FlatList
        data={data}
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
    backgroundColor: '#FFFAF4',
    borderColor: '#EAEAEA',
    borderWidth: 1,
    margin: 8,
    // justifyContent: 'center',
    // alignItems: 'center'
  },
  image1: {
    alignSelf: 'center',
    marginTop: 8,
    width: wp('40%'),
    borderRadius: 5,
  },
  text: {
    color: '#000',
    fontSize: 14,

    
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
