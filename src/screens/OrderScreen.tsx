import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, FlatList, Image } from 'react-native';

const MyOrdersPage = () => {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [orders, setOrders] = useState([
    {
      id: '1',
      orderNumber: '#123456',
      date: '2023-07-20',
      status: 'Delivered',
      items: [
        { id: '1', name: 'Product 1', image: 'https://picsum.photos/200' },
        { id: '2', name: 'Product 2', image: 'https://picsum.photos/201' },
      ],
      total: 99.99,
    },
    // Add more mock orders here
  ]);

  const filters = ['All', 'Delivered', 'Processing', 'Cancelled'];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'delivered': return '#4CAF50';
      case 'processing': return '#FF9800';
      case 'cancelled': return '#F44336';
      default: return '#2196F3';
    }
  };

  const filteredOrders = orders.filter(order =>
    selectedFilter === 'All' ? true : order.status === selectedFilter
  );

  const OrderItem = ({ order }: any) => (
    <View style={styles.orderCard}>
      <View style={styles.orderHeader}>
        <Text style={styles.orderNumber}>{order.orderNumber}</Text>
        <Text style={styles.orderDate}>{order.date}</Text>
      </View>

      <View style={styles.statusContainer}>
        <View style={[styles.statusIndicator, { backgroundColor: getStatusColor(order.status) }]} />
        <Text style={styles.orderStatus}>{order.status}</Text>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {order.items.map((item: any) => (
          <Image key={item.id} source={{ uri: item.image }} style={styles.productImage} />
        ))}
      </ScrollView>

      <View style={styles.orderFooter}>
        <Text style={styles.totalText}>Total: ${order.total.toFixed(2)}</Text>
        <TouchableOpacity style={styles.detailsButton}>
          <Text style={styles.detailsButtonText}>View Details</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Filter Section */}
      <View className='h-20 mb-5'>
        <ScrollView
          className=''
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterContainer}
        >
          {filters.map(filter => (
            <TouchableOpacity
              key={filter}

              style={[
                styles.filterButton,
                selectedFilter === filter && styles.activeFilter
              ]}
              onPress={() => setSelectedFilter(filter)}
            >
              <Text style={[
                styles.filterText,
                selectedFilter === filter && styles.activeFilterText
              ]}>
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>


      {/* Orders List */}
      <FlatList
        data={filteredOrders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <OrderItem order={item} />}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No orders found</Text>
        }
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  filterContainer: {
    // paddingBottom: 10,
    // height:'100%'
  },
  filterButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#EEE',
    marginRight: 10,
    height: 45,
  },
  activeFilter: {
    backgroundColor: '#2196F3',
  },
  filterText: {
    color: '#666',
  },
  activeFilterText: {
    color: 'white',
    fontWeight: 'bold',
  },
  orderCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  orderNumber: {
    fontWeight: '600',
    color: '#333',
  },
  orderDate: {
    color: '#666',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  statusIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 8,
  },
  orderStatus: {
    fontWeight: '500',
    color: '#444',
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 10,
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
  },
  totalText: {
    fontWeight: 'bold',
    color: '#333',
    fontSize: 16,
  },
  detailsButton: {
    backgroundColor: '#2196F3',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 8,
  },
  detailsButtonText: {
    color: 'white',
    fontWeight: '500',
  },
  emptyText: {
    textAlign: 'center',
    color: '#666',
    marginTop: 50,
  },
  listContent: {
    paddingBottom: 20,
  },
});

export default MyOrdersPage;