import React from 'react'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParams } from '../navigator/RootNavigation'
import { useNavigation } from '@react-navigation/native'

type ProductScreenNavigationProp = NativeStackNavigationProp<RootStackParams, 'Product'>
// const navigation = useNavigation<ProductScreenNavigationProp>();

import { View, Text, ScrollView, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const ViewProductScreen = () => {
    return (
        <View style={styles.container} className=''>
            {/* Scrollable content */}
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.productDetails} className=''>
                    {/* Product Image */}
                    <Image
                        source={require('../assests/bg-2.jpg')}
                        style={styles.productImage}
                        resizeMode="contain"
                    />


                    {/* Product Name */}
                    <Text style={styles.productTitle}>Product Name</Text>

                    {/* Product Description */}
                    <Text style={styles.productDescription}>This is a detailed description of the product...</Text>

                    {/* You can add more details like price, specifications, etc. */}
                    <Text style={styles.productPrice}>$49.99</Text>
                </View>
            </ScrollView>

            {/* Fixed Add to Cart button */}
            <View style={styles.addToCartContainer}>
                <TouchableOpacity className='rounded-md p-4 bg-[#f8dcb9]'>
                    <View className='flex-row items-center justify-center'>
                        <Icon name="cart-outline" size={24} color="black" />
                        <Text className='ml-2 text-center font-semibold'>Add to Cart</Text>
                    </View>
                </TouchableOpacity>

            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
        justifyContent: 'flex-end', // Ensure content pushes to the top, the button stays at the bottom
    },
    scrollContent: {
        paddingBottom: 80, // Adjust this to give space for the button
    },
    productDetails: {
        padding: 20,
        paddingTop: 5
    },
    productImage: {
        width: '100%',
        height: 250, // Adjust height as needed
        marginBottom: 20,
    },
    productTitle: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    productDescription: {
        marginTop: 10,
        fontSize: 16,
        color: '#666',
    },
    productPrice: {
        marginTop: 10,
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
    },
    addToCartContainer: {
        position: 'absolute', // Fix the button at the bottom of the screen
        bottom: 0,
        left: 0,
        right: 0,
        padding: 10,
        paddingBottom: 20,
        backgroundColor: '#fff', // Optional: Add a background color to the bottom bar
        // borderTopColor: '#ccc',
    },
});

export default ViewProductScreen