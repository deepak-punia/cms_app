import React, { useState, useEffect } from 'react';
import {  View, FlatList, StyleSheet, TextInput } from 'react-native';
import { useDispatch } from 'react-redux';
import { login, loadUser } from '../actions/auth';
import Alerts from '../components/Alerts';
import { setAlert } from '../actions/alert';
import { Button ,Divider, Text} from 'react-native-paper';

const Login = () => {
  const dispatch = useDispatch();
  const [a, setA] = useState('');
  const [b, setB] = useState('');

  const handleLoginSubmit = () => {
    dispatch(login({ email: a, password: b }));
  };

  return (
    <>
      <View>
        <Text style={styles.headerText} >LOGIN</Text>
        <Divider />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={a}
          onChangeText={(e) => setA(e)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={b}
          onChangeText={(e) => setB(e)}
        />

        <Button style={styles.button} mode="contained" onPress={handleLoginSubmit}>
          Login
        </Button>
      </View>

      <View style={{ flex: 5 }}></View>
      <Alerts componentName={'login'} />
    </>
  );
};
const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  button:{
    margin:20
  },
  headerText:{
    fontSize:30,
    textAlign: "center",
    marginBottom: 30,
  }
});
export default Login;
