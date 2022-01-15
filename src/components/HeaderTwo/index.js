import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { primaryColor } from '../../styles/color';
import { header } from '../../styles/layoutStyle';

const HeaderTwo = () => {
  return (
    <View style={style.header}>
      {/* <BadgedIcon name="notifications" color={primaryColor} size={30} /> */}
      <Text style={style.headerFont}>{/* Xin chào, {data.name} */}</Text>
      <Avatar rounded size="small" source={{ uri: data.avatar }} />
    </View>
  );
};

const style = StyleSheet.create({
  header: { ...header },
});

export default HeaderTwo;
