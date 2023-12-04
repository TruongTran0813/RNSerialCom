/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
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
  const [scaleValue, setScaleValue] = useState('0');
  useEffect(() => {
    const eventEmitter = new NativeEventEmitter(NativeModules.SerialComModule);
    let eventListener = eventEmitter.addListener('onDataReceive', event => {
      setScaleValue(event?.data || '');
      //dữ liệu nhận là liên tục có dạng {"data": " ST,GS,+      0.12g ST,GS"}, nếu chuổi có từ "ST", show 0.12 g lên textbox
      console.log(event); // "someValue"
    });
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Serial Scale</Text>
      <View style={styles.scaleContainer}>
        <Text style={styles.scaleValue}>{scaleValue}</Text>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'blue', // Màu sắc của tiêu đề
  },
  scaleContainer: {
    backgroundColor: 'lightgray', // Màu nền của scaleValue
    padding: 10,
    borderRadius: 8, // Bo góc
    marginVertical: 10, // Khoảng cách giữa tiêu đề và giá trị scale
    borderWidth: 2, // Độ rộng của border
    borderColor: 'darkgray', // Màu sắc của border
    width: '80%',
  },
  scaleValue: {
    fontSize: 30,
    color: 'black', // Màu sắc của giá trị
    textAlign: 'center',
  },
});
export default App;
