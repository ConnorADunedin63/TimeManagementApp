import React, { useState } from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  TextInput,
  Platform,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

// Import stylesheet
import styles from './css/createGoalsStyles.js';

import DateTimePicker from '@react-native-community/datetimepicker';
import {NavigationContainer} from '@react-navigation/native';
import { setGoals } from '../logic/goals.js';
import { getDayOfWeek, convertTo12HourFormat, getMonth } from '../helpers/timeHelper.js';

export default function createGoal({ navigation }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date(1598051730000));

  return (
    <View style={styles.container}>
      <View style={styles.sectionTitleContainer}>
        <Text style={styles.sectionTitle}>Create Goal</Text>
      </View>
      <View style={styles.formContainer}>
        <TextInput style={styles.formInput} placeholder="Name (required)" onChangeText={text => setName(text)}></TextInput>
        <TextInput style={styles.formInput} placeholder="Description (optional)" onChangeText={text => setDescription(text)}></TextInput>
        {datePicker(date, setDate)}
        <View style={styles.createContainer}>
          <Button title="Create Goal"
          onPress={() => {setGoals(name, description, date); navigation.navigate('Home')}}
          disabled={name === '' ? true : false }></Button>
        </View>
      </View>
    </View>
  );
}

function datePicker(date, setDate) {
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
      const currentDate = selectedDate || date;
      setShow(Platform.OS === 'ios');
      setDate(currentDate);
    };

    const showMode = currentMode => {
      setShow(true);
      setMode(currentMode);
    };

    const showDatepicker = () => {
      showMode('date');
    };

    const showTimepicker = () => {
      showMode('time');
    };



    return (
    <View>
      <View>
        <TextInput placeholder={"Date: " + convertTo12HourFormat(date) + " " + getDayOfWeek(date) + ", " + date.getDate() + " " + getMonth(date) + " " + date.getFullYear()} style={styles.formDateInput} editable={false} selectTextOnFocus={false}></TextInput>
      </View>
      <View style={styles.timeBtn}>
        <Button onPress={showDatepicker} title="Select Date" />
      </View>
      <View style={styles.timeBtn}>
        <Button onPress={showTimepicker} title="Select Time" />
      </View>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          timeZoneOffsetInMinutes={0}
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
}
