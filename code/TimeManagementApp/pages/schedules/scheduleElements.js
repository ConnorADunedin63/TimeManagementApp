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
  TouchableOpacity
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import styles from '../css/scheduleElementsStyles.js';

export function scheduleTable() {
    return (
        <>
            <TouchableOpacity style={styles.hourContainer}>
                <Text>12am</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.hourContainerEven}>
                <Text>1am</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.hourContainer}>
                <Text>2am</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.hourContainerEven}>
                <Text>3am</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.hourContainer}>
                <Text>4am</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.hourContainerEven}>
                <Text>5am</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.hourContainer}>
                <Text>6am</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.hourContainerEven}>
                <Text>7am</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.hourContainer}>
                <Text>8am</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.hourContainerEven}>
                <Text>9am</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.hourContainer}>
                <Text>10am</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.hourContainerEven}>
                <Text>11am</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.hourContainer}>
                <Text>12pm</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.hourContainerEven}>
                <Text>1pm</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.hourContainer}>
                <Text>3pm</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.hourContainerEven}>
                <Text>4pm</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.hourContainer}>
                <Text>5pm</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.hourContainerEven}>
                <Text>6pm</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.hourContainer}>
                <Text>7pm</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.hourContainerEven}>
                <Text>8pm</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.hourContainer}>
                <Text>9pm</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.hourContainerEven}>
                <Text>10pm</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.hourContainer}>
                <Text>11pm</Text>
            </TouchableOpacity>
        </>
    );
}