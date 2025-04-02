import React from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, StyleSheet, Alert } from 'react-native';
import { RootStackParams } from '../navigator/RootNavigation';
import { RouteProp } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

type CartScreenProps = {
    updateStep: (step: number) => void;
    route: RouteProp<RootStackParams, "Cart">;
    navigation: any;
};

const cartItems = [
    {
      id: '1',
      name: 'Apple iPhone 14',
      price: 799,
      quantity: 1,
      image: 'https://via.placeholder.com/150',
    },
    {
      id: '2',
      name: 'Samsung Galaxy S22',
      price: 699,
      quantity: 2,
      image: 'https://via.placeholder.com/150',
    },
    {
      id: '3',
      name: 'Google Pixel 6',
      price: 599,
      quantity: 1,
      image: 'https://via.placeholder.com/150',
    },
  ];

const CartScreen: React.FC<CartScreenProps> = ({ updateStep, route, navigation }) => {
    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);


    return (
        <View className=' bg-red-500' style={styles.container}>  
        <FlatList
          data={cartItems}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.cartItem}>
              <Image source={{ uri: item.image }} style={styles.cartImage} />
              <View style={styles.itemDetails}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemPrice}>${item.price}</Text>
                <Text style={styles.itemQuantity}>Quantity: {item.quantity}</Text>
                <View className=' flex flex-row gap-4 mt-3'>
                    <TouchableOpacity className='  h-8 w-8 bg-[#f0cda2] rounded-full flex justify-center items-center'>
                        <Text className=' text-xl text-white font-semibold '>+</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className='  h-8 w-8 bg-[#f0cda2] rounded-full flex justify-center items-center'>
                    <Text className=' text-xl text-white font-semibold '> - </Text>
                    </TouchableOpacity>
                </View>
              </View>
              <View className='flex justify-between items-center'>
              <Text style={styles.itemTotal}>${item.price * item.quantity}</Text>
              <Icon name='trash' color={'#e08b7e'} size={20} />
                </View>
            </View>
          )}
        />
  
        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>Total: ${totalPrice.toFixed(2)}</Text>
        </View>
  
        <TouchableOpacity className='bg-[#f0cda2]' style={styles.checkoutButton} onPress={() => navigation.navigate('Address')}>
          <Text style={styles.checkoutButtonText}>Checkout</Text>
        </TouchableOpacity>
      </View>
    );
};

export default CartScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff7ed',
      paddingTop: 20,
      paddingHorizontal: 16,
    },
    cartItem: {
      flexDirection: 'row',
      backgroundColor: '#fff',
      borderRadius: 8,
      padding: 10,
      marginBottom: 12,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 3,
    },
    cartImage: {
      width: 80,
      height: 80,
      borderRadius: 8,
      marginRight: 12,
    },
    itemDetails: {
      flex: 1,
      justifyContent: 'center',
    },
    itemName: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#333',
    },
    itemPrice: {
      fontSize: 14,
      color: '#888',
    },
    itemQuantity: {
      fontSize: 14,
      color: '#888',
    },
    itemTotal: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#333',
    },
    totalContainer: {
      marginTop: 20,
      padding: 10,
      backgroundColor: '#fff',
      borderRadius: 8,
      alignItems: 'flex-end',
      marginBottom: 20,
    },
    totalText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#333',
    },
    checkoutButton: {
    //   backgroundColor: '#f0cda2',
      paddingVertical: 12,
      borderRadius: 8,
      justifyContent: 'center',
      alignItems: 'center',
    },
    checkoutButtonText: {
      fontSize: 18,
      color: '#fff',
      fontWeight: 'bold',
    },
  });
  