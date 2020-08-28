import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
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

import styles from '../css/createScheduleStyles.js';
import { isWeekdays, isWeekends, isEveryday } from '../../helpers/scheduleHelper.js';
import { addScheduleTask, deleteTask } from '../../logic/scheduleTasks.js';

export default function CreateSchedule({route, navigation}) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    // Initially no days are selected
    const [days, setDays] = useState([false, false, false, false, false, false, false]);
    const [newTask, setNewTask] = useState(null);
    const [tasks, setTasks] = useState([]);

    if(route.params !== undefined && route.params.newTask !== undefined) {
        setNewTask(JSON.parse(route.params.newTask));
        route.params.newTask = undefined;
    }

    useEffect(() => {
        if(newTask !== null) {
            let currentTasks = tasks;
            currentTasks = addScheduleTask(newTask.name, newTask.description, newTask.startTime, newTask.endTime, tasks);
            setTasks(currentTasks);
            setNewTask(null);
        }

    }, [newTask, tasks]);

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View style={styles.bodyContainer} >
                <View style={styles.innerContainer}>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={styles.pageTitle}>Create Schedule</Text>
                    </View>
                    <View style={{ alignItems: 'stretch' }}>
                        <Text style={styles.formTag}>Name</Text>
                        <TextInput 
                        style={styles.formInput} 
                        placeholder="Schedule Name (required)"
                        onChangeText={text => {setName(text)}} />
                    </View>
                    <View style={{ alignItems: 'stretch' }}>
                        <Text style={styles.formTag}>Description</Text>
                        <TextInput 
                        style={styles.formInput} 
                        placeholder="Schedule Description (optional)" 
                        onChangeText={text => {setDescription(text)}} />
                    </View>
                    {scheduleType(days, setDays)}
                    {scheduleTaskTable(tasks, setTasks)}
                    <View style={{alignItems: 'stretch', marginTop: 20}}>
                        <Button 
                        title="Create Task"
                        onPress={() => {navigation.navigate("CreateScheduleTask")}} 
                        />
                    </View>
                    <View style={{alignItems: 'stretch', marginTop: 20}}>
                        <Button
                        disabled={!validSchedule(name, days)} 
                        title="Create Schedule" 
                        />
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}

/**
 * Returns a React Component for selecting days that the schedule should apply to.
 * @param days: The days this schedule applies to 
 * @param setDays: The setter for setting the active days 
 */
