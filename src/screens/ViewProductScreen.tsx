import React, { useEffect } from 'react'

import { RouteProp,  useRoute } from '@react-navigation/native'

// type ProductScreenNavigationProp = NativeStackNavigationProp<RootStackParams, 'Product'>

import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity, ToastAndroid } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux'
import { getSingleProduct } from '../reduxToolkit/HomeSlice'
import { AppDispatch, RootState } from '../reduxToolkit/store'
import { AddCartItem, GetAllCartItem } from '../reduxToolkit/CartSlice'
import { baseUrl } from '../reduxToolkit/ProductService'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'

type ProductScreenParams = {
    id: string;
};

type ProductScreenRouteProp = RouteProp<{ Product: ProductScreenParams }, 'Product'>;


const ViewProductScreen = () => {
    const dispatch = useDispatch<AppDispatch>();
    // const navigation = useNavigation<ProductScreenNavigationProp>();

    const productData: any = useSelector((state: RootState) => state?.products?.viewProduct)
    const cartData: any = useSelector((state: RootState) => state?.cart?.AllCartItem)
    const route = useRoute<ProductScreenRouteProp>();
    const { id } = route?.params

    // console.log("dettaaill", productData);
    // console.log("carrrr", cartData);
    useEffect(() => {
        dispatch(getSingleProduct(id))
        dispatch(GetAllCartItem())
    }, [])

    // console.log("aaaaaaaaa",id);
    const IsCartItemAvailable = cartData?.cart?.items?.find((item: any) => item?.product?._id === id);

    async function handleCartItem(id: string) {
        const data = {
            productId: id,
            quantity: 1
        }
        dispatch(AddCartItem(data)).then((res) => {
            console.log("rms", res)
            if (res?.payload?.status) {
                ToastAndroid.showWithGravity(
                    'Items added to cart',
                    ToastAndroid.SHORT,
                    ToastAndroid.CENTER,
                )
                setTimeout(() => {
                    dispatch(GetAllCartItem())
                },1000)

            }
        }).catch((err) => {
            // console.log("err",err)
        })
    }

    async function handleRemoveCartItem(id: string) {
        try {
            console.log("tttt", id)
            const token = await AsyncStorage.getItem('token')
            console.log("ppp", token)
            const response = await axios.delete(`${baseUrl}/api/v1/cart/delete-cart/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log("ew", response.data)
            if (response?.data?.status) {
                ToastAndroid.showWithGravity(
                    'Items removed sucessfully',
                    ToastAndroid.SHORT,
                    ToastAndroid.CENTER,
                )
                setTimeout(() => {
                    dispatch(GetAllCartItem())
                },1000)
            }
            return;
        } catch (err) {
            console.log("err", err)
        }

    }

    return (
        <View style={styles.container} className=''>
            {/* Scrollable content */}
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.productDetails} className=''>
                    {/* Product Image */}
                    <Image
                        source={{ uri: productData?.product?.photos[0]?.url }}
                        style={styles.productImage}
                        resizeMode="contain"
                    />


                    {/* Product Name */}
                    <Text style={styles.productTitle}>{productData?.product?.name}</Text>
                    <Text style={styles.productPrice}> ₹{productData?.product?.price} </Text>
                    {/* Product Description */}
                    <Text style={styles.productDescription}> {productData?.product?.description} </Text>

                    {/* You can add more details like price, specifications, etc. */}
                </View>
            </ScrollView>

            {/* Fixed Add to Cart button */}
            <View style={styles.addToCartContainer}>
                {
                    IsCartItemAvailable?.product ? (
                        <TouchableOpacity className='rounded-md p-4 bg-[#f0cda2]' onPress={() => handleRemoveCartItem(productData?.product?._id as string)}>
                            <View className='flex-row items-center justify-center'>
                                <Icon name="bag-remove-outline" size={24} color="black" />
                                <Text className='ml-2 text-center font-semibold'>Remove from Cart</Text>
                            </View>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity className='rounded-md p-4 bg-[#f0cda2]' onPress={() => handleCartItem(productData?.product?._id as string)}>
                            <View className='flex-row items-center justify-center'>
                                <Icon name="cart-outline" size={24} color="black" />
                                <Text className='ml-2 text-center font-semibold'>Add to Cart</Text>
                            </View>
                        </TouchableOpacity>
                    )
                }


            </View>

        </View >
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
        fontSize: 20,
        // fontWeight: 'bold',
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