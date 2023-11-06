import React, { useState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { PieChart, BarChart } from "react-native-chart-kit";

const { width, height } = Dimensions.get("window");

const EventAnalytics = ({ eventinfo }) => {

  
 
 //const [event, setEvent] = useState(pastevent);
 // const [budget, setBudget] = useState(pastevent);
  //const [ticket, setTicket] = useState(Number(pastevent.soldTickets) || 0);
 // const [allTickets, setAllTickets] = useState(
 //   Number(pastevent.ticketCount) || 0
 // );
 // const [crowd, setCrowd] = useState(Number(pastevent.participatedCrowd));
 // const [expectedCrowd, setExpectedCrowd] = useState(
//    Number(pastevent.expectedCrowd)
 //);
 // const [expectedBudget, setExpectedBudget] = useState(
   // Number(pastevent.expectedBudget)
  //);

  console.log(eventinfo);
  const pieChartConfig = {
    backgroundGradientFrom: "#f9f9f9",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#f9f9f9",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: false,
  };

  const barChartConfig = {
    backgroundGradientFrom: "#f9f9f9",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#ffa726",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 3) => `rgba(0, 0, 0, ${opacity})`,
  };

  const pieChartData = [
    {
      name: "Sold Tickets",
      ticket: eventinfo.soldTickets,
      color: "darkred",
      legendFontColor: "#7F7F7F",
      legendFontSize: 12,
    },
    {
      name: "Available Tickets",
      ticket: eventinfo.ticketCount,
      color: "#ffa726",
      legendFontColor: "#7F7F7F",
      legendFontSize: 12,
    },
  ];

  const budgetData = {
    labels: ["Budget", "Ex.Budget"],
    datasets: [
      {
        data: [eventinfo.soldTickets*eventinfo.ticketPrice,eventinfo.expectedBudget],
      },
    ],
  };
  const crowdData = {
    labels: ["Expected Crowd", "Participated Crowd"],
    datasets: [
      {
        data: [eventinfo.expectedCrowd,eventinfo.soldTickets],
      },
    ],
    color: "#ffa726",
  };

  return (
    <View style={styles.container}>
      <Text style={styles.analyticsHeader}>Event Analytics</Text>

      <Text style={{ fontSize: width * 0.05, fontWeight: "bold" }}>
        Ticket Data
      </Text>
      <View style={styles.ticketData}>
        <PieChart
          data={pieChartData}
          width={width * 0.9}
          height={height * 0.3}
          chartConfig={pieChartConfig}
          accessor={"ticket"}
          backgroundColor={"transparent"}
          absolute
        />
      </View>

      <View style={styles.barCharts}>
        <Text style={{ fontSize: width * 0.05, fontWeight: "bold" }}>
          Ticket Data
        </Text>
        <BarChart
          data={budgetData}
          width={width * 0.9}
          height={height * 0.3}
          chartConfig={barChartConfig}
          fromZero={true}
          showValuesOnTopOfBars={true}
        />
        <Text style={{ fontSize: width * 0.05, fontWeight: "bold" }}>
          Crowd
        </Text>
        <BarChart
          data={crowdData}
          width={width * 0.9}
          height={height * 0.3}
          chartConfig={barChartConfig}
          fromZero={true}
          showValuesOnTopOfBars={true}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f9f9f9",
    padding: 16,
    borderRadius: 10,
    margin: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
    marginTop: height * 0.05,
    flex: 1,
  },
  analyticsHeader: {
    fontFamily: "DMMedium",
    fontSize: width * 0.08,
    letterSpacing: 3,
    color: "black",
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  ticketData: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: height * 0.05,
  },
  barCharts: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
});

export default EventAnalytics;
