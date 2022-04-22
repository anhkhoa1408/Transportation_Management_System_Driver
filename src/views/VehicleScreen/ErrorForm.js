import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Icon, Text } from 'react-native-elements';
import carAPI from '../../api/carAPI';
import PrimaryButton from '../../components/CustomButton/PrimaryButton';
import CustomInput from '../../components/CustomInput/CustomInput';
import { DatePicker } from './../../components/DatePicker';

const ErrorForm = props => {
  const [cause, setCause] = useState('');
  const [date, setDate] = useState(new Date());

  return (
    <View>
      <ScrollView style={formStyle.form}>
        <Icon
          name="close"
          containerStyle={{ alignSelf: 'flex-end' }}
          onPress={() => props.setError(false)}
        />
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}>
          <Text>Thời gian</Text>
          <DatePicker onDateChange={setDate} />
          <Text style={{ marginTop: 20 }}>Nguyên nhân</Text>
          <CustomInput
            multiline={true}
            numberOfLines={5}
            maxLength={150}
            onChangeText={text => setCause(text)}
            value={cause}
          />
        </View>
        <PrimaryButton
          title="Gửi"
          onPress={() =>
            carAPI
              .create({
                time: date,
                note: cause,
                car: props.car.id,
              })
              .then(data => {
                props.onSuccess();
                props.setError(false);
              })
              .catch(error => props.onFailure())
          }
        />
      </ScrollView>
    </View>
  );
};

const formStyle = StyleSheet.create({
  form: {
    paddingHorizontal: 10,
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
