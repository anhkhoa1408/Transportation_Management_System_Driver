import React from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';

function PillButton(props) {
  return (
    <Button
      containerStyle={{
        ...props.containerStyle,
        borderRadius: 20,
      }}
      buttonStyle={{
        ...props.buttonStyle,
        padding: 10,
      }}
      TouchableComponent={TouchableOpacity}
      activeOpacity={0.7}
      {...props}
    />
  );
}

export default PillButton;
