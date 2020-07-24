import React, { useState } from 'react';
import {
  Button,
  View,
  Text,
  TextInput,
  Alert
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import {Picker} from '@react-native-community/picker';
import { updateGoal, updateTask } from '../../logic/goals.js';
import { taskNotPresent, deleteTask } from '../../logic/tasks.js';

/**
  Returns the react components that are used to render the checklist
  param checklist: An array of JSON objects that represents tasks, with a name and boolean
  param setChecklist: The function that is used to set the checklist
  param editGoal: Whether details of the goal are editable, default value is true so parameter does not have to be
  provided when creating a goal.
  return React Native component: The react native components used to display tasks
*/
export function goalChecklist(checklist, setChecklist, editGoal=true) {
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

/**
 * Function returns the label picker component for assigning labels to goals
 * @param label: The current goal label, is blank string if no label is selected  
 * @param setLabel: The setLabel function for setting the goal label 
 */
export function labelPicker(label, setLabel, editGoal=true) {
  return(
    <View>
      <View style={{marginTop: 10}}>
        <Text style={{color: 'white'}}>Label</Text>
        <Picker
        enabled={editGoal}
        selectedValue={label}
        onValueChange={(itemValue, itemIndex) => {setLabel(itemValue)}}
        style={{backgroundColor: 'white'}}
        >
          <Picker.Item label="None" value="none" color='black'/>
          <Picker.Item label="Work" value="work" color='blue'/>
          <Picker.Item label="Personal" value="personal" color='green'/>
          <Picker.Item label="Study" value="study" color='orange'/>
          <Picker.Item label="Relationship" value="relationship" color='pink'/>
        </Picker>
      </View>
    </View>
  );
}
