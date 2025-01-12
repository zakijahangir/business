import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Card, Title, Paragraph, Button, Switch } from 'react-native-paper';
import { fetchIntegrations, connectIntegration, disconnectIntegration, Integration } from '../utils/api';

const initialIntegrations: Integration[] = [
  {
    id: 'quickbooks',
    name: 'QuickBooks',
    description: 'Connect your accounting data',
    connected: false,
  },
  {
    id: 'zoho',
    name: 'Zoho Inventory',
    description: 'Sync your inventory data',
    connected: false,
  },
  {
    id: 'shopify',
    name: 'Shopify',
    description: 'Integrate your e-commerce platform',
    connected: false,
  },
];

export default function IntegrationsScreen() {
  const [integrations, setIntegrations] = useState<Integration[]>([]);

  useEffect(() => {
    loadIntegrations();
  }, []);

  const loadIntegrations = async () => {
    try {
      const data = await fetchIntegrations();
      setIntegrations(data);
    } catch (error) {
      console.error('Error loading integrations:', error);
    }
  };

  const toggleIntegration = async (id: string) => {
    try {
      const integration = integrations.find(i => i.id === id);
      if (integration) {
        if (integration.connected) {
          await disconnectIntegration(id);
        } else {
          await connectIntegration(id);
        }
        await loadIntegrations();
      }
    } catch (error) {
      console.error('Error toggling integration:', error);
    }
  };

  const handleConnect = (id: string) => {
    // In a real app, this would initiate the OAuth flow or API connection process
    console.log(`Connecting to ${id}...`);
    //toggleIntegration(id);
  };

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title>Integrations</Title>
          <Paragraph>Connect your existing tools and platforms:</Paragraph>
        </Card.Content>
      </Card>

      {integrations.map(integration => (
        <Card key={integration.id} style={styles.card}>
          <Card.Content>
            <View style={styles.integrationHeader}>
              <Title>{integration.name}</Title>
              <Switch
                value={integration.connected}
                onValueChange={() => toggleIntegration(integration.id)}
              />
            </View>
            <Paragraph>{integration.description}</Paragraph>
            {!integration.connected && (
              <Button mode="contained" onPress={() => handleConnect(integration.id)} style={styles.connectButton}>
                Connect
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
  integrationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  connectButton: {
    marginTop: 8,
  },
});

