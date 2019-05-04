import React from 'react';
import {
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import Text from './Text';
import Colors from '../../constants/Colors';

const CustomButton = (props) => {

  const styles = StyleSheet.create({
    btn: {
      backgroundColor: Colors.navyBlue,
      paddingHorizontal: 10,
      height: 26,
      borderRadius: 25,
      justifyContent: 'center',
      alignItems: 'center',
      marginHorizontal: 10
    }
  })

  return (
   <TouchableOpacity
    {...props}
    style={[styles.btn, props.style]}
   >  
    {props.addButton ?
      <Text bold>+</Text>
    :
      props.children
    }
   </TouchableOpacity>
  )
}

export default CustomButton