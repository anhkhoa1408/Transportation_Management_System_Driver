import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Card, Icon, Text } from 'react-native-elements';
import PillButton from '../../components/CustomButton/PillButton';
import { DatePicker } from '../../components/DatePicker';
import CustomInput from '../../components/CustomInput/CustomInput';
import furloughApi from '../../api/furloughApi';
import TextField from '../../components/TextField';

const AbsenceForm = props => {
  const [cause, setCause] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [absenceDays, setAbsenceDays] = useState('1');

  return (
    <View>
      <Icon
        name="close"
        containerStyle={{ alignSelf: 'flex-end', marginRight: 15 }}
        onPress={() => {
          props.setAbsence(false);
          props.onOpen(false);
        }}
      />
      <ScrollView contentContainerStyle={{ paddingHorizontal: 15 }}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}>
          <Text>Ngày bắt đầu nghỉ</Text>
          <DatePicker onDateChange={setStartDate} mode="datetime" />
          <Text>Số ngày nghỉ</Text>
          <TextField
            name="Số ngày nghỉ"
            keyboardType="numeric"
            value={absenceDays}
            onChangeText={setAbsenceDays}
            error={parseInt(absenceDays) < 1}
            errorMessage={'Số ngày nghỉ phải lớn hơn 0'}
          />
          <Text>Lý do</Text>
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
                days: absenceDays,
              })
              .then(data => {
                props.setModal({
                  type: 'success',
                  message: 'Cập nhật thành công!',
                });
                props.setAbsence(false);
              })
              .catch(error => {
                props.setModal({
                  type: 'warning',
                  message: 'Cập nhật thất bại!',
                });
                props.setAbsence(false);
              })
          }
        />
      </ScrollView>
    </View>
  );
};

const formStyle = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderRadius: 20,
    padding: 0,
  },
});

export default AbsenceForm;
