import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  TextInput,
  ScrollView,
  Dimensions,
} from 'react-native';
import { Button, DataTable } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../actions/auth';
import { loadAllComplaints } from '../../actions/complaints';
import { loadUsers } from '../../actions/users';
import Alerts from '../Alerts';
import CreateComplaint from '../CreateComplaint';
import Complaints from '../mod/Complaints';
import Complaint from '../Complaint';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import Users from './Users';
import Icon from 'react-native-vector-icons/FontAwesome';
import { BarChart } from 'react-native-chart-kit';
import { Card } from 'react-native-paper';

const AdminDashboard = () => {
  const [displayComponent, setDisplayComponent] = useState('info');
  const [details, setDetails] = useState(false);
  const user = useSelector((state) => state.auth);
  const alert = useSelector((state) => state);
  const users = useSelector((state) => state.users.users);
  const complaints = useSelector((state) => state.complaints.allcomplaints);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleLogout = () => {
    dispatch(logout());
  };

  useEffect(() => {
    if (!user.isAuthenticated) {
      navigation.navigate('Home');
    }
    dispatch(loadAllComplaints()).then(() => {
      dispatch(loadUsers()).then(() => {
        setDisplayComponent('dashboard');
      });
    });
  }, []);

  if (!user.isAuthenticated) {
    navigation.navigate('Home');
  }

  if (displayComponent === 'info') {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView>
          <Header setDisplayComponent={setDisplayComponent} />
          <Text>Loading</Text>
          <View style={{ flex: 5 }}></View>
          <Alerts componentName={'dashboard'} />
        </ScrollView>
      </View>
    );
  }
  if (displayComponent === 'dashboard' && complaints.length > 0) {
    {
      console.log('Dashboard state:');
    }
    {
      console.log(alert);
    }
    const resolved = complaints?.filter((item) => item?.status == 'resolved');
    const pending = complaints?.filter((item) => item?.status == 'pending');
    const Prioritypending = pending?.filter((item) => item?.priority == 'high');
    const mods = users.filter((item) => item?.role == 'mod');

    const data = {
      a: complaints.length,
      b: resolved.length,
      c: pending.length,
      d: Prioritypending.length,
    };
    console.log(data);
    return (
      <View style={{ flex: 1 }}>
        <ScrollView>
          <Header setDisplayComponent={setDisplayComponent} />
          <View style={styles.container}>
            <MyCard
              data={{
                a: users.length,
                b: mods.length,
                c: complaints.length,
              }}
            />
            <View>
              <MyBarChart details={data} />
            </View>
          </View>
          <Button style={styles.footer} onPress={handleLogout}>
            Logout
          </Button>
          <View style={{ flex: 5 }}></View>
          <Alerts componentName={'dashboard'} />
        </ScrollView>
      </View>
    );
  }
  if (displayComponent === 'users') {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView>
          <Header setDisplayComponent={setDisplayComponent} />
          <Users users={users} />

          <Button style={styles.footer} onPress={handleLogout}>
            Logout
          </Button>
          <View style={{ flex: 5 }}>
            <Alerts componentName={'dashboard'} />
          </View>
        </ScrollView>
      </View>
    );
  }
  if (displayComponent === 'complaints') {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView>
          <Header setDisplayComponent={setDisplayComponent} />
          <Complaints />
          <Button style={styles.footer} onPress={handleLogout}>
            Logout
          </Button>
          <View style={{ flex: 5 }}></View>

          <Alerts componentName={'dashboard'} />
        </ScrollView>
      </View>
    );
  }

  return (
    <>
      <Text>Loading</Text>
    </>
    // <View style={{ flex: 1 }}>
    //   <ScrollView>
    //     <Header setDisplayComponent={setDisplayComponent} />
    //     {displayComponent === 'info' ? (
    //       <Text>Loading</Text>
    //     ) : (
    //       <>
    //         {displayComponent === 'dashboard' ? (
    //           <>
    //             <View style={styles.container}>
    //               <MyCard
    //                 data={{
    //                   a: users.length,
    //                   b: mods.length,
    //                   c: complaints.length,
    //                 }}
    //               />
    //               <View>
    //                 <MyBarChart details={data} />
    //               </View>
    //             </View>
    //           </>
    //         ) : (
    //           <></>
    //         )}

    //         {displayComponent === 'users' ? <Users users={users} /> : <></>}
    //         {displayComponent === 'complaints' ? <Complaints /> : <></>}

    //         <Button style={styles.footer} onPress={handleLogout}>
    //           Logout
    //         </Button>
    //       </>
    //     )}
    //     {console.log('Dashboard state:')}
    //     {console.log(alert)}

    //     <View style={{ flex: 5 }}></View>
    //     <Alerts componentName={'dashboard'} />
    //   </ScrollView>
    // </View>
  );
};

const MyBarChart = (props) => {
  return (
    <>
      <Text style={styles.header}>Complaints Status</Text>

      <BarChart
        data={{
          labels: ['Total', 'Resolved', 'Pending', 'H-P pending'],
          datasets: [
            {
              data: [
                props.details.a,
                props.details.b,
                props.details.c,
                props.details.d,
              ],
            },
          ],
        }}
        width={Dimensions.get('window').width - 16}
        height={220}
        yAxisLabel={''}
        chartConfig={{
          backgroundColor: '#1cc910',
          backgroundGradientFrom: '#eff3ff',
          backgroundGradientTo: '#efefef',
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 12,
          },
        }}
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </>
  );
};

const Header = ({ setDisplayComponent }) => {
  return (
    <View style={{ flex: 1, flexDirection: 'row', maxHeight: 100 }}>
      <View style={{ flex: 1 }}>
        <Button
          icon="home"
          mode={'contained'}
          onPress={() => {
            setDisplayComponent('dashboard');
          }}>
          Home
        </Button>
      </View>
      <View style={{ flex: 1 }}>
        <Button
          mode={'contained'}
          onPress={() => {
            setDisplayComponent('users');
          }}>
          users
        </Button>
      </View>
      <View style={{ flex: 1 }}>
        <Button
          mode={'contained'}
          onPress={() => {
            setDisplayComponent('complaints');
          }}>
          complaint
        </Button>
      </View>
    </View>
  );
};

const MyCard = (props) => {
  return (
    <>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          maxHeight: 100,
          marginTop: 35,
        }}>
        <View style={{ flex: 1 }}>
          <Card
            mode={'elevated'}
            elevation={5}
            style={{ backgroundColor: 'green', marginRight: 2 }}>
            <Card.Title title="Users:" />
            <Card.Content>
              <Text style={{ fontSize: 20 }}>{props.data.a}</Text>
            </Card.Content>
          </Card>
        </View>
        <View style={{ flex: 1 }}>
          <Card
            mode={'elevated'}
            elevation={5}
            style={{ backgroundColor: 'yellow', marginHorizontal: 2 }}>
            <Card.Title title="Mods:" />
            <Card.Content>
              <Text style={{ fontSize: 20 }}>{props.data.b}</Text>
            </Card.Content>
          </Card>
        </View>
        <View style={{ flex: 1 }}>
          <Card
            mode={'elevated'}
            elevation={5}
            style={{ backgroundColor: 'red', marginLeft: 2 }}>
            <Card.Title title="Complaints:" />
            <Card.Content>
              <Text style={{ fontSize: 20 }}>{props.data.c}</Text>
            </Card.Content>
          </Card>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  footer: {
    marginTop: 180,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    padding: 10,
  },
  header: {
    textAlign: 'center',
    fontSize: 18,
    padding: 16,
    marginTop: 16,
  },
});
export default AdminDashboard;
