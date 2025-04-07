
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { RootStackParams } from '../navigator/RootNavigation';
import { useNavigation } from '@react-navigation/native';

const StepProgress = ({ currentStep }: any) => {
    type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParams, 'Tab'>
  
    const navigation = useNavigation<HomeScreenNavigationProp>()
  
  const steps = ['Cart', 'Address', 'Payment']; // Define the steps
  return (
    <View className=' w-full h-32 mt-2'>
      <View style={{borderBottomWidth:1,borderBottomColor:'#e3e3e3'}} className=' flex w-[96%] mx-auto flex-row items-center gap-4 pb-4 mb-5'>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="chevron-back-outline" size={24} color="black" />
        </TouchableOpacity>
        <Text style={{ fontSize: 14, fontWeight: '400' }}>{currentStep == 1 ? 'CART' : (currentStep == 2 ? 'ADDRESS' : 'PAYMENT METHODS')} </Text>
      </View>
      <View style={styles.stepContainer}>
        {steps.map((step, index) => {
          let stepLabel = index + 1;
          let status = 'Upcoming';

          if (currentStep === stepLabel) {
            status = 'Current';
          } else if (currentStep > stepLabel) {
            status = 'Completed';
          }

          return (
            <View key={step} style={styles.stepItem}>
              <View style={styles.stepNumberWrapper}>
                <View className='flex justify-center items-center'>

                  <Text
                    style={[
                      styles.stepNumber,
                      status === 'Current' ? styles.currentStep : null,
                      status === 'Completed' ? styles.completedStep : null,
                    ]}
                  >
                    {status === 'Completed' ? '✓' : stepLabel}
                  </Text>
                  <Text style={styles.stepText}>{step}</Text>

                </View>

                {/* Only render horizontal lines between steps */}
                {index < steps.length - 1 && (
                  <View
                    style={[
                      styles.stepLine,
                      status === 'Completed' && styles.completedLine,
                    ]}
                  />
                )}
              </View>
            </View>
          );
        })}
      </View>
    </View>

  );
};

const styles = StyleSheet.create({
  stepContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '91%',
    margin: 'auto',
    // padding: ,
    marginTop: 0,
    height: '100%',
    // backgroundColor: '#fff',
    // borderWidth: 3
  },
  stepItem: {
    // alignItems: 'center',
  },
  stepNumberWrapper: {
    // alignItems: 'center',
    position: 'relative',
    flexDirection: 'row',
    // justifyContent: 'center',
    // borderWidth: 3,
    alignItems: 'flex-start',

  },
  stepNumber: {
    width: 20,
    height: 20,
    borderRadius: 10,
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    // lineHeight: 30,
    backgroundColor: '#ccc',
    color: 'white',
  },
  currentStep: {
    backgroundColor: '#deb74e', // Green color for the current step
  },
  completedStep: {
    backgroundColor: '#deb74e', // Green color for completed step
    color: 'white',
  },
  stepText: {
    fontSize: 10,
    color: '#888',
    marginTop: 5,
  },
  stepLine: {
    height: 2,
    width: 120,
    backgroundColor: '#ccc',
    marginLeft: 10,
    marginTop: 10
  },
  completedLine: {
    backgroundColor: '#deb74e', // Green color for the completed step line
  },
  completed: {
    fontSize: 16,
    color: '#deb74e', // Green color for completed steps
  },
});

export default StepProgress;
