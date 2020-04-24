import React, { useState, useEffect } from 'react';
import {
  Button,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  TextInput,
  TouchableOpacity,
  Alert
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import {NavigationContainer} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

import { getGoals, clearGoals } from '../logic/goals.js';
import { convertTo12HourFormat } from '../helpers/timeHelper.js';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    backgroundColor: '#20639B'
  },
  quoteContainer: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'stretch',
    paddingLeft: 10,
    paddingRight: 10
  },
  quote: {
    color: 'white',
    fontStyle: 'italic',
    fontSize: 16
  },
  sectionContainer: {
     flex: 4,
     alignItems: 'stretch'
  },
  sectionHeader: {
    flex: 0.5,
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  sectionTitle: {
    marginLeft: 10,
    fontSize: 32,
    textDecorationLine: 'underline',
    color: 'white'
  },
  tableContainer: {
    flex: 3,
    marginLeft: 10,
    marginRight: 20,
  },
  sectionTable: {
    flex: 1,
    alignItems: "stretch",
    backgroundColor: 'white'
  },
  tableHeader: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 1,
  },
  rowItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  tableRowEmpty: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  tableRowEven: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start'
  },
  tableRowOdd: {
    height: 50,
    backgroundColor: '#D3D3D3',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start'
  },
});

export default function HomeScreen({ navigation }) {
  const [quoteExpanded, expandQuote] = useState(false);


  return (
    <View style={styles.container}>
        {quote(quoteExpanded, expandQuote)}
        <View style={quoteExpanded == false ? {flex: 8} : {flex: 2}}>
          <View style={styles.sectionContainer}>
            <View style={styles.sectionHeader}>
              <View style={{ flex: 1, alignItems: 'flex-start'}}>
                <Text style={styles.sectionTitle}>Goals</Text>
              </View>
              <View style={{ flex: 1, alignItems: 'flex-end', marginRight: 20, marginTop: 5}}>
                <Button title='Clear Goals' color='red'
                onPress={() => {
                  Alert.alert(
                    'Clear all goals?',
                    'Are you sure you wish to clear all goals?',
                    [
                      {text: 'No'},
                      {text: 'Yes', onPress: () => { clearGoals(); alert("Goals Cleared!") }}
                    ]
                  )
                }}></Button>
              </View>
            </View>
            {goalsTable()}
            <View style={{flex: 0.5, alignItems: "center", marginTop: 10}}>
              <Button title="Create Goal" onPress={() => {navigation.navigate('Create Goal')}}></Button>
            </View>
          </View>
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Checklists</Text>
            <View style={{flex: 0.25, alignItems: "center", marginTop: 10}}>
              <Button title="Create Checklist"></Button>
            </View>
          </View>
        </View>
    </View>
  );
}

/**
  Displays the goals table, shows the name and description.
  The rows should be selectable to edit.
*/
function goalsTable() {
  const [goals, setGoals] = useState(null);
  useEffect(() => {
    async function setGoalState() {
      let currentGoals = await getGoals();
      setGoals(currentGoals);
    }

    setGoalState();
  }, [goals]);

  // This is a temporary loading screen while the goals are loaded from asynchronous storage
  if(goals === null) {
    return(
      <ScrollView style={styles.tableContainer}>
        <View style={styles.sectionTable}>
          <View style={styles.tableRowEmpty}>
            <Text>Loading...</Text>
          </View>
        </View>
      </ScrollView>
    )
  }
  else if(goals.length > 0) {
    return(
      <>
        <Text style={{marginLeft: 10, color: 'white'}}>Click to goal to view</Text>
        <ScrollView style={styles.tableContainer}>
          <View style={styles.sectionTable}>
            <View style={styles.tableHeader}>
              <View style={styles.rowItem}>
                <Text>Name</Text>
              </View>
              <View style={styles.rowItem}>
                <Text>Due Date</Text>
              </View>
            </View>
            {
              goals.map((item) => {
                return (
                  <View style={item.key % 2 == 0 ? styles.tableRowEven : styles.tableRowOdd} key={item.key}>
                    <View style={styles.rowItem}>
                      <Text>{item.name}</Text>
                    </View>
                    <View style={styles.rowItem}>
                      <Text>{convertTo12HourFormat(item.date)}</Text>
                      <Text>{item.date.getDate() + "/" + item.date.getMonth() + "/" + item.date.getFullYear()}</Text>
                    </View>
                  </View>
                );
              })
            }
          </View>
        </ScrollView>
      </>
    );
  }
  // No goals are present
  else {
    return(
      <ScrollView style={styles.tableContainer}>
        <View style={styles.sectionTable}>
          <View style={styles.tableRowEmpty}>
            <Text>No Goals to Display</Text>
          </View>
        </View>
      </ScrollView>
    );
  }
}

/**
  Displays the daily quote at the top of the screen.
  The quote can be expanded to give more information when clicked.
*/
function quote(expanded, setExpanded) {
  // Quotes is a 2D array, each sub array will contain a minimised version and an expanded version
  const quotes = [
    [
      "Understand what is in your control and what is not",
      "It is important to understand that some things in life are in our control and others are not. \n Instead of focussing on what is not in our control we should focus on what we can."
    ],
    [
      "Remember the nature of things",
      "In life everything is temporary, items brake and loved ones die. It is important that we realise this so we can be aware that a loved one could be taken from us at any time and that one day they will die no matter what we do. Remembering this will allow us to make the most of the time with loved ones and when they do one day die we can remember that this is the natural order of things."
    ],
    [
      "Its your judgements that disturb you, not the event",
      "Events do not cause you distress, your judgements do. In life we cannot control events that happen, like a boat at sea we are at the mercy of the waves and are just along for the ride. We are not helpless, we can control how we react to an event and how we view them. Event the most hideous events in history often lead to positive change after the fact."
    ],
    [
      "Ignore what other people think of you",
      "When somebody insults you there are only two views. Either they speak the truth and you can learn something or they are talking bullshit and you can ignore them. When someone speaks the truth why get upset by what is visible to all."
    ],
  ];

  return(
    <TouchableOpacity style={styles.quoteContainer} onPress={() => {setExpanded(!expanded)}}>
      <Text style={styles.quote}>{expanded ? quotes[0][1] : quotes[0][0]}</Text>
      <Text style={{color: 'white', alignSelf: 'flex-end', marginTop: 10}}>Click to {expanded ? 'minimise' : 'expand'}</Text>
    </TouchableOpacity>
  )
}
