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
import { getDayOfWeek, convertTo12HourFormat, getMonth, getCompleteDate } from '../helpers/timeHelper.js';

export default function createGoal({ navigation }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date());
  const[checklist, setChecklist] = useState([]);

  return (
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
          onPress={() => {setGoals(name, description, date); navigation.navigate('Home')}}
          disabled={name === '' ? true : false }></Button>
        </View>
      </View>
    </View>
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
          <Button title='Yes' color={hasEndDate ? 'green' : ''} onPress={() => {setEndDate(true); setDate(new Date())}} />
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

/**
  Returns the react components that are used to render the checklist
  param checklist: An array of JSON objects that represents tasks, with a name and boolean
  param setChecklist: The function that is used to set the checklist
*/
function goalChecklist(checklist, setChecklist) {
  const [hasChecklist, setHasChecklist] = useState(false);
  const [task, setTask] = useState('');

  return (
    <View>
      <View style={{marginTop: 10}}>
        <Text style={{color: 'white'}}>Has Checklist?</Text>
      </View>
      <View style={{flexDirection: 'row', alignItems: 'stretch'}}>
        <View style={{flex: 1, marginRight: 10}}>
          <Button title='Yes' color={hasChecklist ? 'green' : ''} onPress={() => {setHasChecklist(true); setChecklist([])}} />
        </View>
        <View style={{flex: 1}}>
          <Button title='No' color={hasChecklist === false ? 'green' : ''} onPress={() => {setHasChecklist(false); setChecklist(null)}} />
        </View>
      </View>
      <View style={hasChecklist === false ? {display : 'none'} : ''}>
        <View style={{flexDirection: 'row', alignItems: 'stretch'}}>
          <View style={{flex: 2, marginRight: 10, marginTop: 10}}>
            <TextInput placeholder='Task name'
            style={{backgroundColor: 'white'}}
            value={task}
            onChangeText={text => {setTask(text)}}/>
          </View>
          <View style={{flex: 1, marginTop: 15}}>
            <Button title='Create task' onPress={() => {checklist.push({name: task, complete: false}); setTask('')}} />
          </View>
        </View>
        {checklist !== null ? displayTasks(checklist, setChecklist) : null}
      </View>
    </View>
  );
}

/**
  Displays the current checklist
*/
function displayTasks(checklist, setChecklist) {
  let checklistItems = [];
  for(let i = 0; i < checklist.length; i ++) {
    checklistItems.push(
      <View style={{flexDirection: 'row', marginTop: 10, marginRight: 10}} key={i}>
        <View style={{flex: 2, marginTop: 8}}>
          <Text style={{color: 'white'}}>{checklist[i].name}</Text>
        </View>
        <View style={{flex: 2}}>
          <Button
          title={checklist[i].complete ? 'Complete' : 'Not Complete'}
          color={checklist[i].complete ? 'green' : 'red'}
          onPress={() => {
            let newChecklist = checklist.splice();
            console.log(checklist);
          }} />
        </View>
      </View>
    );
  }
  return checklistItems;
}
