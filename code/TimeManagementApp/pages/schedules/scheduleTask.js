import 'react-native-gesture-handler';
import React, { useState } from 'react';
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

import {convertTo12HourFormat, getCompleteDate} from '../../helpers/timeHelper.js';

import DateTimePicker from '@react-native-community/datetimepicker';


import styles from '../css/createScheduleTasksStyles.js';

export default function CreateScheduleTask({ route, navigation }) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [startTime, setStartTime] = useState(new Date());
    const [endTime, setEndTime] = useState(startTime);

    return (
        <View style={styles.bodyContainer}>
            <View style={styles.innerContainer}>
                <View style={{alignItems: 'center'}}>
                    <Text style={styles.pageTitle}>Create Schedule Task</Text>
                </View>
                <View style={{ alignItems: 'stretch' }}>
                        <Text style={styles.formTag}>Name</Text>
                        <TextInput 
                        style={styles.formInput} 
                        placeholder="Schedule Task Name (required)"
                        onChangeText={text => {setName(text)}} />
                    </View>
                    <View style={{ alignItems: 'stretch' }}>
                        <Text style={styles.formTag}>Description</Text>
                        <TextInput 
                        style={styles.formInput} 
                        placeholder="Schedule Task Description (optional)" 
                        onChangeText={text => {setDescription(text)}} />
                    </View>
                    <View style={{ alignItems: 'stretch' }}>
                        <Text style={styles.formTag}>Start Time</Text>
                        <TextInput 
                        style={styles.formTimeInput}
                        editable={false} 
                        defaultValue={getCompleteDate(startTime)}/>
                    </View>
                    {timePicker(startTime, setStartTime)}
                    <View style={{ alignItems: 'stretch' }}>
                        <Text style={styles.formTag}>End Time</Text>
                        <TextInput 
                        style={styles.formTimeInput}
                        editable={false} 
                        defaultValue={getCompleteDate(endTime)}/>
                    </View>
                    {timePicker(endTime, setEndTime)}
                    <View style={{alignItems: 'stretch', marginTop: 20}}>
                        <Button
                        title="Create Schedule Task"
                        disabled={name === "" ? true : false}
                        onPress={() => {
                            navigation.navigate("CreateSchedule", {task: {name: name, description: description, startTime: startTime, endTime: endTime}});
                        }}
                        />
                    </View>
            </View>
        </View>
    )
}

function timePicker(time, setTime) {
    const [show, setShow] = useState(false);
    const [mode, setMode] = useState('time');

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShow(Platform.OS === 'ios');
        setTime(convertTo12HourFormat(selectedDate));
    };

    const showMode = currentMode => {
      setShow(true);
      setMode(currentMode);
    };

    const showTimepicker = () => {
      showMode('time');
    };

    return (
        <View>
            <View style={styles.timeBtn}>
                <Button 
                onPress={showTimepicker} 
                title="Select Time" />
            </View>
            {show && (
                <DateTimePicker
                testID="timePicker"
                timeZoneOffsetInMinutes={0}
                value={new Date()}
                mode={mode}
                is24Hour={true}
                display="default"
                onChange={onChange}
                />
            )}
      </View>
    )
}