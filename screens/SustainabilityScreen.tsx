import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Card, Title, Paragraph, Button, ProgressBar } from 'react-native-paper';

export default function SustainabilityScreen() {
  const [sustainabilityScore, setSustainabilityScore] = useState(0.6);
  const [ecoFriendlyAlternatives, setEcoFriendlyAlternatives] = useState<string[]>([]);

  const calculateSustainabilityScore = () => {
    // In a real app, this would calculate the score based on various factors
    const newScore = Math.random();
    setSustainabilityScore(newScore);
  };

  const suggestEcoFriendlyAlternatives = () => {
    // In a real app, this would call an AI service to generate suggestions
    const mockAlternatives = [
      "Replace plastic packaging with biodegradable materials",
      "Switch to a local supplier to reduce transportation emissions",
      "Implement a product recycling program",
      "Use renewable energy in manufacturing processes",
    ];
    setEcoFriendlyAlternatives(mockAlternatives);
  };

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title>Sustainability Tracker</Title>
          <Paragraph>Track the environmental impact of your supply chain:</Paragraph>
          <View style={styles.scoreContainer}>
            <Paragraph>Sustainability Score:</Paragraph>
            <ProgressBar progress={sustainabilityScore} color={sustainabilityScore > 0.6 ? 'green' : 'orange'} style={styles.progressBar} />
            <Paragraph>{(sustainabilityScore * 100).toFixed(1)}%</Paragraph>
          </View>
          <Button mode="contained" onPress={calculateSustainabilityScore} style={styles.button}>
            Recalculate Score
          </Button>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title>Eco-Friendly Suggestions</Title>
          <Button mode="contained" onPress={suggestEcoFriendlyAlternatives} style={styles.button}>
            Get Suggestions
          </Button>
          {ecoFriendlyAlternatives.map((alternative, index) => (
            <Paragraph key={index} style={styles.suggestion}>{alternative}</Paragraph>
          ))}
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
  scoreContainer: {
    marginVertical: 16,
  },
  progressBar: {
    height: 10,
    marginVertical: 8,
  },
  button: {
    marginTop: 16,
  },
  suggestion: {
    marginTop: 8,
  },
});

