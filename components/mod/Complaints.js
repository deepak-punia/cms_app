import React, { useState } from 'react';
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { DataTable } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native-paper';
import {
  reslveComplaintwithid,
  loadAllComplaints ,
} from '../../actions/complaints';

const Complaints = () => {
  const complaints = useSelector((state) => state.complaints.allcomplaints);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  //capatilize first letter of string
  const titleCase = (string) => {
    return string[0].toUpperCase() + string.slice(1).toLowerCase();
  };

  const handleResolve = (id) => {
    dispatch(reslveComplaintwithid(id));
    dispatch(loadAllComplaints());
  };

  if (!complaints || complaints.length == 0) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignContent: 'center',
          alignItems: 'center',
        }}>
        <Text>No Complaints</Text>
      </View>
    );
  }

  return (
    <View>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Title</DataTable.Title>
          <DataTable.Title>Priority</DataTable.Title>
          <DataTable.Title>Status</DataTable.Title>
          <DataTable.Title>Response</DataTable.Title>
        </DataTable.Header>

        <FlatList
          data={complaints}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('Complaint', { id: item._id })
                }>
                <DataTable.Row>
                  <DataTable.Cell>{titleCase(item.title)}</DataTable.Cell>
                  <DataTable.Cell>{titleCase(item.priority)}</DataTable.Cell>
                  <DataTable.Cell>
                    <Text
                      style={
                        item.status === 'resolved'
                          ? styles.greenclr
                          : styles.redclr
                      }>
                      {' '}
                      {item.status === 'resolved' ? (
                        titleCase(item.status)
                      ) : (
                        <>
                          <TouchableOpacity
                            onPress={() => handleResolve(item._id)}>
                            <Text
                              style={
                                item.status === 'resolved'
                                  ? styles.greenclr
                                  : styles.redclr
                              }>
                              {titleCase(item.status)}
                            </Text>
                          </TouchableOpacity>
                        </>
                      )}
                    </Text>
                  </DataTable.Cell>
                  <DataTable.Cell>{item.replies.length}</DataTable.Cell>
                </DataTable.Row>
              </TouchableOpacity>
            );
          }}
        />
      </DataTable>
    </View>
  ); 
};
const styles = StyleSheet.create({
  redclr: {
    color: 'red',
  },
  greenclr: {
    color: 'green',
  },
});
export default Complaints;
