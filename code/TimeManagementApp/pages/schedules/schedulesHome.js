import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {
  Alert,
  Button,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  TextInput,
  TouchableOpacity
} from 'react-native';

import styles from '../css/scheduleHomeStyles.js';

import {getSchedules, deleteSchedule} from '../../logic/schedules.js';

import TodaySchedule from './todaySchedule.js';
import CreateSchedule from './createSchedule.js';
import CreateScheduleTask from './scheduleTask.js';

export default function SchedulesStack() {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator initialRouteName="SchedulesHome">
      <Stack.Screen options={{headerShown: false}} name="SchedulesHome" component={SchedulesHome} />
      <Stack.Screen options={{headerShown: true}} name="TodaySchedule" component={TodaySchedule} />
      <Stack.Screen options={{headerShown: true}} name="CreateSchedule" component={CreateSchedule} />
      <Stack.Screen options={{headerShown: true}} name="CreateScheduleTask" component={CreateScheduleTask} />
    </Stack.Navigator>
  );
}

function SchedulesHome({ navigation }) {
  return (
    <View style={styles.bodyContainer}>
      <View style={styles.innerContainer}>
        <View style={{alignItems: 'center'}}>
          <Text style={styles.pageTitle}>Daily Schedules</Text>
        </View>
        <View style={styles.todayButton}>
          <Button title="View today's schedule" onPress={() => {navigation.navigate("TodaySchedule")}} />
        </View>
        <View style={{marginTop: 10}}>
          <Text style={styles.tableTitle}>Current Schedules</Text>
        </View>
        {schedulesTable(navigation)}
        <View style={{marginTop: 10}}>
          <Button title="Create Schedule" onPress={() => {navigation.navigate("CreateSchedule")}} />
        </View>
      </View>
    </View>
  );
}

/**
  Displays the goals table, shows the name and description.
  The rows should be selectable to edit.
*/
function schedulesTable(navigation) {
  const [schedules, setSchedules] = useState(null);

  useEffect(() => {
    async function setSchedulesState() {
      let currentSchedules = await getSchedules();
      setSchedules(currentSchedules);
    }

    setSchedulesState()
  }, [schedules]);

  // This is a temporary loading screen while the goals are loaded from asynchronous storage
  if(schedules === null || schedules === undefined) {
    return(
      <>
        <ScrollView>
          <View style={styles.sectionTable}>
            <View style={styles.tableRowEmpty}>
              <Text>Loading...</Text>
            </View>
          </View>
        </ScrollView>
      </>
    )
  }
  else if(schedules.length > 0) {
    return(
      <>
        <ScrollView>
          <View style={styles.sectionTable}>
            {
              schedules.map((item, index) => {
                return (
                  <TouchableOpacity style={index % 2 == 0 ? styles.tableRowEven : styles.tableRowOdd}
                  key={item.name}>
                    <View style={styles.rowItem}>
                      <Text>{item.name}</Text>
                    </View>
                    <View style={styles.deleteItem}>
                      <Button title='Delete'
                      color='red'
                      onPress={() => {
                        Alert.alert(
                          "Delete This Schedule?",
                          "Are you sure you want to delete this schedule?",
                          [
                            {text: 'No'},
                            {text: 'Yes', onPress: () => { deleteSchedule(item.name);}}
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
  // No schedules are present
  else {
    return(
      <>
        <ScrollView>
          <View style={styles.sectionTable}>
            <View style={styles.tableRowEmpty}>
              <Text>No Schedules to Display</Text>
            </View>
          </View>
        </ScrollView>
      </>
    );
  }
}
