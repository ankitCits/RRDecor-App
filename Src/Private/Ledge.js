import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/EvilIcons';
import DatePicker from 'react-native-date-picker';
import {
  clearLedgerData,
  getLedgerData,
  postLedgerData,
} from '../Redux/Slices/ledgerSlice';
import Spinner from 'react-native-loading-spinner-overlay/lib';
import {useDispatch, useSelector} from 'react-redux';
import {selectLedgerData} from '../Redux/Slices/ledgerSlice';
import LedgerItem from '../components/molecules/LedgerItem';
import {useNavigation} from '@react-navigation/native';
import { selectToken } from '../Redux/Slices/authSlice';
const Ledge = () => {
  const navigation = useNavigation();
  const [fromDate, setFromDate] = useState(new Date());
  const [fromOpen, setFromOpen] = useState(false);
  const profileData = useSelector(selectToken);
  const [currentFromDate, setCurrentFromDate] = useState('From Date');

  const [toDate, setToDate] = useState(new Date());
  const [toOpen, setToOpen] = useState(false);

  const [currentToDate, setCurrentToDate] = useState('To Date');

  const dispatch = useDispatch();

  const handleSearch = async() => {
    if (currentFromDate === 'From Date') {
      alert('please select from date');
      return;
    }

    if (currentToDate === 'To Date') {
      alert('please select to date');
      return;
    }
    if (currentFromDate === currentToDate) {
      alert('both dates should not be same');
      return;
    }
    const params = {
      from_date: currentFromDate,
      to_date: currentToDate,
      token:profileData?.auth_token

    };
    let ledData =  await dispatch(getLedgerData(params));
    console.log("^^ LED DATA >>>>>>>>>>>>>>>>^^",ledData)

     if (ledData?.payload?.response !== 0) {
      navigation.navigate('LedgerDetail', {
        data: ledData?.payload?.response,
      });
    }
  };
  const {isLoading, error} = useSelector(state => state.ledger);

  const LedgerDataIs = useSelector(selectLedgerData);

  useEffect(() => {
    // Listen for navigation changes
    const unsubscribe = navigation.addListener('blur', () => {
      dispatch(clearLedgerData());
      setCurrentFromDate('From Date');
      setCurrentToDate('To Date');
      // Dispatch the action to reset the user state
    });

    // Clean up the listener when the component unmounts
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    console.log("^^ LedgerDataIs ^^",LedgerDataIs)
    // if (LedgerDataIs?.response?.length !== 0) {
    //   navigation.navigate('LedgerDetail', {
    //     data: LedgerDataIs?.response,
    //   });
    // }
  }, [handleSearch]);

  return (
    <View style={styles.container}>
      <Spinner visible={isLoading} />
      <TouchableOpacity
        style={styles.inputContainer}
        onPress={() => setFromOpen(true)}>
        <Text style={styles.label}>{currentFromDate}</Text>
        <Icon name="calendar" size={34} color="#000000" />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.inputContainer}
        onPress={() => setToOpen(true)}>
        <Text style={styles.label}>{currentToDate}</Text>
        <Icon name="calendar" size={34} color="#000000" />
      </TouchableOpacity>

      {error && (
        <Text
          style={{
            color: '#153F5E',
            
            fontSize: wp('4%'),
            textAlign: 'center',
            marginTop: hp('5%'),
          }}>
          {error}
        </Text>
      )}

      <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
        <Text style={styles.searchButtonText}>Search</Text>
      </TouchableOpacity>

      <DatePicker
        modal
        open={fromOpen}
        mode={'date'}
        date={fromDate}
        onConfirm={date => {
          setFromOpen(false);
          setFromDate(date);
          const filteredDate = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
          const filteredMonth = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
          const filteredYear = date.getFullYear();
          const set = `${filteredYear}-${filteredMonth}-${filteredDate}`;
          console.log('set is', set);
          setCurrentFromDate(set);
        }}
        onCancel={() => {
          setFromOpen(false);
        }}
      />

      <DatePicker
        modal
        open={toOpen}
        mode={'date'}
        date={toDate}
        onConfirm={date => {
          setFromOpen(false);
          setFromDate(date);
          const filteredDate = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
          const filteredMonth = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
          const filteredYear = date.getFullYear();
          const set = `${filteredYear}-${filteredMonth}-${filteredDate}`;
          console.log('set is', set);
          setCurrentToDate(set);
        }}
        // onConfirm={date => {
        //   setToOpen(false);
        //   setToDate(date);
        //   console.log('date is', date);

        //   const filteredDate = date.getDate();
        //   const filteredMonth = date.getMonth();
        //   console.log('filtered month is', filteredMonth);
        //   const filteredYear = date.getFullYear();
        //   const set = `${filteredYear}-${filteredMonth + 1}-${filteredDate}`;
        //   console.log('set is', set);
        //   setCurrentToDate(set);
        // }}
        onCancel={() => {
          setToOpen(false);
        }}
      />
    </View>
  );
};

export default Ledge;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  inputContainer: {
    backgroundColor: '#fff',
    width: wp('90%'),
    height: hp('7%'),
    borderColor: '#EBEBEB',
    borderWidth: 1,
    borderRadius: 8,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp('2%'),
    justifyContent: 'space-between',
  },
  label: {
    fontSize: 14,
    
    color: '#8A8A8A',
    marginLeft: wp('3%'),
  },
  searchButton: {
    backgroundColor: '#000',
    width: 343,
    height: 48,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: hp('2%'),
    marginBottom: hp('2%'),
  },
  searchButtonText: {
    color: '#fff',
    fontSize: 16,
    
  },
});
