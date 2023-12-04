/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  NativeModules,
  NativeEventEmitter,
  Button,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function App(): JSX.Element {
  useEffect(() => {
    const eventEmitter = new NativeEventEmitter(NativeModules.SerialComModule);
    let eventListener = eventEmitter.addListener('onDataReceive', event => {
      console.log(event); // "someValue"
    });
  }, []);
  return (
    <SafeAreaView>
      <Text>test</Text>
      <Button
        title="test"
        onPress={() => NativeModules.SerialComModule.testSendEvent()}></Button>
    </SafeAreaView>
  );
}

export default App;
