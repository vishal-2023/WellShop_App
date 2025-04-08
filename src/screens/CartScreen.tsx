import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, StyleSheet, Alert, ToastAndroid } from 'react-native';
import { RootStackParams } from '../navigator/RootNavigation';
import { RouteProp } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { GetAllCartItem } from '../reduxToolkit/CartSlice';
import { AppDispatch, RootState } from '../reduxToolkit/store';
import AddressPage from './AddressScreen';
import { getAllCartItem, removeCartItem, updateCartItem } from '../reduxToolkit/ProductService';
import ProductSummaryScreen from './ProductSummary';

type CartScreenProps = {
  currentStep: number,
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

const CartScreen: React.FC<CartScreenProps> = ({ currentStep, updateStep, route, navigation }) => {
  console.log("cartnumbb", currentStep)
  const [isLoading, setIsLoading] = useState(false);
  const timeoutRef = useRef<any>(null);
  const dispatch = useDispatch<AppDispatch>();
  const cartData: any = useSelector((state: RootState) => state?.cart?.AllCartItem)
  const totalPrice: any = useSelector((state: any) => state?.cart?.AllCartItem?.cart?.totalPrice)
  console.log("cccc", cartData);
  useEffect(() => {
    updateStep(1)
    dispatch(GetAllCartItem())
  }, [])


  function AddItemQuantity(item: Number, id: string) {
    // Clear any previous timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set a new timeout to call the API after a delay
    timeoutRef.current = setTimeout(() => {
      setIsLoading(true);  // Optional: Set loading state for visual feedback
      updateCartItem(item, id)  // Assuming item is already incremented
        .then((res) => {
          console.log("API Response: ", res);
          if (res?.status) {
            dispatch(GetAllCartItem())

          }
        })
        .catch((err) => {
          console.log("Error: ", err);
        })
        .finally(() => {
          setIsLoading(false);  // Reset loading state
        });
    }, 300);  // Delay of 300ms, adjust as needed
  }

  async function deleteCartItem(id: string) {
    // console.log("first", id)
    await removeCartItem(id).then((res) => {
      console.log("rss", res)
      if (res?.status) {
        ToastAndroid.showWithGravity(
          'Cart Item deleted sucessfully',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        )
        setTimeout(() => {
          dispatch(GetAllCartItem())
        }, 500)
      }
    }).catch((err) => {
      console.log("err", err.message)
    })
  }

  return (
    <>
      {
        currentStep == 1 &&
        <View className='' style={styles.container}>
          {
            cartData?.cart?.items?.length>0 ? (
              <>
              <FlatList
            data={cartData?.cart?.items ?? []}
            keyExtractor={(item: any) => item?._id}
            renderItem={({ item }) => (
              <View style={styles.cartItem}>
                <Image source={{ uri: item?.product?.photos[0]?.url }} style={styles.cartImage} />
                <View style={styles.itemDetails}>
                  <Text style={styles.itemName}>{item?.product?.name}</Text>
                  <Text style={styles.itemPrice}>${item?.product?.price}</Text>
                  <Text style={styles.itemQuantity}>Quantity: {item?.quantity}</Text>
                  <View className=' flex flex-row gap-4 mt-3'>
                    <TouchableOpacity disabled={isLoading} onPress={() => AddItemQuantity(item?.quantity + 1, item?._id)} className='  h-8 w-8 bg-[#f0cda2] rounded-full flex justify-center items-center'>
                      <Text className=' text-xl text-white font-semibold '>+</Text>
                    </TouchableOpacity>
                    <TouchableOpacity disabled={isLoading || (item?.quantity == 1)} onPress={() => AddItemQuantity(item?.quantity - 1, item?._id)} className='  h-8 w-8 bg-[#f0cda2] rounded-full flex justify-center items-center'>
                      <Text className=' text-xl text-white font-semibold '> - </Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View className='flex justify-between items-center'>
                  <Text style={styles.itemTotal}>${item?.product?.price * item?.quantity}</Text>
                  <TouchableOpacity onPress={() => deleteCartItem(item?.product?._id)}>
                    <Icon name='trash' color={'#e08b7e'} size={20} />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />

          <View style={styles.totalContainer}>
            <Text style={styles.totalText}>Total: ${totalPrice?.toFixed(2)}</Text>
          </View>

          <TouchableOpacity className='bg-[#ebb434]' style={styles.checkoutButton} onPress={() => [updateStep(2), navigation.navigate('Cart')]}>
            <Text style={styles.checkoutButtonText}>Checkout</Text>
          </TouchableOpacity>
              </>
            ) : (
              <>
              <Text className=' text-center font-semibold'>No Cart Item availables</Text>
              </>
            )
          }
          
        </View>
      }

      {
        currentStep == 2 &&
        <AddressPage updateStep={updateStep} />
      }

      {
        currentStep == 3 && 
        <ProductSummaryScreen />
      }
    </>

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
