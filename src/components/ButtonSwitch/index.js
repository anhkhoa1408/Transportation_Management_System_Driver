import React, { useState, useRef, useCallback } from 'react';
import { ButtonGroup } from 'react-native-elements';
import { View, StyleSheet, Text, Dimensions } from 'react-native';
import { COLORS } from '../../styles';

const ButtonSwitch = () => {
  return <View style={style.container}></View>;
};

const style = StyleSheet.create({
  container: {
    // marginBottom: 10,
    flex: 1,
  },
  overlayBtn: {
    backgroundColor: 'transparent',
    borderBottomColor: COLORS.primary,
    borderBottomWidth: 4,
    borderRadius: 20,
  },
});

export default ButtonSwitch;
