import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Card, Icon } from 'react-native-elements';
import PillButton from '../../components/CustomButton/PillButton';
import CustomInput from '../../components/CustomInput/CustomInput';
import { DatePicker } from '../../components/DatePicker';

const AbsenceForm = props => {
  return (
    <View style={formStyle.form}>
      <Icon
        name="close"
        containerStyle={{ alignSelf: 'flex-end' }}
        onPress={() => props.setAbsence(false)}
      />
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
        }}>
        <Card.Title>Thời gian</Card.Title>
        <DatePicker />
        <Card.Title style={{ marginTop: 15 }}>Lý do</Card.Title>
        <CustomInput multiline={true} numberOfLines={5} />
      </View>
      <PillButton title="Gửi" containerStyle={formStyle.button} type="solid" />
    </View>
  );
};

const formStyle = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderRadius: 20,
    padding: 0,
  },
  form: {
    borderRadius: 20,
  },
  button: {
    marginTop: 30,
  },
});

export default AbsenceForm;
