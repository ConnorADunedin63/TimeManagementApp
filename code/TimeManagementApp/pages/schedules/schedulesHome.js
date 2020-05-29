import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
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
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import styles from '../css/scheduleHomeStyles.js';

import TodaySchedule from './todaySchedule.js';
import CreateSchedule from './createSchedule.js';

export default function SchedulesStack() {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator initialRouteName="SchedulesHome">
      <Stack.Screen options={{headerShown: false}} name="SchedulesHome" component={SchedulesHome} />
      <Stack.Screen options={{headerShown: true}} name="TodaySchedule" component={TodaySchedule} />
      <Stack.Screen options={{headerShown: true}} name="CreateSchedule" component={CreateSchedule} />
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
        {scheduleTable()}
        <View style={{marginTop: 10}}>
          <Button title="Create Schedule" onPress={() => {navigation.navigate("CreateSchedule")}} />
        </View>
      </View>
    </View>
  );
}

function scheduleTable() {
  return (
    <View style={{backgroundColor: 'white', marginTop: 10}}>
      <Text>Table goes here</Text>
    </View>
  );
}
