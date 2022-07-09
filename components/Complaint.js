import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  FlatList,
  Button,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { loadComplaintwithid } from '../actions/complaints';
import { useSelector, useDispatch } from 'react-redux';
import { Card, Divider } from 'react-native-paper';
import { API_ENDPOINT } from '../actions/types';
import Reply from './Reply';

const Complaint = () => {
  const route = useRoute();
  const id = route.params.id;

  const dispatch = useDispatch();
  const complaint = useSelector((state) => state.complaints.complaint);

  //capatilize first letter of string
  const titleCase = (string) => {
    return string[0].toUpperCase() + string.slice(1).toLowerCase();
  };

  useEffect(() => {
    dispatch(loadComplaintwithid(id));
  }, []);

  if (!complaint) {
    return (
      <View>
        <Text>No Data</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <Card mode={'elevated'} elevation={5} style={{ margin: 7 }}>
          <Card.Title title={complaint.title} subtitle={complaint.status} />
          <Card.Content>
            <Divider />
            <Text>
              {complaint.details} {console.log(complaint.imagesdata.length)}
            </Text>
            <FlatList
              data={complaint.imagesdata}
              keyExtractor={(item) => item._id}
              renderItem={({ item }) => {
                return item.url ? (
                  <Image
                    style={styles.tinyLogo}
                    source={{
                      uri: `${API_ENDPOINT}/${item.url}`,
                    }}
                  />
                ) : (
                  <></>
                );
              }}
            />
          </Card.Content>

          <Card.Actions>
            <Text>{complaint.date}</Text>
          </Card.Actions>
        </Card>
        <FlatList
          data={complaint.replies}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => {
            return (
              <Card mode={'elevated'} elevation={5} style={{ margin: 7 }}>
                <Card.Title title={item.username} subtitle={item.userrole} />
                <Card.Content>
                  <Divider />
                  <Text>{item.reply} </Text>
                  {item.imagesdata.length > 0 ? (
                    <FlatList
                      data={item.imagesdata}
                      keyExtractor={(item) => item._id}
                      renderItem={({ item }) => {
                        return item.url ? (
                          <Image
                            style={styles.tinyLogo}
                            source={{
                              uri: `${API_ENDPOINT}/${item.url}`,
                            }}
                          />
                        ) : (
                          <></>
                        );
                      }}
                    />
                  ) : (
                    <></>
                  )}
                </Card.Content>
              </Card>
            );
          }}
        />

        <Reply id={complaint._id} />
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  tinyLogo: {
    width: 250,
    height: 150,
  },
});
export default Complaint;
