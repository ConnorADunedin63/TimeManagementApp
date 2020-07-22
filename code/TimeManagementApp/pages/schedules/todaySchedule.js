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

import {scheduleTable} from './scheduleElements.js';

import styles from '../css/scheduleElementsStyles.js';

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