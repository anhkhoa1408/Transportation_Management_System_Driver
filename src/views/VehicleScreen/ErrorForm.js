import React, { useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Card, Icon } from 'react-native-elements';
import PillButton from '../../components/CustomButton/PillButton';
import { DatePicker } from './../../components/DatePicker';
import CustomInput from '../../components/CustomInput/CustomInput';
import { primary } from '../../styles/color';
import carAPI from '../../api/carAPI';

const ErrorForm = props => {
  const [cause, setCause] = useState('');
  const [date, setDate] = useState(new Date());

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
        <DatePicker onDateChange={setDate} />
        <Card.Title style={{ marginTop: 20 }}>Nguyên nhân</Card.Title>
        <CustomInput
          multiline={true}
          numberOfLines={5}
          maxLength={150}
          onChangeText={text => setCause(text)}
          value={cause}
        />
      </View>
      <PillButton
        title="Gửi"
        containerStyle={formStyle.button}
        buttonStyle={{
          backgroundColor: primary,
        }}
        type="solid"
        onPress={() =>
          carAPI
            .create({
              time: date,
              note: cause,
              car: props.car.id,
            })
            .then(data => console.log(data))
            .catch(error => console.log(error))
        }
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
