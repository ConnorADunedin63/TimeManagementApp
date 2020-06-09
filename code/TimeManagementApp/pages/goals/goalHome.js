import React, { useState, useEffect } from 'react';
import {
  Button,
  SafeAreaView,
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
import {createStackNavigator} from '@react-navigation/stack';

// Import stylesheet
import styles from '../css/homeStyles.js';

// Import pages
import CreateGoal from './createGoals.js';
import EditGoal from './editGoal.js';

import { getGoals, clearGoals, deleteGoal } from '../../logic/goals.js';
import { convertTo12HourFormat, formatDate } from '../../helpers/timeHelper.js';

export default function GoalsStack() {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen options={{headerShown: false}} name="Home" component={GoalsHomeScreen} />
      <Stack.Screen name="Create Goal" component={CreateGoal} />
      <Stack.Screen name="Edit Goal" component={EditGoal} />
    </Stack.Navigator>
  );
}

function GoalsHomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
        <View style={{flex: 8}}>
          <View style={styles.sectionContainer}>
            <View style={styles.sectionHeader}>
              <View style={{ flex: 1, alignItems: 'flex-start'}}>
                <Text style={styles.sectionTitle}>Goals</Text>
              </View>
              <View style={{ flex: 1, alignItems: 'flex-end', marginRight: 20, marginTop: 5}}>
                <Button
                title='Clear Goals'
                color='red'
                onPress={() => {
                  Alert.alert(
                    'Clear all goals?',
                    'Are you sure you wish to clear all goals?',
                    [
                      {text: 'No'},
                      {text: 'Yes', onPress: () => { clearGoals();}}
                    ]
                  )
                }}></Button>
              </View>
            </View>
            {goalsTable(navigation)}
            <View style={{flex: 0.5, alignItems: "center", marginTop: 10}}>
              <Button title="Create Goal" onPress={() => {navigation.navigate('Create Goal')}}></Button>
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
function goalsTable(navigation) {
  const [goals, setGoals] = useState(null);
  const [filter, setFilter] = useState('All');
  useEffect(() => {
    async function setGoalState() {
      let currentGoals = await getGoals(filter);
      await setGoals(currentGoals);
    }

    setGoalState();
  }, [goals, filter]);

  // This is a temporary loading screen while the goals are loaded from asynchronous storage
  if(goals === null) {
    return(
      <>
        {filterDetails(filter, setFilter)}
        <ScrollView style={styles.tableContainer}>
          <View style={styles.sectionTable}>
            <View style={styles.tableRowEmpty}>
              <Text>Loading...</Text>
            </View>
          </View>
        </ScrollView>
      </>
    )
  }
  else if(goals.length > 0) {
    return(
      <>
        {filterDetails(filter, setFilter)}
        <ScrollView style={styles.tableContainer}>
          <View style={styles.sectionTable}>
            <View style={styles.tableHeader}>
              <View style={styles.rowItem}>
                <Text>Name</Text>
              </View>
              <View style={styles.rowItem}>
                <Text>Due Date</Text>
              </View>
              <View style={styles.rowItem} />
            </View>
            {
              goals.map((item, index) => {
                return (
                  <TouchableOpacity style={index % 2 == 0 ? styles.tableRowEven : styles.tableRowOdd}
                  key={item.key} onPress={() => {navigation.navigate("Edit Goal", {goal: JSON.stringify(item)})}}>
                    <View style={styles.rowItem}>
                      <Text>{item.name}</Text>
                    </View>
                    <View style={styles.rowItem}>
                      <Text style={item.date === "N/A" ? {display: 'none'} : ''}>{convertTo12HourFormat(item.date)}</Text>
                      <Text>{formatDate(item.date)}</Text>
                    </View>
                    <View style={styles.deleteItem}>
                      <Button title='Delete'
                      color='red'
                      onPress={() => {
                        Alert.alert(
                          "Delete This Goal?",
                          "Are you sure you want to delete this goal?",
                          [
                            {text: 'No'},
                            {text: 'Yes', onPress: () => { deleteGoal(item.key);}}
                          ]
                        )
                      }}/>
                    </View>
                  </TouchableOpacity>
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
      <>
        {filterDetails(filter, setFilter)}
        <ScrollView style={styles.tableContainer}>
          <View style={styles.sectionTable}>
            <View style={styles.tableRowEmpty}>
              <Text>No Goals to Display</Text>
            </View>
          </View>
        </ScrollView>
      </>
    );
  }
}

function filterDetails(filter, setFilter) {
  return (
    <>
      <View style={{flexDirection: 'row', marginLeft: 10, marginRight: 20, marginBottom: 10, marginTop: 10}}>
        <View style={{alignItems: 'center', marginRight: 10}}>
          <Button title="All" color={filter === 'All' ? 'green' : ''} onPress={() => {setFilter("All")}} />
        </View>
        <View style={{alignItems: 'center', marginRight: 10}}>
          <Button title="Ongoing" color={filter === 'Ongoing' ? 'green': ''} onPress={() => {setFilter("Ongoing")}} />
        </View>
        <View style={{alignItems: 'center', marginRight: 10}}>
          <Button title="Short Term" color={filter == 'Short Term' ? 'green' : ''} onPress={() => {setFilter("Short Term")}} />
        </View>
        <View>
          <Button title="Long Term" color={filter === 'Long Term' ? 'green': ''} onPress={() => {setFilter("Long Term")}}/>
        </View>
      </View>
      <View style={{flexDirection: 'row'}}>
        <View style={{flex: 1, alignItems: 'flex-start', marginLeft: 10}}>
          <Text style={{color: 'white'}}>Click to goal to view</Text>
        </View>
        <View style={{flex: 1, alignItems: 'center', marginRight: 10}}>
          <Text style={{color: 'white'}}>Current Filter: {filter}</Text>
        </View>
      </View>
    </>
  );
}
