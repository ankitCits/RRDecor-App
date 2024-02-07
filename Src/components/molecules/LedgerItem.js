import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import IconG from 'react-native-vector-icons/EvilIcons';
import IconD from 'react-native-vector-icons/Feather';

const LedgerItem = ({ item }) => {
  // return (
  //   <View style={styles.container}>
  //     <View style={styles.rowContainer}>
  //       <View style={styles.textContainer}>
  //         <Text style={styles.titleText}>
  //           Bill to Name: {item.billing_address}
  //         </Text>
  //         <Text style={[styles.subTitleText, {marginTop: hp('0.5%')}]}>
  //           Document No:-{' '}
  //           <Text style={{fontFamily: 'Poppins-Bold'}}>
  //             {item.billing_address}
  //           </Text>
  //         </Text>
  //       </View>
  //       <View style={styles.textContainer}>
  //         <Text style={styles.rightText}>Order Date</Text>
  //         <Text style={[styles.titleText, styles.rightText]}>
  //           {item.order_date}
  //         </Text>
  //       </View>
  //     </View>

  //     <View style={[styles.rowContainer, {marginTop: hp('1%')}]}>
  //       <View style={styles.textContainer}>
  //         <Text style={styles.subTitleText}>
  //           Location Code:
  //           <Text style={{fontFamily: 'Poppins-Bold'}}>
  //             {' '}
  //             {item.billing_address}
  //           </Text>
  //         </Text>
  //         <Text style={styles.subTitleText}>
  //           Posting Date:{' '}
  //           <Text style={{fontFamily: 'Poppins-Bold'}}>{item.posting_date}</Text>
  //         </Text>
  //       </View>
  //       <View style={styles.buttonContainer}>
  //         <TouchableOpacity
  //           style={[
  //             styles.button,
  //             {backgroundColor: '#D9D9D9', marginRight: wp('1%')},
  //           ]}>
  //           <IconG name="eye" size={30} color="black" />
  //         </TouchableOpacity>
  //         <TouchableOpacity
  //           style={[styles.button, {backgroundColor: '#292929'}]}>
  //           <IconD name="download" size={18} color="#fff" />
  //         </TouchableOpacity>
  //       </View>
  //     </View>

  //     <View style={[styles.rowContainer, {marginTop: hp('1%')}]}>
  //       <Text style={styles.subTitleText}>
  //         Shipment Date:{' '}
  //         <Text style={{fontFamily: 'Poppins-Bold'}}>{item.shipment_date}</Text>
  //       </Text>
  //       <Text style={styles.subTitleText}>
  //         Collection name: {item.billing_address}
  //       </Text>
  //     </View>
  //   </View>
  // );
  const date = item.order_date;
  const filteredDate = date;
  console.log('filtered date is', filteredDate);
  const day = filteredDate;
  function formatDate(inputDate) {
    const date = new Date(inputDate);
    const options = { year: 'numeric', month: 'short', day: '2-digit' };
    return date.toLocaleDateString('en-GB', options);
  }

  function convertToDecimal(number) {
    return Number(number).toFixed(2);
  }

  const addUrl = item.product_image;
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'column',
          width: '70%',
          height: '80%',
          justifyContent: 'space-evenly',
          left: '30%'
        }}>
        {/* <View style={styles.textContainer}>
          <Text style={styles.titleText}>
            Bill to Name: {item.shipping_address}
          </Text>

          <Text style={styles.subTitleText}>{item.aws_no}</Text>
        </View> */}
        {/* <View style={styles.textContainer}>
          <Text style={styles.titleText}>Aws No: </Text>

          <Text style={styles.subTitleText}>{item.aws_no}</Text>
        </View> */}

        <View style={styles.textContainer}>
          <Text style={styles.titleText}>
            Document Type:
          </Text>

          <Text style={styles.titleText2}>
            {item?.document_type}
          </Text>

        </View>



        <View
          style={{}}
        >
          <View >

            {item.credit_amount == '0' ?

              <View style={styles.textContainer}>
                <Text style={[styles.titleText,{color:'green'}]}>
                  Debited:
                </Text>

                <Text style={[styles.titleText2,{color:'green'}]}>
                  {convertToDecimal(item.debit_amount)}
                </Text>

              </View>


              :

              <View style={styles.textContainer}>
                <Text style={[styles.titleText,{color:'red'}]}>
                  Credited:
                </Text>

                <Text style={[styles.titleText2,{color:'red'}]}>
                  {convertToDecimal(item.credit_amount)}
                </Text>

              </View>
            }
          </View>
        </View>






        <View style={styles.textContainer}>
          <Text style={styles.titleText}>
            Balance:
          </Text>

          <Text style={styles.titleText2}>
            {convertToDecimal(item.total_balance)}
          </Text>

        </View>

        <View style={styles.textContainer}>
          <Text style={styles.titleText}>
            Posting Date:
          </Text>

          <Text style={styles.titleText2}>
            {formatDate(item.posting_date)}
          </Text>

        </View>


        <View style={styles.textContainer}>
          <Text style={styles.titleText}>
            Document No:
          </Text>

          <Text style={styles.titleText2}>
            {item.document_number}
          </Text>

        </View>



      </View>

      <View
        style={{
          width: '25%',
          height: '100%',

          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          source={{ uri: `https://rrdecor.wooshelf.com${addUrl}` }}
          style={{
            width: '100%',
            height: '90%',
            borderRadius: wp('2%'),
          }}
          resizeMode="cover"
        />
      </View>
    </View>
  );
};

