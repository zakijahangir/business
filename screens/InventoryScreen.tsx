import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Alert } from 'react-native';
import { Card, Title, Paragraph, Button, TextInput, DataTable } from 'react-native-paper';
import { fetchInventoryData, updateInventoryItem, setReorderThreshold } from '../utils/api';

type InventoryItem = {
  id: string;
  name: string;
  currentStock: number;
  reorderThreshold: number;
};

export default function InventoryScreen() {
  const [inventoryData, setInventoryData] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadInventoryData();
  }, []);

  const loadInventoryData = async () => {
    try {
      const data = await fetchInventoryData();
      setInventoryData(data);
      setLoading(false);
    } catch (error) {
      console.error('Error loading inventory data:', error);
      Alert.alert('Error', 'Failed to load inventory data. Please try again.');
    }
  };

  const handleUpdateStock = async (id: string, newStock: number) => {
    try {
      await updateInventoryItem(id, { currentStock: newStock });
      loadInventoryData(); // Reload data after update
    } catch (error) {
      console.error('Error updating stock:', error);
      Alert.alert('Error', 'Failed to update stock. Please try again.');
    }
  };

  const handleSetThreshold = async (id: string, threshold: number) => {
    try {
      await setReorderThreshold(id, threshold);
      loadInventoryData(); // Reload data after update
    } catch (error) {
      console.error('Error setting threshold:', error);
      Alert.alert('Error', 'Failed to set reorder threshold. Please try again.');
    }
  };

  const renderItem = ({ item }: { item: InventoryItem }) => (
    <Card style={styles.card}>
      <Card.Content>
        <Title>{item.name}</Title>
        <Paragraph>Current Stock: {item.currentStock}</Paragraph>
        <Paragraph>Reorder Threshold: {item.reorderThreshold}</Paragraph>
        <View style={styles.inputContainer}>
          <TextInput
            label="Update Stock"
            keyboardType="numeric"
            style={styles.input}
            onSubmitEditing={({ nativeEvent }) => {
              const newStock = parseInt(nativeEvent.text, 10);
              if (!isNaN(newStock)) {
                handleUpdateStock(item.id, newStock);
              }
            }}
          />
          <TextInput
            label="Set Threshold"
            keyboardType="numeric"
            style={styles.input}
            onSubmitEditing={({ nativeEvent }) => {
              const newThreshold = parseInt(nativeEvent.text, 10);
              if (!isNaN(newThreshold)) {
                handleSetThreshold(item.id, newThreshold);
              }
            }}
          />
        </View>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <Title style={styles.title}>Inventory Management</Title>
      {loading ? (
        <Paragraph>Loading inventory data...</Paragraph>
      ) : (
        <FlatList
          data={inventoryData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      )}
      <Button mode="contained" onPress={loadInventoryData} style={styles.button}>
        Refresh Inventory
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  card: {
    marginBottom: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  input: {
    flex: 1,
    marginRight: 8,
  },
  button: {
    marginTop: 16,
  },
});

