// AddressPage.js
import React, { useState } from 'react';
import { Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import { RootStackParams } from '../navigator/RootNavigation';
import { RouteProp } from '@react-navigation/native';

type AddressScreenProps = {
    updateStep: (step: any) => void;
    route: RouteProp<RootStackParams, 'Address'>;
    navigation: any;
};

const AddressPage : React.FC<AddressScreenProps> = ({ updateStep, route, navigation }) => {
  const [address, setAddress] = useState({
    street: '',
    city: '',
    state: '',
    zip: '',
    country: '',
  });

  const handleInputChange = (name : any, value : any) => {
    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    console.log('Address Submitted:', address);
    navigation.navigate('ProductSummary')
    // You can process the form data here, e.g., save it to a database
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Enter Your Address</Text>

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
        placeholder="Zip Code"
        value={address.zip}
        onChangeText={(text) => handleInputChange('zip', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Country"
        value={address.country}
        onChangeText={(text) => handleInputChange('country', text)}
      />

      <Button title="Submit Address" onPress={handleSubmit} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
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
  },
});

export default AddressPage;
