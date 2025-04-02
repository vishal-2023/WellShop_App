import React from 'react';
import { View, Text, Button, Image, StyleSheet, ScrollView } from 'react-native';

const ProductSummaryScreen = ({  }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image 
        source={{uri: 'https://example.com/product-image.jpg'}} 
        style={styles.productImage} 
      />
      <Text style={styles.productName}>Awesome Product</Text>
      <Text style={styles.productPrice}>$99.99</Text>
      <Text style={styles.productDescription}>
        This is a fantastic product that offers great value for the price. It's made from high-quality materials and will serve you for years to come.
      </Text>
      <Button 
        title="Buy Now"
        // onPress={() => navigation.navigate('BuyNow')}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  productImage: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  productPrice: {
    fontSize: 20,
    color: 'green',
    marginVertical: 5,
  },
  productDescription: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 10,
    color: '#666',
  },
});

export default ProductSummaryScreen;
