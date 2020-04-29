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
import styles from './css/editGoalStyles.js';

import DateTimePicker from '@react-native-community/datetimepicker';
import {NavigationContainer} from '@react-navigation/native';
import { updateGoal, updateTask } from '../logic/goals.js';
import { getDayOfWeek, convertTo12HourFormat, getMonth, getCompleteDate } from '../helpers/timeHelper.js';

export default function editGoal({ route, navigation }) {
  const goal = route.params.goal;
  const [name, setName] = useState(goal.name);
  const [description, setDescription] = useState(goal.description);
  const [date, setDate] = useState(goal.date);
  const [checklist, setChecklist] = useState(goal.checklist)
  // Initially the user is only viewing the goal
  const [editGoal, setEdit] = useState(false);

  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <View style={styles.container}>
        <View style={styles.sectionTitleContainer}>
          <View style={styles.sectionTitleRow}>
            <View style={{flex: 1, marginLeft: 10}}>
              <Text style={styles.sectionTitle}>{editGoal ? "Edit Goal" : "View Goal"}</Text>
            </View>
            <View style={{flex: 1, marginRight: 10, marginTop: 10}}>
              <Button title={editGoal ? "View Goal" : "Edit Goal"} onPress={() => {setEdit(!editGoal)}}/>
            </View>
          </View>
        </View>
        <View style={styles.formContainer}>
          <TextInput style={editGoal ? styles.formInput : styles.formDateInput}
          placeholder="Name (required)"
          defaultValue={goal.name}
          editable={editGoal}
          onChangeText={text => setName(text)}/>
          <TextInput style={editGoal ? styles.formInput : styles.formDateInput}
          placeholder="Description (optional)"
          defaultValue={goal.description}
          editable={editGoal}
          onChangeText={text => setDescription(text)}/>
          {datePicker(date, setDate, editGoal)}
          {goalChecklist(checklist, setChecklist)}
          <View style={editGoal ? styles.createContainer : {display: 'none'}}>
            <Button title="Edit Goal"
            onPress={() => {updateGoal(name, description, date, checklist, goal.key); navigation.navigate('Home')}}
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
function datePicker(date, setDate, editGoal) {
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [hasEndDate, setEndDate] = useState(date === "N/A" ? false : true)

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
      <Text style={{color: 'white'}}>Has End Date?</Text>
      <View style={{flexDirection: 'row', alignItems: 'stretch'}}>
        <View style={{flex: 1, marginRight: 10}}>
          <Button title='Yes'
          color={hasEndDate ? 'green' : ''}
          disabled={!editGoal}
          onPress={() => {setEndDate(true); setDate(new Date())}} />
        </View>
        <View style={{flex: 1}}>
          <Button title='No'
          color={hasEndDate === false ? 'green' : ''}
          disabled={!editGoal}
          onPress={() => {setEndDate(false); setDate("N/A")}} />
        </View>
      </View>
      <View style={hasEndDate === false ? {display: 'none'} : ''}>
        <TextInput placeholder={"Date: " + getCompleteDate(date)}
        style={styles.formDateInput}
        editable={false}
        selectTextOnFocus={false}/>
      </View>
      <View style={hasEndDate === false ? {display: 'none'} : styles.timeBtn}>
        <Button onPress={showDatepicker} title="Select Date" disabled={!editGoal} />
      </View>
      <View style={hasEndDate === false ? {display: 'none'} : styles.timeBtn}>
        <Button onPress={showTimepicker} title="Select Time" disabled={!editGoal}/>
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
  return React Native component: The react native components used to display tasks
*/
function goalChecklist(checklist, setChecklist) {
  const [hasChecklist, setHasChecklist] = useState(checklist !== null ? true : false);
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
  if(checklist !== null) {
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
              setChecklist(updateTask(checklist, i));
            }} />
          </View>
        </View>
      );
    }
  }
  return checklistItems;
}
