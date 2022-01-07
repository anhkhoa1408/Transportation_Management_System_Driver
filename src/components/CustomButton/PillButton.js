import React from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';

const PillButton = ({ containerStyle, buttonStyle, ...props }) => {
  return (
    <Button
      {...props}
      containerStyle={{
        ...containerStyle,
        borderRadius: 20,
      }}
      buttonStyle={{
        ...buttonStyle,
        padding: 10,
      }}
			TouchableComponent={TouchableOpacity}
			activeOpacity={0.7}
    />
  );
};

export default PillButton;
