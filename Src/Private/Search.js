import React, {useState, useEffect} from 'react';
import {
  Image,
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {getSearchData, selectSearchData} from '../Redux/Slices/searchSlice';
import {selectToken} from '../Redux/Slices/authSlice';
import Spinner from 'react-native-loading-spinner-overlay/lib';
import {FlatList} from 'react-native-gesture-handler';
import {resetSearchData} from '../Redux/Slices/searchSlice';

const Search = () => {
  const navigation = useNavigation();
  const [search, setSearch] = useState('');

  const dispatch = useDispatch();
  const profileData = useSelector(selectToken);
  const serachDataIs = useSelector(selectSearchData);

  const {isLoading} = useSelector(state => state.search);
  const handleSearchButton = () => {
    if (search.length === 0) {
      alert('please search');
    } else {
      const params = {
        userToken: profileData.auth_token,
        search: search,
      };
      dispatch(getSearchData(params));
    }
  };

  const [selectedItem, setSelectedItem] = useState('');

  useEffect(() => {
    // Listen for navigation changes
    const unsubscribe = navigation.addListener('blur', () => {
      dispatch(resetSearchData());
      setSearch(''); // Dispatch the action to reset the user state
    });

    // Clean up the listener when the component unmounts
    return unsubscribe;
  }, [navigation]);

  console.log("^^ serachDataIs ^^ ",serachDataIs)
  return (
    <View>
      {/* <Spinner visible={isLoading} /> */}
      <View style={styles.searchContainer}>
        <Image
          source={require('../Assets/Icons/sec.png')}
          style={styles.searchIcon}
        />
      <TextInput
        placeholderTextColor="#8A8A8A"
        placeholder="Search Collection"
        style={styles.searchInput}
        value={search}
        onChangeText={text => {
          setSearch(text);

          const params = {
            userToken: profileData.auth_token,
            search: text,
          };
          dispatch(getSearchData(params));
        }}
        returnKeyType="done" // Add returnKeyType prop
        onSubmitEditing={Keyboard.dismiss} // Dismiss the keyboard on submit
        keyboardType="default" // Set the keyboardType to 'default'
      />
      </View>

      {/* <TouchableOpacity
        style={styles.searchButton}
        //onPress={() => navigation.navigate('Searching')}

        onPress={handleSearchButton}>
        <Text style={styles.searchButtonText}>Search</Text>
      </TouchableOpacity> */}

      <FlatList
        data={serachDataIs}
        keyExtractor={item => item.id}
        ListHeaderComponent={() => <View style={{height: hp('2%')}} />}
        renderItem={({item}) => {
          console.log('search data length', serachDataIs.length);
          return (
            <TouchableOpacity
              //onPress={() => setSelectedItem(item.id)}

              onPress={() => {
                navigation.navigate('Searching', {
                  item: item,
                });
                // dispatch(resetSearchData());
                // setSearch('');
              }}
              style={[
                {
                  width: wp('90%'),
                  alignSelf: 'center',
                  backgroundColor: '#fff',
                  marginBottom: hp('1%'),
                  // flexDirection: 'row',
                  height: hp('6%'),
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 10,
                  padding:10
                },
                selectedItem === item.id
                  ? {
                      borderWidth: 2,
                      borderColor: '#000',
                      elevation: 5,
                      borderRadius: 10,
                    }
                  : {
                      borderWidth: 2,
                      borderColor: '#fff',
                      elevation: 0,
                      borderRadius: 10,
                    },
              ]}>

              <Text
                style={{
                  
                  fontSize: wp('3%'),
                  width: '100%',
                  textAlignVertical: 'center',
                }}>
                {item?.item_description}
              </Text>

              {/* <Text
                style={{
                  
                  fontSize: wp('3%'),
                  width: '100%',
                  textAlignVertical: 'center',
                }}>
                Description - {item.item_description}
              </Text> */}
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    width: wp('94%'),
    height: hp('7%'),
    borderRadius: 8,
    borderColor: '#EBEBEB',
    borderWidth: 1,
    backgroundColor: '#FFFFFF',
    alignSelf: 'center',
    marginTop: hp('1.5%'),
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchIcon: {
    marginLeft: wp('3%'),
  },
  searchInput: {
    marginLeft: wp('2%'),
    color: '#8A8A8A',

    // fontFamily: 'Poppins-Regular',

    width: '80%',
    // backgroundColor:'red',
    height:50
  },
  searchButton: {
    width: 344,
    height: 55,
    borderRadius: 50,
    backgroundColor: '#292929',
    alignSelf: 'center',
    marginVertical: hp('2%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchButtonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',

    
  },
});

export default Search;
