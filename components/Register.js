import { View, FlatList,StyleSheet, TextInput } from 'react-native';
import React,{ useState } from "react";
import { setAlert } from "../actions/alert";
import { register } from "../actions/auth";
import { useSelector, useDispatch } from "react-redux";
import Alerts from "./Alerts";
import { Button ,Divider, Text} from 'react-native-paper';

const Register = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [pass, setPass] = useState("");

	const dispatch = useDispatch();
	const user = useSelector((state) => state.auth);

	//handle form submit button
	const handleRegisterSubmit = () => {
		console.log("OK");
		dispatch(register({ name, email, password: pass }));
	};

	return (
		<>
    
    <View> 
    
    <Text style={styles.headerText} >REGISTER</Text>
    <Divider />
    <TextInput style={styles.input} placeholder="Name" value={name} onChangeText={(e)=>setName(e)} />
    <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={(e)=>setEmail(e)} />
    <TextInput style={styles.input} placeholder="Password" value={pass} onChangeText={(e)=>setPass(e)} />
    
    
    <Button style={styles.button} mode="contained" onPress={handleRegisterSubmit}>
          Register
        </Button>

    </View>

    
    <View style={{flex:5}}></View> 
    <Alerts componentName={"resgiter"} /> 
    
    </>
  );
}
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
export default Register;