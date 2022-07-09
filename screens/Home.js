import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, TextInput } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { loadUser } from '../actions/auth';
import { setAlert } from '../actions/alert';
import Login from '../components/Login';
import Register from '../components/Register';
import { Button, Text } from 'react-native-paper';

const Home = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth);

  const [displayLogin, setDisplayLogin] = useState(true);

  if (user.isAuthenticated && user.user && user.user.role === 'user') {
    navigation.navigate('Dashboard');
  } else if (user.isAuthenticated && user.user && user.user.role === 'mod') {
    navigation.navigate('ModDashboard');
  } else if (user.isAuthenticated && user.user && user.user.role === 'admin') {
    navigation.navigate('AdminDashboard');
  }

  useEffect(() => {
    console.log('useeffect!');
    dispatch(loadUser());
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.innercontainer}>
        {displayLogin ? <Login /> : <Register />}
      </View>
      <Text>
        {displayLogin ? "Don't have an account?" : 'Already have an account?'}
      </Text>
      <Button
        style={styles.footer}
        onPress={() => setDisplayLogin((prevState) => !prevState)}>
        {displayLogin ? 'Register' : 'Login'}
      </Button>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    marginBottom: 60,
  },
  innercontainer: {
    width: '80%',
  },
});
export default Home;
