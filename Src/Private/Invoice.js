import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import IconG from 'react-native-vector-icons/EvilIcons';
import IconD from 'react-native-vector-icons/Feather';

import {ScrollView} from 'react-native-virtualized-view';

const Invoice = () => {
  const data = [
    {
      id: '1',
      billToName: 'Aavaran',
      documentNo: 'RI/11-12/00060',
      orderDate: '02/04/2011',
      locationCode: 'OKHLA PH1',
      postingDate: '02/04/2011',
      shipmentDate: '30/05/2011',
      collectionName: '3 items Endless',
    },
    {
      id: '2',
      billToName: 'Anwarr',
      documentNo: 'RI/11-12/00070',
      orderDate: '02/04/2013',
      locationCode: 'OKHLA PV2',
      postingDate: '02/04/2013',
      shipmentDate: '24/05/2013',
      collectionName: '4 items Endless',
    },
    // Add more data objects as needed
  ];

  const renderItem = ({item}) => {
    return (
      // <View
      // style={{
      //   flex:1,
      //   justifyContent:'center',
      //   alignItems:'center',
      //   alignSelf:'center',
      //   marginTop:'50%'
      // }}
      // >
      //  <Image
      //   source={require('../Assets/Image/norecordfound.png')}
      //   style={{width: 120, height: 120}}
      //   resizeMode="contain"
      // />
      // </View>
      <View style={styles.container}>
        <View style={styles.rowContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.titleText}>
              Bill to Name: {item.billToName}
            </Text>
            <Text style={[styles.subTitleText, {marginTop: hp('0.5%')}]}>
              Document No:-{' '}
              <Text style={{}}>{item.documentNo}</Text>
            </Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.rightText}>Order Date</Text>
            <Text style={[styles.titleText, styles.rightText]}>
              {item.orderDate}
            </Text>
          </View>
        </View>

        <View style={[styles.rowContainer, {marginTop: hp('1%')}]}>
          <View style={styles.textContainer}>
            <Text style={styles.subTitleText}>
              Location Code:
              <Text style={{}}>
                {' '}
                {item.locationCode}
              </Text>
            </Text>
            <Text style={styles.subTitleText}>
              Posting Date:{' '}
              <Text style={{}}>{item.postingDate}</Text>
            </Text>
          </View>
          <View style={styles.buttonContainer}>
            {/* <TouchableOpacity
              style={[
                styles.button,
                {backgroundColor: '#D9D9D9', marginRight: wp('1%')},
              ]}>
              <IconG name="eye" size={30} color="black" />
            </TouchableOpacity> */}
            <TouchableOpacity
              style={[styles.button, {backgroundColor: '#292929'}]}>
              <IconD name="download" size={18} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={[styles.rowContainer, {marginTop: hp('1%')}]}>
          <Text style={styles.subTitleText}>
            Shipment Date:{' '}
            <Text style={{}}>{item.shipmentDate}</Text>
          </Text>
          <Text style={styles.subTitleText}>
            Collection name: {item.collectionName}
          </Text>
        </View>
      </View>
    );
  };
  return (
    <ScrollView style={{flex: 1, backgroundColor: '#fff'}}>
      <FlatList
        style={{height: hp('100%')}}
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </ScrollView>
  );
};

export default Invoice;

const styles = StyleSheet.create({
  container: {
    width: wp('90%'),
    backgroundColor: '#fff',
    height: 124,
    borderRadius: 7,
    alignSelf: 'center',
    marginTop: hp('2%'),
    borderColor: '#EAEAEA',
    borderWidth: 1,
    elevation: 5,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: hp('1%'),
    marginLeft: wp('2%'),
    marginRight: wp('2%'),
  },

  textContainer: {
    flex: 1,
  },
  titleText: {
    fontSize: 14,
    
    color: '#000',
  },
  subTitleText: {
    fontSize: 11,
    // fontFamily: 'Poppins-Regular',
    color: '#6A6A6A',
  },
  rightText: {
    fontSize: 11,
    // fontFamily: 'Poppins-Regular',
    color: '#6A6A6A',
    textAlign: 'right',
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  button: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
