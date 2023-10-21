import { StyleSheet, Text, View, FlatList } from 'react-native';
import React from 'react';
import { useRoute } from '@react-navigation/native';
import LedgerItem from '../components/molecules/LedgerItem';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const LedgerDetail = () => {
  const route = useRoute();
  const { data } = route.params;
  console.log('ledger data is', data);

  function convertToDecimal(number) {
    return Number(number).toFixed(2);
}
  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      {data?.length !== 0 && (
        <>
          <View
            style={styles.container}
          >
            <Text
              style={{
                color: "#000",
                fontSize: 14
              }}
            >Opening Balance : {convertToDecimal(data[0]?.total_balance)}</Text>
          </View>

          <FlatList
            style={{ marginVertical: hp('1%') }}
            keyExtractor={item => item.id}
            data={data}
            renderItem={({ item }) => {
              return <LedgerItem item={item} />;
            }}
          />
        </>
      )}
    </View>
  );
};

export default LedgerDetail;

const styles = StyleSheet.create({
  container: {
    width: wp('90%'),
    backgroundColor: '#fff',
    height: hp('5%'),
    borderRadius: wp('1%'),
    alignSelf: 'center',
    marginTop: hp('2%'),
    borderColor: '#EAEAEA',
    borderWidth: 1,
    // elevation: 5,
    alignItems: 'center',
    flexDirection: 'row',
    padding: 10,
    paddingBottom: 0,
    paddingTop: 0
    // justifyContent: 'center',
  },
});