export default LedgerItem;

const styles = StyleSheet.create({
  // container: {
  //   width: wp('90%'),
  //   backgroundColor: '#fff',
  //   height: 124,
  //   borderRadius: 7,
  //   alignSelf: 'center',
  //   marginTop: hp('2%'),
  //   borderColor: '#EAEAEA',
  //   borderWidth: 1,
  //   elevation: 5,
  // },
  // rowContainer: {
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   alignItems: 'center',
  //   marginTop: hp('1%'),
  //   marginLeft: wp('2%'),
  //   marginRight: wp('2%'),
  // },

  // textContainer: {
  //   flex: 1,
  // },
  // titleText: {
  //   fontSize: 14,
  //   
  //   color: '#000',
  // },
  // subTitleText: {
  //   fontSize: 11,
  //   fontFamily: 'Poppins-Regular',
  //   color: '#6A6A6A',
  // },
  // rightText: {
  //   fontSize: 11,
  //   fontFamily: 'Poppins-Regular',
  //   color: '#6A6A6A',
  //   textAlign: 'right',
  // },
  // buttonContainer: {
  //   flexDirection: 'row',
  // },
  // button: {
  //   width: 32,
  //   height: 32,
  //   borderRadius: 16,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },

  container: {
    width: wp('90%'),
    backgroundColor: '#fff',
    height: hp('18%'),
    borderRadius: wp('1%'),
    alignSelf: 'center',
    marginTop: hp('2%'),
    borderColor: '#EAEAEA',
    borderWidth: 1,
    // elevation: 5,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
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
    flexDirection: 'row',
    // justifyContent:'center',
    // alignSelf:'center',
    // alignItems: 'center',
    // justifyContent: 'space-between'
  },
  titleText: {
    fontSize: wp('3.5%'),
    // fontFamily: 'Poppins-Regular',
    color: '#000',
    width: '50%',
    // alignItems:'center'
    // backgroundColor:'red'
  },
  titleText2: {
    fontSize: wp('4%'),
    // fontFamily: 'Poppins-Regular',
    color: '#000',
    width: '100%',
    fontWeight:'600'
    // backgroundColor:'yellow'
  },
  subTitleText: {
    fontSize: wp('3%'),

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
