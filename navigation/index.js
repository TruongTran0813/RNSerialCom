import {View, Text} from 'react-native';
import React from 'react';
import {userStore} from '../stores';
import {createStackNavigator} from '@react-navigation/stack';
import _ from 'lodash';
import {LoginScreen} from '../screens';
import AppStack from './AppStack';

const Stack = createStackNavigator();

export default function Navigator() {
  const currentUser = userStore(state => state.currentUser);
  console.log('🚀 ~ file: index.js:13 ~ Navigator ~ currentUser:', currentUser);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        presentation: 'card',
      }}>
      {!_.isEmpty(currentUser) ? (
        <Stack.Screen name="App">
          {props => <AppStack {...props} />}
        </Stack.Screen>
      ) : (
        <Stack.Screen
          name="Login"
          options={{
            headerShown: false,
          }}>
          {props => {
            return <LoginScreen {...props} />;
          }}
        </Stack.Screen>
      )}
    </Stack.Navigator>
  );
}
