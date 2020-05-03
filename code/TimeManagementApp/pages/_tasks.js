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
  Alert
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import DateTimePicker from '@react-native-community/datetimepicker';
import {NavigationContainer} from '@react-navigation/native';
import { updateGoal, updateTask } from '../logic/goals.js';
import { taskNotPresent, deleteTask } from '../logic/tasks.js';

/**
  Returns the react components that are used to render the checklist
  param checklist: An array of JSON objects that represents tasks, with a name and boolean
  param setChecklist: The function that is used to set the checklist
  return React Native component: The react native components used to display tasks
*/
export function goalChecklist(checklist, setChecklist, editGoal) {
  const [hasChecklist, setHasChecklist] = useState(checklist !== null ? true : false);
  const [task, setTask] = useState('');

  return (
    <View>
      <View style={{marginTop: 10}}>
        <Text style={{color: 'white'}}>Has Checklist?</Text>
      </View>
      <View style={{flexDirection: 'row', alignItems: 'stretch'}}>
        <View style={{flex: 1, marginRight: 10}}>
          <Button title='Yes'
          color={hasChecklist ? 'green' : ''}
          disabled={!editGoal}
          onPress={() => {setHasChecklist(true); setChecklist([])}} />
        </View>
        <View style={{flex: 1}}>
          <Button title='No'
          color={hasChecklist === false ? 'green' : ''}
          disabled={!editGoal}
          onPress={() => {setHasChecklist(false); setChecklist(null)}} />
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
            <Button title='Create task' onPress={() => {
              // Task cannot be blank
              if(task !== "") {
                // Cannot have duplicate tasks
                if(taskNotPresent(checklist, task)) {
                  checklist.push({name: task, complete: false});
                  setTask('');
                }
                else {
                  alert("Task is already present!");
                }
              }
              else {
                alert("Task cannot be blank!");
              }
            }} />
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
          <View style={{flex: 2, marginTop: 8, marginRight: 5}}>
            <Text style={{color: 'white'}}>{checklist[i].name}</Text>
          </View>
          <View style={{flex: 2, marginRight: 10}}>
            <Button
            title={checklist[i].complete ? 'Complete' : 'Pending'}
            color={checklist[i].complete ? 'green' : 'orange'}
            onPress={() => {
              setChecklist(updateTask(checklist, i));
            }} />
          </View>
          <View style={{flex: 2}}>
            <Button
            title='Delete'
            color='red'
            onPress={() => {
              Alert.alert(
                "Delete this task?",
                "Are you sure you wish to delete this event?",
                [
                  {text: 'Yes', onPress: () => {
                    setChecklist(deleteTask(checklist, checklist[i].name));
                    alert("Task deleted");
                  }},
                  {text: 'No'}
                ]
              );
            }} />
          </View>
        </View>
      );
    }
  }
  return checklistItems;
}
