import React from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
import {
  Overlay
} from 'react-native-elements';
import Colors from '../../constants/Colors';

const CustomOverlay = (props) => {

  const styles = StyleSheet.create({

  })

  return (
    <Overlay
      windowBackgroundColor="rgba(0, 0, 0, .7)"
      width="auto"
      height="auto"
      borderRadius={25}
      overlayStyle={{marginVertical: 20}}
      overlayBackgroundColor={Colors.denimBlue}
      {...props}
    >
      <View style={{padding: 10}}>
        {props.children}
      </View>
    </Overlay>
  )
}

export default CustomOverlay