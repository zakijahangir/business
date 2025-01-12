import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, ScrollView } from 'react-native';
import { Button } from 'react-native-paper';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import { StackNavigationProp } from '@react-navigation/stack';
import { MainTabParamList } from '../App';
import ReorderAlerts from '../components/ReorderAlerts';

type HomeScreenNavigationProp = StackNavigationProp<MainTabParamList, 'Home'>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

export default function HomeScreen({ navigation }: Props) {
  const [fileName, setFileName] = useState<string | null>(null);

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'text/csv'],
      });

      if (result.type === 'success') {
        setFileName(result.name);
      }
    } catch (err) {
      console.error('Error picking document:', err);
      Alert.alert('Error', 'Failed to pick document');
    }
  };

  const analyzeDocument = async () => {
    if (!fileName) {
      Alert.alert('Error', 'Please select a file first');
      return;
    }

    try {
      const fileUri = FileSystem.documentDirectory + fileName;
      const fileContent = await FileSystem.readAsStringAsync(fileUri);

      const response = await fetch('https://your-api-endpoint.com/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fileContent }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const analysisResult = await response.json();
      navigation.navigate('Dashboard', { analysisResult });
    } catch (error) {
      console.error('Error analyzing document:', error);
      Alert.alert('Error', 'Failed to analyze document. Please try again.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Procurement AI Assistant</Text>
      <Button mode="contained" onPress={pickDocument} style={styles.button}>
        Select Product List
      </Button>
      {fileName && <Text style={styles.fileName}>Selected: {fileName}</Text>}
      <Button mode="contained" onPress={analyzeDocument} style={styles.button} disabled={!fileName}>
        Analyze Products
      </Button>
      <Button 
        mode="outlined" 
        onPress={() => navigation.navigate('Revenue')} 
        style={styles.button}
      >
        View Revenue Dashboard
      </Button>
      <Button 
        mode="outlined" 
        onPress={() => navigation.navigate('Inventory')} 
        style={styles.button}
      >
        Manage Inventory
      </Button>
      <ReorderAlerts />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    marginVertical: 10,
  },
  fileName: {
    marginTop: 10,
    fontSize: 16,
  },
});

