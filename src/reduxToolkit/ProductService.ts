// api.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export const baseUrl = 'https://e-cart-backend-anf6.onrender.com'


export const fetchProducts = async (category: string) => {
  const response = await axios.get(`${baseUrl}/api/v1/product/all?search=&sort=&category=${category}&price=`);
  return response.data; // Assuming the response contains the products in the `data` field
};


export const fetchSingleProduct = async (id: string) => {
  const response = await axios.get(`${baseUrl}/api/v1/product/${id}`)
  return response.data;
}

export const addProductInCart = async (data : any) => {
  const token = await AsyncStorage.getItem('token')
  const response = await axios.post(`${baseUrl}/api/v1/cart/add-cart`,data,{
    headers:{
      Authorization:`Bearer ${token}`
    }
  })
  return response.data;
}

export const getAllCartItem = async () => {
  const token = await AsyncStorage.getItem('token')
  const response = await axios.get(`${baseUrl}/api/v1/cart/get-all-Cart`,{
    headers:{
      Authorization:`Bearer ${token}`
    }
  })
  return response.data;
}

export const removeCartItem = async (id:string) => {
  const token = await AsyncStorage.getItem('token')
  console.log("iiiiiii",token)
  const response = await axios.delete(`${baseUrl}/api/v1/cart/delete-cart/${id}`,{
    headers:{
      Authorization:`Bearer ${token}`
    }
  })
  console.log("rsss",response)
  return response.data;
}

export const updateCartItem = async (quantity:Number,itemId:string) => {
  const token = await AsyncStorage.getItem('token')
  console.log("firstppp",quantity,itemId)
  const response = await axios.put(`${baseUrl}/api/v1/cart/update-cart`,{
    quantity,itemId
  },
    {
    headers:{
      Authorization:`Bearer ${token}`
    }
  })
  return response.data;
}


