import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Card, Title, Paragraph, Button, Menu } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function ReportsScreen() {
  const [reportType, setReportType] = useState('revenue');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);

  const generateReport = () => {
    // Here you would generate the report based on the selected options
    console.log(`Generating ${reportType} report from ${startDate.toDateString()} to ${endDate.toDateString()}`);
  };

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title>Customizable Reports</Title>
          <Paragraph>Select report type and date range:</Paragraph>
          
          <Menu
            visible={menuVisible}
            onDismiss={() => setMenuVisible(false)}
            anchor={<Button onPress={() => setMenuVisible(true)}>{reportType.charAt(0).toUpperCase() + reportType.slice(1)}</Button>}
          >
            <Menu.Item onPress={() => { setReportType('revenue'); setMenuVisible(false); }} title="Revenue" />
            <Menu.Item onPress={() => { setReportType('expenses'); setMenuVisible(false); }} title="Expenses" />
            <Menu.Item onPress={() => { setReportType('inventory'); setMenuVisible(false); }} title="Inventory" />
            <Menu.Item onPress={() => { setReportType('savings'); setMenuVisible(false); }} title="Cost Savings" />
          </Menu>

          <View style={styles.dateContainer}>
            <Button onPress={() => setShowStartPicker(true)}>Start Date: {startDate.toDateString()}</Button>
            {showStartPicker && (
              <DateTimePicker
                value={startDate}
                mode="date"
                display="default"
                onChange={(event, selectedDate) => {
                  setShowStartPicker(false);
                  if (selectedDate) setStartDate(selectedDate);
                }}
              />
            )}
          </View>

          <View style={styles.dateContainer}>
            <Button onPress={() => setShowEndPicker(true)}>End Date: {endDate.toDateString()}</Button>
            {showEndPicker && (
              <DateTimePicker
                value={endDate}
                mode="date"
                display="default"
                onChange={(event, selectedDate) => {
                  setShowEndPicker(false);
                  if (selectedDate) setEndDate(selectedDate);
                }}
              />
            )}
          </View>

          <Button mode="contained" onPress={generateReport} style={styles.generateButton}>
            Generate Report
          </Button>
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
  dateContainer: {
    marginVertical: 8,
  },
  generateButton: {
    marginTop: 16,
  },
});

