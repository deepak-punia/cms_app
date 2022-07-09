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
import { Button, Divider } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { setAlert } from '../actions/alert';
import { loadUserComplaints } from '../actions/complaints';
import Alerts from './Alerts';
import { API_ENDPOINT } from '../actions/types';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import setAuthToken from '../utils/setAuthToken';
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

const CreateComplaint = () => {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('medium');
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

      formData.append('complaint', {
        type: type,
        uri: uploadfile,
        name: filename,
      });
    }
    formData.append('title', title);
    formData.append('priority', priority);
    formData.append('details', details);

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
      const url = `${API_ENDPOINT}/api/complaint`;
      console.log(url);
      const response = await axios.post(
        'http://complaint-management-software.herokuapp.com/api/complaint',
        formData,
        config
      );

      console.log(response);

      dispatch(setAlert('Complaint is created.', 'success', 'createComplaint'));
      dispatch(loadUserComplaints());
      setTitle('');
      setDetails('');
      setPriority('medium');
      setUploadfile(null);
    } catch (error) {
      console.log(error);
      dispatch(
        setAlert('Error! Please try again', 'danger', 'createComplaint')
      );
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
        <Text style={styles.headerText}>Create Complaint</Text>
        <Divider />
        <TextInput
          style={styles.input}
          placeholder="Title"
          value={title}
          onChangeText={(e) => setTitle(e)}
        />
        <TextInput
          style={styles.input}
          placeholder="Priority"
          value={priority}
          onChangeText={(e) => setPriority(e)}
        />

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
          Select Image{' '}
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
          Create complaint{' '}
        </Button>
      </View>

      <View style={{ flex: 5 }}></View>
      <Alerts componentName={'createComplaint'} />
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
  headerText: {
    fontSize: 30,
    textAlign: 'center',
  },
});
export default CreateComplaint;
