import RNDateTimePicker from '@react-native-community/datetimepicker';
import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Card, Text, Input, Button } from 'react-native-elements';
import CustomInput from '../../components/CustomInput/CustomInput';
import { DatePicker } from '../../components/DatePicker/DatePicker';
import { shadowCard, shadowInput } from '../../styles/layoutStyle';

const AbsenceForm = () => {
  return (
    <View style={formStyle.container}>
      <Card containerStyle={formStyle.form}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
          }}
        >
          <Card.Title>Thời gian</Card.Title>
          <DatePicker />

          <Card.Title>Lý do</Card.Title>
          <CustomInput 
            multiline={true}
            numberOfLines={5}
            maxLength={150}
          />
        </View>
        <Button 
            title="Gửi" 
            containerStyle={formStyle.button}
            buttonStyle={{
                padding: 10
            }}
        />
      </Card>
    </View>
  );
};

const formStyle = StyleSheet.create({
  container: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [
      {
        translateX: -Dimensions.get('window').width * 0.45,
      },
      {
        translateY: -Dimensions.get('window').width * 0.3,
      },
    ],
    width: '90%',
    height: '40%',
    ...shadowCard,
  },
  input: {
    borderWidth: 1,
    borderRadius: 20,
    padding: 0
  },
  form: {
    paddingHorizontal: 35,
    paddingVertical: 35,
    borderRadius: 5
  },
  button: {
    marginTop: 15
  }
});

export default AbsenceForm;
