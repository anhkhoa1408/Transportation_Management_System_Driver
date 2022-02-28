import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-elements';
import { FONTS } from '../../styles';

export default function InfoField({ title, content, style = {} }) {
  return (
    <View style={{ ...style }}>
      <Text style={{ ...FONTS.Medium, color: 'rgba(0, 0, 0, 0.5)' }}>
        {title}
      </Text>
      <Text style={{ ...FONTS.BigBold }}>{content}</Text>
    </View>
  );
}
