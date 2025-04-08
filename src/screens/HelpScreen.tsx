import React, { useState } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  TextInput, 
  StyleSheet, 
  Linking,
  Platform 
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const HelpSupportScreen = () => {
  const [activeIndex, setActiveIndex] = useState<null | number>(null);
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');

  const faqs = [
    {
      question: 'How do I track my order?',
      answer: 'You can track your order through the "My Orders" section in your account.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards, UPI, and net banking.'
    },
    {
      question: 'How can I return a product?',
      answer: 'Visit the Returns section in your account to initiate a return request.'
    }
  ];

  const handleContact = (type:any) => {
    if (type === 'phone') {
      Linking.openURL('tel:+1234567890');
    } else if (type === 'email') {
      Linking.openURL('mailto:support@ecart.com');
    }
  };

  const submitForm = () => {
    // Handle form submission logic here
    console.log('Submitted:', { email, message });
    setEmail('');
    setMessage('');
  };

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      
      {/* FAQ Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
        {faqs.map((item, index) => (
          <View key={index} style={styles.faqContainer}>
            <TouchableOpacity
              style={styles.faqQuestion}
              onPress={() => setActiveIndex(activeIndex === index ? null : index)}
            >
              <Text style={styles.faqText}>{item.question}</Text>
              <Icon
                name={activeIndex === index ? 'expand-less' : 'expand-more'}
                size={24}
                color="#666"
              />
            </TouchableOpacity>
            {activeIndex === index && (
              <View style={styles.faqAnswer}>
                <Text style={styles.answerText}>{item.answer}</Text>
              </View>
            )}
          </View>
        ))}
      </View>

      {/* Contact Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Contact Support</Text>
        
        <TouchableOpacity 
          style={[styles.contactCard, styles.phoneCard]}
          onPress={() => handleContact('phone')}
        >
          <View style={styles.contactIcon}>
            <Icon name="phone-in-talk" size={28} color="#fff" />
          </View>
          <View style={styles.contactInfo}>
            <Text style={styles.contactTitle}>Call Us</Text>
            <Text style={styles.contactSubtitle}>+1 (234) 567-890</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.contactCard, styles.emailCard]}
          onPress={() => handleContact('email')}
        >
          <View style={styles.contactIcon}>
            <Icon name="email" size={28} color="#fff" />
          </View>
          <View style={styles.contactInfo}>
            <Text style={styles.contactTitle}>Email Us</Text>
            <Text style={styles.contactSubtitle}>support@ecart.com</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Contact Form */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Send Message</Text>
        <TextInput
          style={styles.input}
          placeholder="Your email"
          placeholderTextColor="#999"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <TextInput
          style={[styles.input, styles.messageInput]}
          placeholder="Your message"
          placeholderTextColor="#999"
          value={message}
          onChangeText={setMessage}
          multiline
          numberOfLines={4}
        />
        <TouchableOpacity 
          style={styles.submitButton}
          onPress={submitForm}
        >
          <Text style={styles.submitButtonText}>Send Message</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    marginTop:10
  },
  contentContainer: {
    paddingBottom: 40,
  },
  header: {
    backgroundColor: '#2A2A2A',
    padding: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  headerTitle: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '600',
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 20,
    padding: 20,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  faqContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  faqQuestion: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
  },
  faqText: {
    fontSize: 16,
    color: '#444',
    flex: 1,
    marginRight: 10,
  },
  faqAnswer: {
    paddingBottom: 14,
    paddingHorizontal: 8,
  },
  answerText: {
    color: '#666',
    fontSize: 14,
    lineHeight: 20,
  },
  contactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
  },
  phoneCard: {
    backgroundColor: '#8ab9eb',
  },
  emailCard: {
    backgroundColor: '#d8e670',
  },
  contactIcon: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 8,
    padding: 10,
    marginRight: 16,
  },
  contactInfo: {
    flex: 1,
  },
  contactTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  contactSubtitle: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 14,
  },
  input: {
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    padding: 14,
    fontSize: 16,
    marginBottom: 16,
    color: '#333',
    borderWidth: 1,
    borderColor: '#eee',
  },
  messageInput: {
    height: 120,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#ebb434',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default HelpSupportScreen;