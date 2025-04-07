import React from 'react';
import { View, FlatList, Text, TouchableOpacity, Image, StyleSheet, TouchableWithoutFeedback, KeyboardAvoidingView, Platform, Keyboard, TouchableHighlight } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParams } from '../navigator/RootNavigation';


type ProductScreenNavigationProp = NativeStackNavigationProp<RootStackParams, 'Tab'>

const HomePage = ({ data }: any) => {
  // console.log("ddlj", data)
  const navigation = useNavigation<ProductScreenNavigationProp>();

  const renderProductItem = ({ item }: any) => {
    const img = item?.photos[0]?.url
    return (
      <TouchableHighlight
        underlayColor="#ffff"
        activeOpacity={0.7}
        className=' mt-3'
        style={styles.productCard}
        onPress={() => navigation.navigate('Product', { id: item?._id })}>
        <View className='w-full' >
          <Image className=' w-full h-full object-cover'
            source={{ uri: img }}
            style={styles.productImage} />
          <Text style={styles.productTitle}>{item.name}</Text>
          <Text style={styles.productPrice}>${item.price}</Text>
        </View>
      </TouchableHighlight>
    )
  }


  return (
    <>
      {
        data?.products?.products?.length > 0 ? (
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <KeyboardAvoidingView
            className='mb-10'
              style={{ flex: 1 }}
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
              <View className="my-4 w-11/12 mx-auto">
                <FlatList
                  data={data?.products?.products ?? []}
                  renderItem={renderProductItem}
                  keyExtractor={(item) => item.id}
                  numColumns={2}
                  contentContainerStyle={styles.productList}
                  columnWrapperStyle={styles.columnWrapper}
                  showsHorizontalScrollIndicator={false}
                  showsVerticalScrollIndicator={false}
                  keyboardShouldPersistTaps="handled"
                />
              </View>
            </KeyboardAvoidingView>
          </TouchableWithoutFeedback>
        ) : (
          <Text className='text-center my-10'>No data found</Text>
        )
      }
    </>
  );
};

const styles = StyleSheet.create({
  productList: {
    padding: 3,
    backgroundColor: '#f8f8f8',
    width: '100%',
    height: '100%'
    // margin:'auto'
  },
  columnWrapper: {
    justifyContent: 'space-between',
    gap: 15, // Only works in newer React Native versions
  },
  productCard: {
    backgroundColor: '#fafafb',
    marginBottom: 20,
    width: 180,
    padding: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  productImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    resizeMode: 'contain',
  },
  productTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  productPrice: {
    fontSize: 16,
    color: '#2ecc71',
    marginTop: 5,
  },
  viewDetailsButton: {
    marginTop: 15,
    backgroundColor: '#3498db',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  viewDetailsButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default HomePage;
