import 'react-native-gesture-handler';
import React, { useState } from 'react';
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
} from 'react-native';

import {
    Header,
    LearnMoreLinks,
    Colors,
    DebugInstructions,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import styles from '../css/createScheduleStyles.js';
import { scheduleTable } from './scheduleElements.js';
import { isWeekdays, isWeekends, isEveryday } from '../../logic/scheduleDays.js';

export default function CreateSchedule() {
    // Initially no days are selected
    const [days, setDays] = useState([false, false, false, false, false, false, false]);

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View style={styles.bodyContainer} >
                <View style={styles.innerContainer}>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={styles.pageTitle}>Create Schedule</Text>
                    </View>
                    <View style={{ alignItems: 'stretch' }}>
                        <Text style={styles.formTag}>Name</Text>
                        <TextInput style={styles.formInput} placeholder="Schedule Name (required)"></TextInput>
                    </View>
                    <View style={{ alignItems: 'stretch' }}>
                        <Text style={styles.formTag}>Description</Text>
                        <TextInput style={styles.formInput} placeholder="Schedule Description (optional)"></TextInput>
                    </View>
                    {scheduleType(days[0], setDays)}
                    <View style={styles.scheduleTable}>
                        <Text style={styles.subheading}>Tasks (Click on time below to create task)</Text>
                        {scheduleTable()}
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}

function scheduleType(days, setDays) {
    return (
        <>
            <View style={{ alignItems: 'stretch' }}>
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
                        if(days[1] === false) {
                            // Copy the old array as React state should not be modified directly
                            const newDays = days.splice();
                            newDays[1] = true; 
                            setDays(newDays);
                        }
                    }}
                    />
                </View>
                <View style={{ flex: 1, marginRight: 5 }}>
                    <Button 
                    title="Tuesday" 
                    color={days[2] === true ? 'green' : ''}
                    onPress={() => {
                        if(days[2] === false) {
                            // Copy the old array as React state should not be modified directly
                            const newDays = days.splice();
                            newDays[2] = true; 
                            setDays(newDays);
                        }
                    }}
                    />
                </View>
                <View style={{ flex: 1 }}>
                    <Button 
                    title="Wednesday" 
                    color={days[3] === true ? 'green' : ''}
                    onPress={() => {
                        if(days[3] === false) {
                            // Copy the old array as React state should not be modified directly
                            const newDays = days.splice();
                            newDays[3] = true; 
                            setDays(newDays);
                        }
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
                        if(days[4] === false) {
                            // Copy the old array as React state should not be modified directly
                            const newDays = days.splice();
                            newDays[4] = true; 
                            setDays(newDays);
                        }
                    }}
                    />
                </View>
            <View style={{ flex: 1, marginRight: 5 }}>
                    <Button 
                    title="Friday" 
                    color={days[5] === true ? 'green' : ''}
                    onPress={() => {
                        if(days[5] === false) {
                            // Copy the old array as React state should not be modified directly
                            const newDays = days.splice();
                            newDays[5] = true; 
                            setDays(newDays);
                        }
                    }}
                    />
                </View>
                <View style={{ flex: 1 }}>
                    <Button 
                    title="Saturday" 
                    color={days[6] === true ? 'green' : ''}
                    onPress={() => {
                        if(days[6] === false) {
                            // Copy the old array as React state should not be modified directly
                            const newDays = days.splice();
                            newDays[6] = true; 
                            setDays(newDays);
                        }
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
                        if(days[0] === false) {
                            // Copy the old array as React state should not be modified directly
                            const newDays = days.splice();
                            newDays[0] = true; 
                            setDays(newDays);
                        }
                    }}
                    />
                </View>
            </View>
        </>
    );
}