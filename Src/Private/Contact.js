import React, {useEffect, useState} from 'react';
import {
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
import {useDispatch, useSelector} from 'react-redux';
import {clearContactData, postContact} from '../Redux/Slices/contactSlice';
import Spinner from 'react-native-loading-spinner-overlay/lib';

const Contact = ({navigation}) => {
  const dispatch = useDispatch();
  const {isLoading, error} = useSelector(state => state.contact);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [description, setDescription] = useState('');

  const [localError, setLocalError] = useState('');
  var re = /\S+@\S+\.\S+/;

  const handleSubmit = () => {
    if (name === '') {
      setLocalError('Please Enter Your Name');
      return;
    } else {
      setLocalError('');
    }

    if (re.test(email) == false) {
      setLocalError('Please Valid Email');
      return;
    } else {
      setLocalError('');
    }

    if (contactNumber.length !== 10) {
      setLocalError('Please Enter Valid 10 Digits Number');
      return;
    } else {
      setLocalError('');
    }

    if (description === '') {
      setLocalError('Please Enter Your Query/Concern');
      return;
    } else {
      setLocalError('');
    }
    const params = {
      name: name,
      email: email,
      contact_number: contactNumber,
      description: description,
    };
    dispatch(postContact(params));
    if (error === 'Thanks For Requesting...') {
      dispatch(clearContactData());
      setName('');
      setEmail('');
      setContactNumber('');
      setDescription('');
    }
  };
  // useEffect(() => {
  //   if (error === 'contact us form submited') {
  //     setName('');
  //     setEmail('');
  //     setContactNumber('');
  //     setDescription('');
  //   }
  // }, []);

  useEffect(() => {
    // Listen for navigation changes
    const unsubscribe = navigation.addListener('blur', () => {
      dispatch(clearContactData());
      setName('');
      setEmail('');
      setContactNumber('');
      setDescription('');
      // Dispatch the action to reset the user state
    });

    // Clean up the listener when the component unmounts
    return unsubscribe;
  }, [navigation]);
  return (
    <ScrollView style={styles.container}>
      <Spinner visible={isLoading} />
      <Text style={styles.title}>Contact our team</Text>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Name"
          placeholderTextColor="#999999"
          style={styles.input}
          value={name}
          onChangeText={setName}
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email Id"
          placeholderTextColor="#999999"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Contact Number"
          placeholderTextColor="#999999"
          style={styles.input}
          value={contactNumber}
          onChangeText={setContactNumber}
        />
      </View>

      <View style={styles.descriptionContainer}>
        <TextInput
          placeholder="Description"
          placeholderTextColor="#999999"
          style={styles.descriptionInput}
          value={description}
          onChangeText={setDescription}
          multiline={true}
          numberOfLines={4}
          textAlignVertical="top"
        />
      </View>
      {localError && (
        <Text
          style={{
            color: '#153F5E',
            
            fontSize: wp('4%'),
            textAlign: 'center',
            marginTop: hp('5%'),
          }}>
          {localError}
        </Text>
      )}

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
      <TouchableOpacity
        style={styles.submitButton}
        // onPress={() => navigation.navigate('Success')}
        onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>SUBMIT</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    
    color: '#153F5E',
    marginTop: hp('2%'),
    marginLeft: wp('4%'),
  },
  inputContainer: {
    width: wp('90%'),
    height: hp('7%'),
    borderColor: '#E1E1E1',
    borderRadius: 9,
    borderWidth: 1,
    alignSelf: 'center',
    marginTop: hp('2%'),
  },
  input: {
    fontSize: 14,
    color: '#999999',
    marginLeft: wp('2%'),
    padding:10
  },
  descriptionContainer: {
    width: wp('90%'),
    height: hp('20%'),
    borderColor: '#E1E1E1',
    borderRadius: 9,
    borderWidth: 1,
    alignSelf: 'center',
    marginTop: hp('2%'),
  },
  descriptionInput: {
    fontSize: 14,

    color: '#999999',
    marginLeft: wp('2%'),
    flex: 1,
    textAlignVertical: 'top',
    padding:10
    
  },
  submitButton: {
    backgroundColor: '#000',
    width: 343,
    height: 48,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: hp('5%'),
    marginBottom: hp('2%'),
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    
  },
});

export default Contact;
