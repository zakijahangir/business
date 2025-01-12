import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Card, Title, Paragraph, Button, DataTable } from 'react-native-paper';
import { fetchSubscriptionPlans, upgradePlan, SubscriptionPlan } from '../utils/api';

const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    features: ['Basic product recommendations', 'Limited revenue tracking', 'Up to 100 products'],
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 29.99,
    features: ['Advanced AI-driven insights', 'Unlimited revenue tracking', 'Up to 1000 products', 'Email support'],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 99.99,
    features: ['Custom AI models', 'Unlimited products', 'Priority support', 'Custom integrations'],
  },
];

export default function SubscriptionScreen() {
  const [currentPlan, setCurrentPlan] = useState<string>('free');
  const [subscriptionPlans, setSubscriptionPlans] = useState<SubscriptionPlan[]>([]);

  useEffect(() => {
    loadSubscriptionPlans();
  }, []);

  const loadSubscriptionPlans = async () => {
    try {
      const plans = await fetchSubscriptionPlans();
      setSubscriptionPlans(plans);
    } catch (error) {
      console.error('Error loading subscription plans:', error);
    }
  };

  const handleUpgrade = async (planId: string) => {
    try {
      await upgradePlan(planId);
      setCurrentPlan(planId);
    } catch (error) {
      console.error('Error upgrading plan:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title>Subscription Plans</Title>
          <Paragraph>Choose the plan that best fits your business needs:</Paragraph>
        </Card.Content>
      </Card>

      {subscriptionPlans.map(plan => (
        <Card key={plan.id} style={styles.card}>
          <Card.Content>
            <Title>{plan.name}</Title>
            <Paragraph>${plan.price}/month</Paragraph>
            <DataTable>
              <DataTable.Header>
                <DataTable.Title>Features</DataTable.Title>
              </DataTable.Header>
              {plan.features.map((feature, index) => (
                <DataTable.Row key={index}>
                  <DataTable.Cell>{feature}</DataTable.Cell>
                </DataTable.Row>
              ))}
            </DataTable>
            {currentPlan !== plan.id ? (
              <Button mode="contained" onPress={() => handleUpgrade(plan.id)} style={styles.upgradeButton}>
                Upgrade
              </Button>
            ) : (
              <Button mode="outlined" disabled style={styles.upgradeButton}>
                Current Plan
              </Button>
            )}
          </Card.Content>
        </Card>
      ))}
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
  upgradeButton: {
    marginTop: 16,
  },
});

