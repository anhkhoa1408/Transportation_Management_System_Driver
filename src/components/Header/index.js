import React from 'react';
import { View, Text } from 'react-native';
import { header } from '../../styles/layoutStyle';
import { headerFont } from '../../styles/fontStyle';

const Header = ({ leftElement, headerText, rightElement }) => {
  return (
    <View style={{ ...header }}>
      <View style={{ minWidth: 30 }}>{leftElement}</View>
      <Text style={{ ...headerFont }}>{headerText}</Text>
      <View style={{ minWidth: 30 }}>{rightElement}</View>
    </View>
  );
};

export default Header;
