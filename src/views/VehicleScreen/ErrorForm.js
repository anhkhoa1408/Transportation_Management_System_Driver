import React, { useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Card, Icon } from 'react-native-elements';
import PillButton from '../../components/CustomButton/PillButton';
import { DatePicker } from './../../components/DatePicker';
import CustomInput from '../../components/CustomInput/CustomInput';
import { primary } from '../../styles/color';

const ErrorForm = props => {
  return (
    <View style={formStyle.form}>
      <Icon
        name="close"
        containerStyle={{ alignSelf: 'flex-end' }}
        onPress={() => props.setError(false)}
      />
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
        }}>
        <Card.Title>Thời gian</Card.Title>
        <DatePicker />
        <Card.Title style={{ marginTop: 20 }}>Nguyên nhân</Card.Title>
        <CustomInput multiline={true} numberOfLines={5} maxLength={150} />
      </View>
      <PillButton
        title="Gửi"
        containerStyle={formStyle.button}
        buttonStyle={{
          backgroundColor: primary,
        }}
        type="solid"
        onPress={() => console.log(1)}
      />
    </View>
  );
};

const formStyle = StyleSheet.create({
  input: {
    borderRadius: 20,
    padding: 0,
  },
  button: {
    marginTop: 20,
    color: '#FFF',
  },
});

export default ErrorForm;
