import React from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { TouchableOpacity } from 'react-native';
import { COLORS } from '../../styles';

function PrimaryButton({ containerStyle, buttonStyle, ...props }) {
  return (
    <Button
      containerStyle={{
        borderRadius: 8,
        marginVertical: 15,
        ...containerStyle,
      }}
      buttonStyle={{
        padding: 14,
        backgroundColor: props.backgroundColor
          ? props.backgroundColor
          : COLORS.primary,
        ...buttonStyle,
      }}
      titleStyle={{
        fontSize: 16,
        textTransform: 'uppercase',
        color: props.neutralColor ? props.neutralColor : COLORS.white,
      }}
      TouchableComponent={TouchableOpacity}
      activeOpacity={0.7}
      {...props}
    />
  );
}

export default PrimaryButton;
