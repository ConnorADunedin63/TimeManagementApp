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

export default function CreateSchedule() {
    return(
        <View style={styles.bodyContainer} >
            <View style={styles.innerContainer}>
                <View style={{alignItems: 'center'}}>
                    <Text style={styles.pageTitle}>Create Schedule</Text>
                </View>
            </View>
        </View>
    );
}