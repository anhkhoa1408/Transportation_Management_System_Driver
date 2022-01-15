import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';

export const InfoField = ({ title, content }) => {
  return (
    <View style={{ flex: 1 }}>
      <Text style={style.infoTittle}>{title}</Text>
      <Text style={style.infoContent}>{content}</Text>
    </View>
  );
};

const style = StyleSheet.create({
  infoTittle: {
    fontSize: 15,
    color: 'rgba(0, 0, 0, 0.5)',
  },
  infoContent: {
    fontSize: 19,
    fontWeight: 'bold',
  },
});
