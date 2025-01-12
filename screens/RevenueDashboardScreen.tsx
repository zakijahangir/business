import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Button, Card, Title, Paragraph } from 'react-native-paper';
import { VictoryChart, VictoryLine, VictoryAxis, VictoryTheme, VictoryTooltip, VictoryVoronoiContainer } from 'victory-native';
import { fetchSalesData, analyzeRevenue } from '../utils/api';

export default function RevenueDashboardScreen() {
  const [salesData, setSalesData] = useState([]);
  const [revenueInsights, setRevenueInsights] = useState(null);
  const [dateRange, setDateRange] = useState('week');

  const loadSalesData = useCallback(async () => {
    try {
      const data = await fetchSalesData(dateRange);
      setSalesData(data);
      const insights = await analyzeRevenue(data);
      setRevenueInsights(insights);
    } catch (error) {
      console.error('Error loading sales data:', error);
      // Handle error (e.g., show an alert to the user)
    }
  }, [dateRange]);

  useEffect(() => {
    loadSalesData();
  }, [loadSalesData]);

  const totalRevenue = salesData.reduce((sum, day) => sum + day.revenue, 0);

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title>Total Revenue</Title>
          <Paragraph>${totalRevenue.toLocaleString()}</Paragraph>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title>Revenue Trend</Title>
          <VictoryChart
            theme={VictoryTheme.material}
            height={250}
            containerComponent={
              <VictoryVoronoiContainer
                labels={({ datum }) => `${datum.date.toLocaleDateString()}: $${datum.revenue}`}
                labelComponent={<VictoryTooltip />}
              />
            }
          >
            <VictoryLine
              data={salesData}
              x="date"
              y="revenue"
              style={{
                data: { stroke: "#c43a31" },
                parent: { border: "1px solid #ccc" }
              }}
            />
            <VictoryAxis
              tickFormat={(t) => `${t.getMonth() + 1}/${t.getDate()}`}
              style={{
                tickLabels: { fontSize: 10, padding: 5 }
              }}
            />
            <VictoryAxis
              dependentAxis
              tickFormat={(t) => `$${t / 1000}k`}
              style={{
                tickLabels: { fontSize: 10, padding: 5 }
              }}
            />
          </VictoryChart>
        </Card.Content>
      </Card>

      <View style={styles.buttonContainer}>
        <Button mode={dateRange === 'week' ? 'contained' : 'outlined'} onPress={() => setDateRange('week')}>Week</Button>
        <Button mode={dateRange === 'month' ? 'contained' : 'outlined'} onPress={() => setDateRange('month')}>Month</Button>
        <Button mode={dateRange === 'year' ? 'contained' : 'outlined'} onPress={() => setDateRange('year')}>Year</Button>
      </View>

      {revenueInsights && (
        <Card style={styles.card}>
          <Card.Content>
            <Title>Revenue Insights</Title>
            <Paragraph>{revenueInsights.peakSalesPeriod}</Paragraph>
            <Paragraph>{revenueInsights.underperformingProducts}</Paragraph>
            <Paragraph>{revenueInsights.profitabilityTip}</Paragraph>
          </Card.Content>
        </Card>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  card: {
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
});

