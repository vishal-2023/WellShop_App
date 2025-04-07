// AddressPage.js
import React, { useState } from 'react';
import { Text, TextInput, Button, StyleSheet, ScrollView, TouchableOpacity, View } from 'react-native';
import { RootStackParams } from '../navigator/RootNavigation';
import { RouteProp } from '@react-navigation/native';

type AddressScreenProps = {
  updateStep: (step: number) => void;
};

const AddressPage: React.FC<AddressScreenProps> = ({ updateStep }) => {
  const [address, setAddress] = useState({
    street: '',
    city: '',
    state: '',
    zip: '',
    country: '',
  });

  const handleInputChange = (name: any, value: any) => {
    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    console.log('Address Submitted:', address);
    // navigation.navigate('ProductSummary')
    // You can process the form data here, e.g., save it to a database
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text className='mb-5 text-center text-gray-400'>Address</Text>
      <View>
        <TextInput
          style={styles.input}
          placeholder="Street Address"
          value={address.street}
          onChangeText={(text) => handleInputChange('street', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="City"
          value={address.city}
          onChangeText={(text) => handleInputChange('city', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="State"
          value={address.state}
          onChangeText={(text) => handleInputChange('state', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Pin Code"
          value={address.zip}
          onChangeText={(text) => handleInputChange('zip', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Country"
          value={address.country}
          onChangeText={(text) => handleInputChange('country', text)}
        />

      </View>
      <View style={{ flex: 1, justifyContent: 'flex-end', marginBottom: 2 }}>
      <View className=' flex flex-row justify-between items-center mb-2   '>
      <TouchableOpacity className=' p-3 w-48 bg-[#ebb434] rounded-md' onPress={() => { updateStep(1) }}>
          <Text className=' text-center font-bold text-white'>Back to Cart</Text>
        </TouchableOpacity>
      <TouchableOpacity  className=' p-3 w-48 bg-[#ebb434] rounded-md'>
        <Text className=' text-white font-bold text-center'>Continue</Text>
      </TouchableOpacity>
        
      </View>
      </View>
     
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: '#fff7ed',

  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 10,
    borderRadius: 5,
    backgroundColor: '#fff'
  },
});

export default AddressPage;
