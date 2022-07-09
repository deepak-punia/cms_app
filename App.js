import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/Home';
import Dashboard from './components/Dashboard';
import { Provider } from 'react-redux';
import store from './store/store';
import Complaint from './components/Complaint';
import CreateComplaint from './components/CreateComplaint';
import ModDashboard from './components/mod/ModDashboard';
import AdminDashboard from './components/admin/AdminDashboard';

const Stack = createNativeStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Dashboard" component={Dashboard} />
      <Stack.Screen name="Complaint" component={Complaint} />
      <Stack.Screen name="CreateComplaint" component={CreateComplaint} />
      <Stack.Screen name="ModDashboard" component={ModDashboard} />
      <Stack.Screen name="AdminDashboard" component={AdminDashboard} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <MyStack />
      </NavigationContainer>
    </Provider>
  );
}
