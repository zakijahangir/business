import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Button, List } from 'react-native-paper';

const platforms = [
  { id: 'shopify', name: 'Shopify', icon: 'shopping' },
  { id: 'quickbooks', name: 'QuickBooks', icon: 'book-open' },
  { id: 'square', name: 'Square', icon: 'square' },
];

export default function ConnectPlatformsScreen({ navigation }) {
  const [connectedPlatforms, setConnectedPlatforms] = useState<string[]>([]);

  const handleConnect = (platformId: string) => {
    // In a real app, this would initiate the OAuth flow for the selected platform
    Alert.alert(
      'Connect Platform',
      `Connecting to ${platformId}...`,
      [
        {
          text: 'OK',
          onPress: () => {
            setConnectedPlatforms([...connectedPlatforms, platformId]);
          },
        },
      ]
    );
  };

  const handleDisconnect = (platformId: string) => {
    setConnectedPlatforms(connectedPlatforms.filter(id => id !== platformId));
  };

  return (
    <View style={styles.container}>
      <List.Section>
        {platforms.map((platform) => (
          <List.Item
            key={platform.id}
            title={platform.name}
            left={() => <List.Icon icon={platform.icon} />}
            right={() => (
              <Button
                mode="outlined"
                onPress={() => 
                  connectedPlatforms.includes(platform.id)
                    ? handleDisconnect(platform.id)
                    : handleConnect(platform.id)
                }
              >
                {connectedPlatforms.includes(platform.id) ? 'Disconnect' : 'Connect'}
              </Button>
            )}
          />
        ))}
      </List.Section>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});

