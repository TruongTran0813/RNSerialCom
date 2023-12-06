import {View, Text} from 'react-native';
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {HomeScreen, MaterialPutAwayScreen} from '../screens';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Divider} from 'react-native-paper';
import {CustomDrawer} from '../components';
import {userStore} from '../stores';
const Drawer = createDrawerNavigator();

const AppStack = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={props => <CustomDrawer {...props} />}>
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          drawerLabel: 'Home',
          title: 'Home',
          drawerIcon: function ({color, size, focused}) {
            return <FontAwesome name="home" size={size} color={color} />;
          },
          drawerLabelStyle: {marginLeft: -25},
        }}
      />
      <Drawer.Screen
        name="MaterialPutAway"
        component={MaterialPutAwayScreen}
        options={{
          drawerLabel: 'Material Put Away',
          title: 'Material Put Away',
          drawerIcon: function ({color, size, focused}) {
            return (
              <MaterialIcons name="label-important" size={size} color={color} />
            );
          },
          drawerLabelStyle: {marginLeft: -25},
        }}
      />
    </Drawer.Navigator>
  );
};

export default AppStack;