function scheduleType(days, setDays) {
    return (
        <View style={{marginBottom: 10}}>
            <View style={{ alignItems: 'stretch'}}>
                <Text style={styles.formTag}>Days</Text>
            </View>
            <View style={{ alignItems: 'flex-start', flexDirection: 'row' }}>
                <View style={{ flex: 1, marginRight: 5 }}>
                    <Button 
                    title="Weekdays"
                    color={isWeekdays(days) === true ? 'green' : ''}
                    onPress={() => {
                        if(isWeekdays(days) === false) {
                            setDays([false, true, true, true, true, true, false]);
                        } 
                    }} />
                </View>
                <View style={{ flex: 1, marginRight: 5 }}>
                    <Button 
                    title="Weekends"
                    color={isWeekends(days) === true ? 'green' : ''}
                    onPress={() => {
                        if(isWeekends(days) === false) {
                            setDays([true, false, false, false, false, false, true]);
                        }
                    }} />
                </View>
                <View style={{flex: 1}}>
                    <Button 
                    title="Everyday"
                    color={isEveryday(days) === true ? 'green' : ''}
                    onPress={() => {
                        if(isEveryday(days) === false) {
                            setDays([true, true, true, true, true, true, true]);
                        }
                    }}/>
                </View>
            </View>
            <View style={{ alignItems: 'flex-start', flexDirection: 'row', marginTop: 20 }}>
                <View style={{ flex: 1, marginRight: 5 }}>
                    <Button 
                    title="Monday" 
                    color={days[1] === true ? 'green' : ''}
                    onPress={() => {
                        // Copy the old array as React state should not be modified directly
                        const newDays = days.slice(0);
                        newDays[1] = !newDays[1]; 
                        setDays(newDays);
                    }}
                    />
                </View>
                <View style={{ flex: 1, marginRight: 5 }}>
                    <Button 
                    title="Tuesday" 
                    color={days[2] === true ? 'green' : ''}
                    onPress={() => {
                        // Copy the old array as React state should not be modified directly
                        const newDays = days.slice(0);
                        newDays[2] = !newDays[2]; 
                        setDays(newDays);
                    }}
                    />
                </View>
                <View style={{ flex: 1 }}>
                    <Button 
                    title="Wednesday" 
                    color={days[3] === true ? 'green' : ''}
                    onPress={() => {
                        // Copy the old array as React state should not be modified directly
                        const newDays = days.slice(0);
                        newDays[3] = !newDays[3]; 
                        setDays(newDays);
                    }}
                    />
                </View>
            </View>
            <View style={{ alignItems: 'flex-start', flexDirection: 'row', marginTop: 10 }}>
                <View style={{ flex: 1, marginRight: 5 }}>
                    <Button 
                    title="Thursday" 
                    color={days[4] === true ? 'green' : ''}
                    onPress={() => {
                        // Copy the old array as React state should not be modified directly
                        const newDays = days.slice(0);
                        newDays[4] = !newDays[4]; 
                        setDays(newDays);
                    }}
                    />
                </View>
            <View style={{ flex: 1, marginRight: 5 }}>
                    <Button 
                    title="Friday" 
                    color={days[5] === true ? 'green' : ''}
                    onPress={() => {
                        // Copy the old array as React state should not be modified directly
                        const newDays = days.slice(0);
                        newDays[5] = !newDays[5]; 
                        setDays(newDays);
                    }}
                    />
                </View>
                <View style={{ flex: 1 }}>
                    <Button 
                    title="Saturday" 
                    color={days[6] === true ? 'green' : ''}
                    onPress={() => {
                        // Copy the old array as React state should not be modified directly
                        const newDays = days.slice(0);
                        newDays[6] = !newDays[6]; 
                        setDays(newDays);
                    }}
                    />
                </View>
            </View>
            <View style={{ alignItems: 'flex-start', flexDirection: 'row', marginTop: 10 }}>
                <View style={{ flex: 1 }}>
                    <Button 
                    title="Sunday" 
                    color={days[0] === true ? 'green' : ''}
                    onPress={() => {
                        // Copy the old array as React state should not be modified directly
                        const newDays = days.slice(0);
                        newDays[0] = !newDays[0]; 
                        setDays(newDays);
                    }}
                    />
                </View>
            </View>
        </View>
    );
}

/**
 * Returns a React Component which is a table containing the current tasks in the schedule.
 * The table has four rows, name, start time, end time and a delete button.
 * @param tasks: The tasks in the schedule 
 * @param setTasks: The setter for setting the tasks 
 */
function scheduleTaskTable(tasks, setTasks) {
    if(tasks.length > 0) {
        return(
          <>
            <ScrollView style={styles.tableContainer}>
              <View style={styles.sectionTable}>
                <View style={styles.tableHeader}>
                  <View style={styles.rowItem}>
                    <Text>Name</Text>
                  </View>
                  <View style={styles.rowItem}>
                    <Text>Start Time</Text>
                  </View>
                  <View style={styles.rowItem}>
                    <Text>End Time</Text>
                  </View>
                  <View style={styles.rowItem} />
                </View>
                {
                  tasks.map((item, index) => {
                    return (
                      <TouchableOpacity style={index % 2 == 0 ? styles.tableRowEven : styles.tableRowOdd}
                      key={item.key}>
                        <View style={styles.rowItem}>
                          <Text>{item.name}</Text>
                        </View>
                        <View style={styles.rowItem}>
                          <Text>{item.startTime}</Text>
                        </View>
                        <View style={styles.rowItem}>
                          <Text>{item.endTime}</Text>
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
                                {text: 'Yes', onPress: () => {
                                  setTasks([]);
                                  setTasks(deleteTask(item.key, tasks));
                                }}
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
            <ScrollView style={styles.tableContainer}>
              <View style={styles.sectionTable}>
                <View style={styles.tableRowEmpty}>
                  <Text>No Tasks to Display</Text>
                </View>
              </View>
            </ScrollView>
          </>
        );
      }
}

/**
 * 
 * @param name: The name of the schedule 
 * @param days: The days the schedule applies to
 * @returns true if the schedule is valid, false otherwise 
 */
function validSchedule(name, days) {
  // Schedule name cannot be blank
  if(name === "") {
    return false;
  }

  for(let i = 0; i < days.length; i ++) {
    // A day is selected
    if(days[i] === true) {
      return true
    }
  }

  // No days selected
  return false;
}