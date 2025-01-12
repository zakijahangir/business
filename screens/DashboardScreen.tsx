import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Card, Title, Paragraph, Button } from 'react-native-paper';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';
import ReorderAlerts from '../components/ReorderAlerts';
import RevenueChart from '../components/RevenueChart';
import AIChatbot from '../components/AIChatbot';

type DashboardScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Main'>;

export default function DashboardScreen() {
  const navigation = useNavigation<DashboardScreenNavigationProp>();

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title>Welcome to Your Procurement Dashboard</Title>
          <Paragraph>Here's an overview of your business:</Paragraph>
        </Card.Content>
      </Card>

      <RevenueChart />
      <ReorderAlerts />

      <Card style={styles.card}>
        <Card.Content>
          <Title>Quick Actions</Title>
          <View style={styles.buttonContainer}>
            <Button mode="contained" onPress={() => navigation.navigate('Reports')} style={styles.button}>
              Generate Reports
            </Button>
            <Button mode="contained" onPress={() => navigation.navigate('Suppliers')} style={styles.button}>
              Manage Suppliers
            </Button>
            <Button mode="contained" onPress={() => navigation.navigate('Marketing')} style={styles.button}>
              Marketing Insights
            </Button>
            <Button mode="contained" onPress={() => navigation.navigate('Sustainability')} style={styles.button}>
              Sustainability Tracker
            </Button>
            <Button mode="contained" onPress={() => navigation.navigate('Integrations')} style={styles.button}>
              Manage Integrations
            </Button>
            <Button mode="contained" onPress={() => navigation.navigate('Subscription')} style={styles.button}>
              Subscription Plans
            </Button>
          </View>
        </Card.Content>
      </Card>

      <AIChatbot />
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
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  button: {
    width: '48%',
    marginBottom: 16,
  },
});

