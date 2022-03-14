import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Card, Icon, Text } from 'react-native-elements';
import PillButton from '../../components/CustomButton/PillButton';
import { DatePicker } from '../../components/DatePicker';
import CustomInput from '../../components/CustomInput/CustomInput';
import furloughApi from '../../api/furloughApi';

const AbsenceForm = props => {
  const [cause, setCause] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

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
          <Text>Bắt đầu</Text>
          <DatePicker onDateChange={setStartDate} mode="datetime" />
          <Text>Kết thúc</Text>
          <DatePicker onDateChange={setEndDate} />
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
                end_time: endDate,
              })
              .then(data => {
                props.setModal({
                  type: 'success',
                  message: 'Cập nhật thành công!',
                });
                props.setAbsence(false); // TODO: update absence
              })
              .catch(error =>
                props.onFailure({
                  type: 'warning',
                  message: 'Bruh!', // TODO: Check error type
                }),
              )
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
