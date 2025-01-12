import React, { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Card, Title, Paragraph, Button } from 'react-native-paper';

export default function MarketingScreen() {
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const generateSuggestions = () => {
    // In a real app, this would call an AI service to generate suggestions
    const mockSuggestions = [
      "Launch a summer sale campaign for outdoor products",
      "Create a loyalty program for frequent customers",
      "Implement a referral discount system",
      "Start an email marketing campaign for new product lines",
    ];
    setSuggestions(mockSuggestions);
  };

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title>Marketing Suggestions</Title>
          <Paragraph>Get AI-powered marketing suggestions based on your sales data and customer trends.</Paragraph>
          <Button mode="contained" onPress={generateSuggestions} style={styles.button}>
            Generate Suggestions
          </Button>
        </Card.Content>
      </Card>

      {suggestions.map((suggestion, index) => (
        <Card key={index} style={styles.card}>
          <Card.Content>
            <Paragraph>{suggestion}</Paragraph>
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
  button: {
    marginTop: 16,
  },
});

