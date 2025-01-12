import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Card, Title, Paragraph, DataTable, Button, TextInput } from 'react-native-paper';

const mockSuppliers = [
  { id: '1', name: 'Supplier A', performance: 4.5, deliveryTime: '2-3 days', contractEnd: '2023-12-31' },
  { id: '2', name: 'Supplier B', performance: 3.8, deliveryTime: '3-5 days', contractEnd: '2024-06-30' },
  { id: '3', name: 'Supplier C', performance: 4.2, deliveryTime: '1-2 days', contractEnd: '2023-09-30' },
];

export default function SuppliersScreen() {
  const [suppliers, setSuppliers] = useState(mockSuppliers);
  const [newSupplierName, setNewSupplierName] = useState('');

  const addSupplier = () => {
    if (newSupplierName.trim()) {
      const newSupplier = {
        id: (suppliers.length + 1).toString(),
        name: newSupplierName,
        performance: 0,
        deliveryTime: 'N/A',
        contractEnd: 'N/A',
      };
      setSuppliers([...suppliers, newSupplier]);
      setNewSupplierName('');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title>Supplier Management</Title>
          <Paragraph>Track and manage your suppliers:</Paragraph>
          
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>Name</DataTable.Title>
              <DataTable.Title numeric>Performance</DataTable.Title>
              <DataTable.Title>Delivery Time</DataTable.Title>
              <DataTable.Title>Contract End</DataTable.Title>
            </DataTable.Header>

            {suppliers.map((supplier) => (
              <DataTable.Row key={supplier.id}>
                <DataTable.Cell>{supplier.name}</DataTable.Cell>
                <DataTable.Cell numeric>{supplier.performance}</DataTable.Cell>
                <DataTable.Cell>{supplier.deliveryTime}</DataTable.Cell>
                <DataTable.Cell>{supplier.contractEnd}</DataTable.Cell>
              </DataTable.Row>
            ))}
          </DataTable>

          <View style={styles.addSupplierContainer}>
            <TextInput
              value={newSupplierName}
              onChangeText={setNewSupplierName}
              placeholder="New supplier name"
              style={styles.input}
            />
            <Button mode="contained" onPress={addSupplier}>Add Supplier</Button>
          </View>
        </Card.Content>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    marginBottom: 16,
  },
  addSupplierContainer: {
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    marginRight: 8,
  },
});

