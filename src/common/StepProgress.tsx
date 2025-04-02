// components/StepProgress.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const StepProgress = ({ currentStep } : any) => {
  const steps = ['Cart', 'Payment', 'Summary']; // Define the steps
  return (
    <View style={styles.stepContainer}>
      {steps.map((step, index) => {
        let stepLabel = index + 1;
        let status = 'Upcoming'; // Default status is 'Upcoming'
        
        if (currentStep === stepLabel) {
          status = 'Current';
        } else if (currentStep > stepLabel) {
          status = 'Completed';
        }
        
        return (
          <View key={step} style={styles.stepItem}>
            <Text style={[styles.stepNumber, status === 'Current' ? styles.currentStep : null]}>
              {stepLabel}
            </Text>
            <Text style={styles.stepText}>{step}</Text>
            {status === 'Completed' && <Text style={styles.completed}>✓</Text>}
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  stepContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    padding: 10,
    backgroundColor: '#f9f9f9',
  },
  stepItem: {
    alignItems: 'center',
  },
  stepNumber: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  currentStep: {
    color: '#4caf50', // Green color for current step
  },
  stepText: {
    fontSize: 14,
    color: '#888',
  },
  completed: {
    fontSize: 16,
    color: '#4caf50', // Green color for completed steps
  },
});

export default StepProgress;
