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

import styles from '../css/todaySchedule.js';

export default function TodaySchedule() {
  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.bodyContainer}>
          <View style={styles.innerContainer}>
            <View style={{alignItems: 'center', paddingBottom: 10}}>
                <Text style={styles.pageTitle}>Today's Schedule</Text>
            </View>
            {scheduleTable()}
          </View>
        </View>
    </ScrollView>
  )
}

function scheduleTable() {
    return (
        <>
            <View style={styles.hourContainer}>
                <Text>12am</Text>
            </View>
            <View style={styles.hourContainerEven}>
                <Text>1am</Text>
            </View>
            <View style={styles.hourContainer}>
                <Text>2am</Text>
            </View>
            <View style={styles.hourContainerEven}>
                <Text>3am</Text>
            </View>
            <View style={styles.hourContainer}>
                <Text>4am</Text>
            </View>
            <View style={styles.hourContainerEven}>
                <Text>5am</Text>
            </View>
            <View style={styles.hourContainer}>
                <Text>6am</Text>
            </View>
            <View style={styles.hourContainerEven}>
                <Text>7am</Text>
            </View>
            <View style={styles.hourContainer}>
                <Text>8am</Text>
            </View>
            <View style={styles.hourContainerEven}>
                <Text>9am</Text>
            </View>
            <View style={styles.hourContainer}>
                <Text>10am</Text>
            </View>
            <View style={styles.hourContainerEven}>
                <Text>11am</Text>
            </View>
            <View style={styles.hourContainer}>
                <Text>12pm</Text>
            </View>
            <View style={styles.hourContainerEven}>
                <Text>1pm</Text>
            </View>
            <View style={styles.hourContainer}>
                <Text>3pm</Text>
            </View>
            <View style={styles.hourContainerEven}>
                <Text>4pm</Text>
            </View>
            <View style={styles.hourContainer}>
                <Text>5pm</Text>
            </View>
            <View style={styles.hourContainerEven}>
                <Text>6pm</Text>
            </View>
            <View style={styles.hourContainer}>
                <Text>7pm</Text>
            </View>
            <View style={styles.hourContainerEven}>
                <Text>8pm</Text>
            </View>
            <View style={styles.hourContainer}>
                <Text>9pm</Text>
            </View>
            <View style={styles.hourContainerEven}>
                <Text>10pm</Text>
            </View>
            <View style={styles.hourContainer}>
                <Text>11pm</Text>
            </View>
        </>
    );
}
