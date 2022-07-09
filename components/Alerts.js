import { useSelector, useDispatch } from 'react-redux';
import { Snackbar } from 'react-native-paper';
import { View, StyleSheet, Text } from 'react-native';
import * as React from 'react';

const Alerts = ({ componentName }) => {
  const alert = useSelector((state) => state.alert);
 
  return (  
    alert !== null &&
    alert.length > 0 &&
    alert.map((item) => (
      <>
      
        {item.componentName === componentName ? (
          <View style={styles.container}> 
            <Snackbar
              visible={true}  
              onDismiss={()=>{}}
        action={{
          label: 'X',
          onPress: () => {
            // Do something
          },}}
              >
              {item.msg}
            </Snackbar>
          </View>
        ) : (
          <></>
        )}
      </>
    ))
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
});

export default Alerts;
