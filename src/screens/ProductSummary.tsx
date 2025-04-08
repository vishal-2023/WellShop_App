import React, { useState } from 'react';
import { View, Text, Button, Image, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';

const ProductSummaryScreen = ({  }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [amount, setAmount] = useState(50000); 
  return (
    <ScrollView contentContainerStyle={styles.container}>
    <View style={styles.header}>
      <Image
        source={{uri: 'https://example.com/product-image.jpg'}} 
        style={styles.logo} />
      <Text style={styles.headerText}>Payment Details</Text>
    </View>

    <View style={styles.form}>
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        keyboardType="phone-pad"
        value={phone}
        onChangeText={setPhone}
      />
      <TextInput
        style={styles.input}
        placeholder="Address"
        value={address}
        onChangeText={setAddress}
      />
    </View>

    <View style={styles.priceDetails}>
      <Text style={styles.priceText}>Total Amount:</Text>
      <Text style={styles.amount}>₹{(amount / 100).toFixed(2)}</Text>
    </View>

    <TouchableOpacity style={styles.payButton}>
      <Text style={styles.buttonText}>Pay Now</Text>
    </TouchableOpacity>
  </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff7ed',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    width: 100,
    height: 40,
    marginBottom: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'grey',
  },
  form: {
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingLeft: 15,
    fontSize: 16,
  },
  priceDetails: {
    marginBottom: 20,
    alignItems: 'center',
  },
  priceText: {
    fontSize: 18,
    color: '#333',
  },
  amount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ebb434',
    marginTop: 5,
  },
  payButton: {
    backgroundColor: '#ebb434',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
  },
});


export default ProductSummaryScreen;
