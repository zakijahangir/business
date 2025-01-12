import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Title } from 'react-native-paper';
import { VictoryChart, VictoryLine, VictoryAxis, VictoryTheme } from 'victory-native';

const mockData = [
  { x: 1, y: 13000 },
  { x: 2, y: 16500 },
  { x: 3, y: 14250 },
  { x: 4, y: 19000 },
  { x: 5, y: 18000 },
  { x: 6, y: 21000 },
  { x: 7, y: 22500 },
];

export default function RevenueChart() {
  return (
    <Card style={styles.card}>
      <Card.Content>
        <Title>Revenue Overview</Title>
        <View style={styles.chartContainer}>
          <VictoryChart theme={VictoryTheme.material} height={250}>
            <VictoryLine
              data={mockData}
              style={{
                data: { stroke: "#c43a31" },
                parent: { border: "1px solid #ccc" }
              }}
            />
            <VictoryAxis
              label="Week"
              style={{
                axisLabel: { padding: 30 }
              }}
            />
            <VictoryAxis
              dependentAxis
              label="Revenue ($)"
              style={{
                axisLabel: { padding: 40 }
              }}
            />
          </VictoryChart>
        </View>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
  },
  chartContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

