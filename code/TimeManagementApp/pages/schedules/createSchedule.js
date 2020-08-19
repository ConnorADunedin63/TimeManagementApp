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
import { isWeekdays, isWeekends, isEveryday } from '../../helpers/scheduleHelper.js';

export default function CreateSchedule({route, navigation}) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    // Initially no days are selected
    const [days, setDays] = useState([false, false, false, false, false, false, false]);
    const [tasks, setTasks] = useState([]);
    

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
                    <View style={{alignItems: 'stretch', marginTop: 10}}>
                        <Button 
                        title="Preview Schedule" 
                        />
                    </View>
                    <View style={{alignItems: 'stretch', marginTop: 20}}>
                        <Button
                        disabled={name === "" ? true : false} 
                        title="Create Schedule" 
                        />
                    </View>
                    <View style={{alignItems: 'stretch', marginTop: 20}}>
                        <Button 
                        title="Create Task"
                        onPress={() => {navigation.navigate("CreateScheduleTask", {onGoBack: () => updateScheduleTasks})}} 
                        />
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
        </>
    );
}