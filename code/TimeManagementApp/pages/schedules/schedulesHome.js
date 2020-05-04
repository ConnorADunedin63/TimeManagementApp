import 'react-native-gesture-handler';
import React from 'react';
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

export default function SchedulesStack() {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator initialRouteName="SchedulesHome">
      <Stack.Screen options={{headerShown: false}} name="SchedulesHome" component={SchedulesHome} />
    </Stack.Navigator>
  );
}

function SchedulesHome() {
  return (
    <View>
      <Text>Schedule Home</Text>
    </View>
  );
}
