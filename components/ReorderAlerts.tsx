import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Title, Paragraph, Button } from 'react-native-paper';
import { fetchInventoryData, predictInventoryNeeds, automateReorder } from '../utils/api';

export default function ReorderAlerts() {
  const [alerts, setAlerts] = useState<{ id: string; name: string; currentStock: number; reorderThreshold: number }[]>([]);

  useEffect(() => {
    checkInventoryLevels();
  }, []);

  const checkInventoryLevels = async () => {
    try {
      const inventoryData = await fetchInventoryData();
      const lowStockItems = inventoryData.filter(item => item.currentStock <= item.reorderThreshold);
      setAlerts(lowStockItems);
    } catch (error) {
      console.error('Error checking inventory levels:', error);
    }
  };

  const handleReorder = async (productId: string) => {
    try {
      const prediction = await predictInventoryNeeds(productId);
      const { orderId } = await automateReorder(productId, prediction.suggestedReorderAmount);
      console.log(`Automated reorder created: ${orderId}`);
      // In a real app, you would update the UI to show the order was created
      checkInventoryLevels(); // Refresh alerts
    } catch (error) {
      console.error('Error creating automated reorder:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Title style={styles.title}>Reorder Alerts</Title>
      {alerts.map(item => (
        <Card key={item.id} style={styles.card}>
          <Card.Content>
            <Title>{item.name}</Title>
            <Paragraph>Current Stock: {item.currentStock}</Paragraph>
            <Paragraph>Reorder Threshold: {item.reorderThreshold}</Paragraph>
            <Button mode="contained" onPress={() => handleReorder(item.id)} style={styles.button}>
              Reorder
            </Button>
          </Card.Content>
        </Card>
      ))}
      {alerts.length === 0 && (
        <Paragraph>No reorder alerts at this time.</Paragraph>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 20,
    marginBottom: 16,
  },
  card: {
    marginBottom: 16,
  },
  button: {
    marginTop: 8,
  },
});

