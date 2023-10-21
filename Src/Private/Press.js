import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {ScrollView} from 'react-native-virtualized-view';
const Press = () => {
  const data = [
    {id: '1', image: require('../Assets/Image/r1.png'), text: 'Breaking News'},
    {id: '2', image: require('../Assets/Image/r2.png'), text: 'Breaking News'},
    {id: '2', image: require('../Assets/Image/r3.png'), text: 'Breaking News'},
    {id: '2', image: require('../Assets/Image/r4.png'), text: 'Breaking News'},

    // Add more items as needed
  ];
  const renderItem = ({item}) => (
    <TouchableOpacity style={styles.itemContainer}>
      <Image source={item.image} style={styles.image1} />
      <Text style={styles.text}>{item.text}</Text>
    </TouchableOpacity>
  );
  return (
    <ScrollView style={{backgroundColor: '#fff', flex: 1}}>
      <View
        style={{
          width: wp('94%'),
          height: hp('22.3%'),
          borderRadius: 7,
          borderColor: '#EAEAEA',
          backgroundColor: '#fff',
          alignSelf: 'center',
          borderWidth: 1,
          marginTop: hp('2%'),
        }}>
        <Image
          source={require('../Assets/Image/B!.png')}
          style={{
            width: wp('90%'),
            height: hp('18%'),
            borderRadius: 7,
            alignSelf: 'center',
            marginTop: hp('1%'),
          }}
        />
        <Text
          style={{
            fontSize: 13,
            color: '#222222',
            
            textAlign: 'left',
            marginLeft: wp('3%'),
          }}>
          BREAKING| Supreme Court Refuses To Entertain...
        </Text>
      </View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={styles.flatListContainer}
      />
    </ScrollView>
  );
};

export default Press;

const styles = StyleSheet.create({
  itemContainer: {
    width: wp('45%'),
    height: 201,
    borderRadius: 7,
    backgroundColor: '#FFF',
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
