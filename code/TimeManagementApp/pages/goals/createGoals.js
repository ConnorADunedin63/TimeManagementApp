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
import styles from '../css/createGoalsStyles.js';

import DateTimePicker from '@react-native-community/datetimepicker';
import {NavigationContainer} from '@react-navigation/native';
import { goalChecklist } from './_tasks.js';

import { setGoals, updateTask } from '../../logic/goals.js';
import { getDayOfWeek, convertTo12HourFormat, getMonth, getCompleteDate } from '../../helpers/timeHelper.js';

export default function createGoal({ navigation }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date());
  const [checklist, setChecklist] = useState(null);

  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <View style={styles.container}>
        <View style={styles.sectionTitleContainer}>
          <Text style={styles.sectionTitle}>Create Goal</Text>
        </View>
        <View style={styles.formContainer}>
          <TextInput style={styles.formInput} placeholder="Name (required)" onChangeText={text => setName(text)}></TextInput>
          <TextInput style={styles.formInput} placeholder="Description (optional)" onChangeText={text => setDescription(text)}></TextInput>
          {datePicker(date, setDate)}
          {goalChecklist(checklist, setChecklist)}
          <View style={styles.createContainer}>
            <Button title="Create Goal"
            onPress={() => {setGoals(name, description, date, checklist); navigation.navigate('Home')}}
            disabled={name === '' ? true : false }></Button>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

/**
  Renders the date picker for selecting a end date for a goal
  param date: The current Date object that is being used or "N/A" if the goal does not have an end date
  param setDate: The function used to set the date for the goal
  return React-Native components: The date picker react components
*/
function datePicker(date, setDate) {
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [hasEndDate, setEndDate] = useState('No')

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
      <View style={{marginTop: 10}}>
        <Text style={{color: 'white'}}>Has End Date?</Text>
      </View>
      <View style={{flexDirection: 'row', alignItems: 'stretch'}}>
        <View style={{flex: 1, marginRight: 10}}>
          <Button title='Yes' color={hasEndDate ? 'green' : ''}
          onPress={() => {
            // Should only set end date if it is not already true
            if(hasEndDate === false) {
              setEndDate(true);
              setDate(new Date());
            }
          }} />
        </View>
        <View style={{flex: 1}}>
          <Button title='No' color={hasEndDate === false ? 'green' : ''} onPress={() => {setEndDate(false); setDate("N/A")}} />
        </View>
      </View>
      <View style={hasEndDate === false ? {display: 'none'} : ''}>
        <TextInput placeholder={"Date: " + getCompleteDate(date)} style={styles.formDateInput} editable={false} selectTextOnFocus={false}></TextInput>
      </View>
      <View style={hasEndDate === false ? {display: 'none'} : styles.timeBtn}>
        <Button onPress={showDatepicker} title="Select Date" />
      </View>
      <View style={hasEndDate === false ? {display: 'none'} : styles.timeBtn}>
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
