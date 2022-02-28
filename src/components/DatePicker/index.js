import React, { useState } from 'react';
import { View, Platform, TextInput, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Input, Button, Card } from 'react-native-elements';
import { shadowCard, shadowInput } from '../../styles/layoutStyle';
import { TouchableOpacity } from 'react-native';

export const DatePicker = ({ onDateChange }) => {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    onDateChange && onDateChange(currentDate);
  };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  return (
    <Card
      wrapperStyle={{ padding: 10, backgroundColor: '#FFF', borderRadius: 10 }}
      containerStyle={style.container}>
      <Button
        onPress={showDatepicker}
        title={date.toDateString()}
        buttonStyle={style.button}
        titleStyle={style.title}
        iconPosition="right"
        icon={{
          name: 'event',
          size: 20,
          color: '#000',
        }}
        iconContainerStyle={{
          alignSelf: 'flex-end',
        }}
        TouchableComponent={TouchableOpacity}
      />
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          dateFormat="shortdate"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
          themeVarian="light"
        />
      )}
    </Card>
  );
};

const style = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 10,
    padding: 0,
    margin: 0,
    ...shadowInput,
  },
  button: {
    padding: 0,
    width: '100%',
    backgroundColor: '#FFF',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 5,
  },
  title: {
    color: '#000',
    textAlign: 'left',
  },
});
