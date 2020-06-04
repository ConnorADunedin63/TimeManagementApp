import 'react-native-gesture-handler';
import React, {useState} from 'react';
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

export function scheduleTable(navigation = null) {
    const [hoursExpanded, setHoursExpanded] = useState(new Array(24).fill(false, 0, 23));
    let hourContainers = [];

    // For every hour in the day, create a new container
    for(let i = 0; i < 24; i ++) {
        const even = i % 2 === 0 ? true : false;
        hourContainers.push(createHourContainer(i, hoursExpanded, setHoursExpanded,  even, navigation));
    }
    return hourContainers;
}

/**
 * 
 * @param hour: The hour that this container is referencing 
 * @param hoursExpanded: An array of length 24 which states what hours are expanded 
 * @param setHoursExpanded: A function for setting the hourExpanded array 
 * @param even: Whether this hour container is expanded or not 
 */
function createHourContainer(hour, hoursExpanded, setHoursExpanded, even, navigation) {
    let hourText = hour;
    if(hour < 10) {
        if(hour === 0) {
            hourText = "12AM";
        }
        else {
            hourText = hour + "AM";
        }
    }
    else {
        if(hour < 12) {
            hourText = hour + "AM";
        }
        else if(hour === 12) {
            hourText = hour + "PM"; 
        }
        else {
            hourText = (hour - 12) + "PM";
        }
    }

    if(even === true) {
        return (
            <TouchableOpacity
            key={hourText}
            style={styles.hourContainerEven}
            onPress={() => {
                let newExpanded = hoursExpanded.slice(0);
                newExpanded[hour] = !newExpanded[hour];
                setHoursExpanded(newExpanded);
            }}>
                <Text style={styles.hourMark}>{hourText}</Text>
                {minutes(hourText.slice(0, hourText.length - 2), hoursExpanded[hour], (hour >= 12 ? "PM" : "AM"), navigation )}
            </TouchableOpacity>
        );
    }
    else {
        return (
            <TouchableOpacity
            key={hourText} 
            style={styles.hourContainer}
            onPress={() => {
                let newExpanded = hoursExpanded.slice(0);
                newExpanded[hour] = !newExpanded[hour];
                setHoursExpanded(newExpanded);
            }}>
                <Text style={styles.hourMark}>{hourText}</Text>
                {minutes(hourText.slice(0, hourText.length - 2), hoursExpanded[hour], (hour >= 12 ? "PM" : "AM"), navigation )}
            </TouchableOpacity>
        );
    }
}

/**
 * 
 * @param hour: The hour that should be added to the beginning of minute text 
 * @param expanded: If the minutes should be displayed or not 
 * @param timeOfDay: Whether it is afternoon or morning
 */
function minutes(hour, expanded, timeOfDay, navigation) {
    let minutes = [];
    for(let i = 0; i < 60; i += 5) {
        let minutesText = i;
        if(i < 10) {
            minutesText = hour + ":0" + minutesText + timeOfDay; 
        }
        else {
            minutesText = hour + ":" + minutesText + timeOfDay;
        }
        minutes.push(
            <TouchableOpacity 
            key={minutesText}
            style={styles.minutesContainer}
            onPress={() => {
                // If the navigation has been provided
                if(navigation !== null) {
                    navigation.navigate("CreateScheduleTask", {time: minutesText});
                }
            }}>
                <Text>{minutesText}</Text>
            </TouchableOpacity>
        );
    }

    if(expanded === true) {
        return(
            <View style={{alignItems: 'stretch', marginLeft: 5}}>
                {minutes}
            </View>
        );
    }
    else {
        return null;
    }
}