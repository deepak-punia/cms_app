import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  TextInput,
  ScrollView,
} from 'react-native';
import { Button } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../actions/auth';
import { loadUserComplaints } from '../actions/complaints';
import Alerts from './Alerts';
import CreateComplaint from './CreateComplaint';
import Complaints from './Complaints';
import Complaint from './Complaint';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

const Dashboard = () => {
  const [displayComponent, setDisplayComponent] = useState('info');
  const [details, setDetails] = useState(false);
  const user = useSelector((state) => state.auth);
  const alert = useSelector((state) => state);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleLogout = () => {
    dispatch(logout());
  };

  useEffect(() => {
    if (!user.isAuthenticated) {
      navigation.navigate('Home');
    }
    dispatch(loadUserComplaints()).then(() => {
      setDisplayComponent('complaints');
    });
  }, []);

  if (!user.isAuthenticated) {
    navigation.navigate('Home');
  }

  return (
    <>
      <View style={{ flex: 1 }}>
        <ScrollView>
          <Button
            mode={'contained'}
            onPress={() => {
              navigation.navigate('CreateComplaint');
            }}>
            Create Complaint{' '}
          </Button>
          {displayComponent === 'info' ? (
            <Text>Loading</Text>
          ) : (
            <>
              <Complaints />
              <Button style={styles.footer} onPress={handleLogout}>
                Logout
              </Button>
            </>
          )}
          {console.log('Dashboard state:')}
          {console.log(alert)}

          <View style={{ flex: 5 }}></View>
          <Alerts componentName={'dashboard'} />
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  footer: {
    marginTop: 180,
  },
});
export default Dashboard;
