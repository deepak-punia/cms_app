import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { makeUserMod, deleteUser } from '../../actions/users';
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Button, DataTable } from 'react-native-paper';
import { loadUsers } from '../../actions/users';
import Icon from 'react-native-vector-icons/FontAwesome';
import Alerts from '../Alerts';

const Users = (props) => {
  const users = props.users;

  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(deleteUser(id));
    dispatch(loadUsers());
  };
  const handleerror = () => {
    dispatch(
      setAlert('Can not perform action on this user.', 'success', 'dashboard')
    );
  };
  const handlemakemod = (id) => {
    dispatch(makeUserMod(id));
    dispatch(loadUsers());
  };

  if (!users) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignContent: 'center',
          alignItems: 'center',
        }}>
        <Text>No Data</Text>
      </View>
    );
  }
  return (
    <View>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Username</DataTable.Title>

          <DataTable.Title>Role</DataTable.Title>
          <DataTable.Title>Make Mod</DataTable.Title>
          <DataTable.Title>Delete</DataTable.Title>
        </DataTable.Header>

        <FlatList
          data={users}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => {
            return (
              <DataTable.Row>
                <DataTable.Cell>{item.username}</DataTable.Cell>

                <DataTable.Cell>{item.role}</DataTable.Cell>
                <DataTable.Cell>
                  {item.role == 'admin' || item.role == 'mod' ? (
                    <TouchableOpacity onPress={handleerror}>
                      <Text>
                        <Icon name="check" size={30} color="green" />
                      </Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity onPress={() => handlemakemod(item._id)}>
                      <Text>
                        <Icon name="check" size={30} color="red" />
                      </Text>
                    </TouchableOpacity>
                  )}
                </DataTable.Cell>
                <DataTable.Cell>
                  {item.role == 'admin' ? (
                    <TouchableOpacity onPress={handleerror}>
                      <Text>
                        <Icon name="close" size={30} color="red" />
                      </Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity onPress={() => handleDelete(item._id)}>
                      <Text>
                        <Icon name="close" size={30} color="red" />
                      </Text>
                    </TouchableOpacity>
                  )}
                </DataTable.Cell>
              </DataTable.Row>
            );
          }}
        />
      </DataTable>
      <View style={{ flex: 5 }}></View>
      <Alerts componentName={'users'} />
    </View>
  );
};

export default Users;
