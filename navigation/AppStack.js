import {View, Text} from 'react-native';
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {HomeScreen} from '../screens';

const Drawer = createDrawerNavigator();

const AppStack = () => {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          drawerLabel: 'Home',
          title: 'Home',
          // drawerIcon: function ({color, size, focused}) {
          //   return <AntDesign  name="shoppingcart" size={size} color={color} />;
          // },
          drawerLabelStyle: {marginLeft: -25},
        }}
      />
    </Drawer.Navigator>
  );
};

export default AppStack;
