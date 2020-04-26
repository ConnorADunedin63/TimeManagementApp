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
import { setGoals } from '../logic/goals.js';
import { getDayOfWeek, convertTo12HourFormat, getMonth, getCompleteDate } from '../helpers/timeHelper.js';

export default function editGoal({ route, navigation }) {
  const goal = route.params.goal;
  const [name, setName] = useState(goal.name);
  const [description, setDescription] = useState(goal.description);
  const [date, setDate] = useState(goal.date);
  // Initially the user is only viewing the goal
  const [editGoal, setEdit] = useState(false);

  return (
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
        <View style={editGoal ? styles.createContainer : {display: 'none'}}>
          <Button title="Edit Goal"
          onPress={() => {setGoals(name, description, date); navigation.navigate('Home')}}
          disabled={name === '' ? true : false }></Button>
        </View>
      </View>
    </View>
  );
}

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
