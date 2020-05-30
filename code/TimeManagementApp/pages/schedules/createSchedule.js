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

import styles from '../css/createScheduleStyles.js';
import {scheduleTable} from './scheduleElements.js';

export default function CreateSchedule() {
    return(
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
            <View style={styles.bodyContainer} >
                <View style={styles.innerContainer}>
                    <View style={{alignItems: 'center'}}>
                        <Text style={styles.pageTitle}>Create Schedule</Text>
                    </View>
                    <View style={{alignItems: 'stretch'}}>
                        <Text style={styles.formTag}>Name</Text>
                        <TextInput style={styles.formInput} placeholder="Schedule Name (required)"></TextInput>
                    </View>
                    <View style={{alignItems: 'stretch'}}>
                        <Text style={styles.formTag}>Description</Text>
                        <TextInput style={styles.formInput} placeholder="Schedule Description (optional)"></TextInput>
                    </View>
                    <View style={styles.scheduleTable}>
                        <Text style={styles.subheading}>Tasks (Click on time below to create task)</Text>
                        {scheduleTable()}
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}