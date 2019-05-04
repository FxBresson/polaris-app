import React from 'react';
import {
  Text,
  StyleSheet
} from 'react-native';
import Colors from '../../constants/Colors';

const CustomText = (props) => {

  const sizes = {
    h1: 24,
    h2: 18,
    h3: 16,
    regular: 14
  }

  let fontSize = sizes.regular

  for (const key in props) {
    if (props.hasOwnProperty(key) && props[key] && sizes.hasOwnProperty(key)) {
      fontSize = sizes[key]
    }
  }

  const styles = StyleSheet.create({
    text: {
      color: Colors.textColor,
      fontSize: fontSize,
      fontWeight: props.bold ? 'bold' : 'normal',
      fontStyle: props.italic ? 'italic' : 'normal',
      ...props.style
    }
  })

  return (
    <Text {...props} style={styles.text}>
      {props.children}
    </Text>
  )
}

export default CustomText