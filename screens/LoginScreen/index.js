import {View, Text, KeyboardAvoidingView, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {Button, TextInput} from '../../components';
import {theme} from '../../utils';
import {authService} from '../../services';
import {userStore} from '../../stores';

export default function LoginScreen() {
  const dispatchSetToken = userStore(state => state.dispatchSetToken);

  const dispatchSetCurrentUser = userStore(
    state => state.dispatchSetCurrentUser,
  );

  const [values, setValues] = useState({
    username: 'admin',
    password: 'admin',
    db: 'wms',
  });
  const handleLogin = async () => {
    try {
      const result = await authService.login(values);
      console.log('🚀 ~ file: index.js:23 ~ handleLogin ~ result:', result);
      if (result) {
        dispatchSetToken(result.access_token, result.refresh_token);
        const userInfo = {
          userId: result.res_user.id,
          userName: values.username,
          fullName: result.res_user.name,
          RoleNameList: [],
        };
        dispatchSetCurrentUser(userInfo);
      } else {
        alert('Username or Password is invalid');
      }
    } catch (error) {
      console.log('🚀 ~ file: index.js:28 ~ handleLogin ~ error:', error);
      alert('Username or Password is invalid');
    }
  };
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Text style={styles.header}>Login</Text>
      <TextInput
        label="Database"
        returnKeyType="next"
        value={values.db}
        onChangeText={text => setValues(prev => ({...prev, db: text}))}
        autoCapitalize="none"
      />
      <TextInput
        label="User Name"
        returnKeyType="next"
        value={values.username}
        onChangeText={text => setValues(prev => ({...prev, username: text}))}
        // error={!!email.error}
        // errorText={email.error}
        autoCapitalize="none"
      />

      <TextInput
        label="Password"
        returnKeyType="done"
        value={values.password}
        onChangeText={text => setValues(prev => ({...prev, password: text}))}
        // error={!!password.error}
        // errorText={password.error}
        secureTextEntry
      />
      <Button mode="contained" onPress={handleLogin}>
        Login
      </Button>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    padding: 20,
    width: '100%',

    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 26,
    color: theme.colors.primary,
    fontWeight: 'bold',
    paddingVertical: 14,
  },
});
