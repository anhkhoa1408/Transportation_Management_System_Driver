import React, { useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Card, Icon } from 'react-native-elements';
import PillButton from '../../components/CustomButton/PillButton';
import { DatePicker } from '../../components/DatePicker';
import CustomInput from '../../components/CustomInput/CustomInput';
import furloughApi from '../../api/furloughApi';

const AbsenceForm = props => {
  const [cause, setCause] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

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
        <Card.Title>Bắt đầu</Card.Title>
        <DatePicker onDateChange={setStartDate} mode="datetime" />
        <Card.Title style={{ marginTop: 15 }}>Kết thúc</Card.Title>
        <DatePicker onDateChange={setEndDate} />
        <Card.Title style={{ marginTop: 15 }}>Lý do</Card.Title>
        <CustomInput
          multiline={true}
          numberOfLines={5}
          onChangeText={text => setCause(text)}
        />
      </View>
      <PillButton
        title="Gửi"
        containerStyle={formStyle.button}
        type="solid"
        onPress={() =>
          furloughApi
            .create({
              reason: cause,
              start_time: startDate,
              end_time: endDate,
            })
            .then(data => {
              props.onSuccess();
              props.setAbsence(false);
            })
            .catch(error => props.onFailure())
        }
      />
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
