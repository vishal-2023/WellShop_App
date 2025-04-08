import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import tabScreen from '../components/Tab'
import Splash from '../common/Splash';
import Login from '../common/Login';
import Signup from '../common/Signup';
import ViewProductScreen from '../screens/ViewProductScreen';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import StepProgress from '../common/StepProgress';
import CartScreen from '../screens/CartScreen';
import AddressPage from '../screens/AddressScreen';
import ProductSummaryScreen from '../screens/ProductSummary';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../reduxToolkit/store';
import { GetAllCartItem } from '../reduxToolkit/CartSlice';

export type RootStackParams = {
  Splash: undefined,
  Tab: undefined,
  Login: undefined,
  Signup: undefined,
  Product: {
    id: string
  },
  Cart: undefined,
  Address: undefined,
  Payment: undefined
}

export default function RootNavigation() {
  const [currentStep, setCurrentStep] = useState(1); // Start from Cart (Step 1)

  const Stack = createNativeStackNavigator<RootStackParams>();
  type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParams, 'Tab'>

  const updateStep = (step: number) => {
    console.log("first", step)
    setCurrentStep(step);
  };
  const cartData: any = useSelector((state: RootState) => state?.cart?.AllCartItem)
  const dispatch = useDispatch<AppDispatch>()
  useEffect(() => {
        dispatch(GetAllCartItem())
  },[])

  let itemCount = cartData?.cart?.items?.length??0

  const navigation = useNavigation<HomeScreenNavigationProp>()
  return (
    <Stack.Navigator
      initialRouteName='Splash'
    >
      <Stack.Screen name="Tab" options={{ headerShown: false }} component={tabScreen} />
      <Stack.Screen name="Splash" options={{ headerShown: false }} component={Splash} />
      <Stack.Screen name="Login" options={{ headerShown: false }} component={Login} />
      <Stack.Screen name="Signup" options={{ headerShown: false }} component={Signup} />
      <Stack.Screen name='Product' options={{
        headerShown: true,
        header: () => (
          <View
            style={{
              width: '100%',
              height: 56,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: 10,
              borderBottomWidth: 1,
              borderBottomColor: '#ccc',
              backgroundColor: '#fff7ed',
            }}
          >
            {/* Back Button */}
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name="chevron-back-outline" size={24} color="black" />
            </TouchableOpacity>
        
            {/* Search and Cart Buttons */}
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              {/* Search Button */}
              <TouchableOpacity style={{ marginRight: 15 }}>
                <Icon name="search" size={24} color="black" />
              </TouchableOpacity>
        
              {/* Cart Button */}
              <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
                <View style={{ position: 'relative' }}>
                  <Icon name="cart-outline" size={24} color="black" />
        
                  {/* Cart Badge */}
                  {itemCount > 0 && (
                    <View
                      style={{
                        position: 'absolute',
                        top: -5,
                        right: -5,
                        backgroundColor: '#ba8304',
                        borderRadius: 10,
                        width: 16,
                        height: 16,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <Text style={{ color: 'white', fontSize: 10, fontWeight: 'bold' }}>
                        {itemCount}
                      </Text>
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            </View>
          </View>
        )
        
      }} component={ViewProductScreen} />

      <Stack.Screen name="Payment" component={ProductSummaryScreen} />

      <Stack.Screen
        name="Cart"
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: '#fff7ed',
          },
          header:() => <StepProgress  currentStep={currentStep} />,
          // headerTitle: () => <StepProgress currentStep={currentStep} />,
          headerBackVisible: true,
        }

        }

      >
        {(props) => <CartScreen {...props} currentStep={currentStep} updateStep={updateStep} />}
      </Stack.Screen>

    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({})