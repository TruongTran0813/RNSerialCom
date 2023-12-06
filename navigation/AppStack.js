import {View, Text} from 'react-native';
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {HomeScreen} from '../screens';
import Icon from 'react-native-vector-icons/FontAwesome';
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
            return <Icon name="home" size={size} color={color} />;
          },
          drawerLabelStyle: {marginLeft: -25},
        }}
      />
    </Drawer.Navigator>
  );
};

export default AppStack;
