import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Card, Icon } from 'react-native-elements';
import PillButton from '../../components/CustomButton/PillButton';
import { containerOverlay, shadowCard } from '../../styles/layoutStyle';
import { DatePicker } from './../../components/DatePicker';
import CustomInput from '../../components/CustomInput/CustomInput';
import { backdropColor } from '../../styles/color';

const ErrorForm = props => {
  return (
    <View style={formStyle.container}>
      <Card
        wrapperStyle={{
          backgroundColor: '#FFF',
          padding: 25,
          borderRadius: 20,
        }}
        containerStyle={formStyle.form}>
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
          type="solid"
        />
      </Card>
    </View>
  );
};

const formStyle = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: backdropColor,
    opacity: 0.8,
    zIndex: 1,
  },
  form: {
    borderRadius: 20,
    padding: 0,
    backgroundColor: '#FFF',
  },
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
