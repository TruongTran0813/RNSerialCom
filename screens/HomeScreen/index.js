import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  NativeModules,
  NativeEventEmitter,
} from 'react-native';
import React, {useState, useEffect} from 'react';

export default function HomeScreen() {
  const [scaleValue, setScaleValue] = useState('0');
  useEffect(() => {
    const eventEmitter = new NativeEventEmitter(NativeModules.SerialComModule);
    let eventListener = eventEmitter.addListener('onDataReceive', event => {
      setScaleValue(event?.data || '');
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
