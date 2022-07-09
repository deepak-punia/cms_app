import React, { useState } from 'react';
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { setAlert } from '../actions/alert';
import { loadComplaintwithid, loadUserComplaints } from '../actions/complaints';
import Alerts from './Alerts';
import { API_ENDPOINT } from '../actions/types';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import setAuthToken from '../utils/setAuthToken';
import { Card, Button } from 'react-native-paper';

import * as SecureStore from 'expo-secure-store';

async function getValueFor(key) {
  let result = await SecureStore.getItemAsync(key);
  if (result) {
    console.log('token from device: ' + result);
    return result;
  } else {
    console.log('no Local Token value');
    return null;
  }
}

const Reply = (props) => {
  const [details, setDetails] = useState('');
  const [uploadfile, setUploadfile] = useState(null);

  const dispatch = useDispatch();
  //const user = useSelector((state) => state.auth);
  const handleSubmit = async () => {
    const formData = new FormData();
    if (uploadfile) {
      let filename = uploadfile.split('/').pop();

      // Infer the type of the image
      let match = /\.(\w+)$/.exec(filename);
      let type = match ? `image/${match[1]}` : `image`;

      formData.append('reply', {
        type: type,
        uri: uploadfile,
        name: filename,
      });
    }
    formData.append('replymsg', details);

    const Login = await getValueFor('Login');
    if (Login) {
      setAuthToken(Login);
      console.log('OK');
    }
    //send data to server
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };
      const url = `${API_ENDPOINT}/api/complaint/${props.id}`;
      console.log(url);
      const response = await axios.post(
        `${API_ENDPOINT}/api/complaint/${props.id}`,
        formData,
        config
      );

      console.log(response);

      dispatch(setAlert('Response Added..', 'success', 'reply'));
      dispatch(loadComplaintwithid(props.id));
      dispatch(loadUserComplaints());
      setDetails('');
      setUploadfile(null);
    } catch (error) {
      console.log(error);
      dispatch(setAlert('Error! Please try again', 'danger', 'reply'));
    }
  };

  const selectFile = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setUploadfile(result.uri);
    }
  };

  return (
    <>
      <View>
        <Card mode={'elevated'} elevation={5} style={{ margin: 7 }}>
          <Card.Title title="Reply:" />
          <Card.Content>
            <TextInput
              style={styles.input}
              placeholder="Details"
              value={details}
              onChangeText={(e) => setDetails(e)}
            />

            <Button
              icon="camera"
              mode="outlined"
              style={{ width: '94%', margin: 12, padding: 10 }}
              onPress={selectFile}>
              Select Image
            </Button>
            <Text>
              {uploadfile && (
                <Image
                  source={{ uri: uploadfile }}
                  style={{ width: 200, height: 200 }}
                />
              )}
            </Text>

            <Button mode="contained" onPress={handleSubmit}>
              Submit Reply{' '}
            </Button>
          </Card.Content>
        </Card>
      </View>

      <View style={{ flex: 5 }}></View>
      <Alerts componentName={'reply'} />
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
});
export default Reply;
