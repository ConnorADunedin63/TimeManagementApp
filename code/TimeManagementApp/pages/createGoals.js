import React, { useState } from 'react';
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
  Platform,
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
import { setGoals } from '../logic/goals.js';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    backgroundColor: '#20639B'
  },
  sectionTitleContainer: {
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 32,
    textDecorationLine: 'underline',
    color: 'white'
  },
  sectionContainer: {
     flex: 4,
     alignItems: 'stretch'
  },
  formContainer: {
    flex: 1,
    marginLeft: 10,
    marginRight: 20,
  },
  formInput: {
    marginTop: 10,
    backgroundColor: '#D3D3D3'
  },
  formDateInput: {
    marginTop: 10,
    backgroundColor: 'white'
  },
  timeBtn: {
    marginTop: 5
  },
  createContainer: {
    marginTop: 40
  }
});


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

    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ]

    const months = [
        "January",
        "Febuary",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ]

    return (
    <View>
      <View>
        <TextInput placeholder={"Date: " + date.getHours() + ": " + date.getMinutes() + " " + days[date.getDay()] + ", " + date.getDate() + " " + months[date.getMonth()] + " " + date.getFullYear()} style={styles.formDateInput} editable={false} selectTextOnFocus={false}></TextInput>
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
