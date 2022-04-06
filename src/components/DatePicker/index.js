import React, { useState } from 'react';
import { View, Platform, TextInput, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Button, Text } from 'react-native-elements';
import { TouchableOpacity } from 'react-native';
import moment from 'moment';

export const DatePicker = props => {
  const [date, setDate] = useState(
    (props.date && new Date(props.date)) || new Date(),
  );
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
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
    <View style={{ marginBottom: 20 }}>
      {props.title && <Text style={style.containerTitle}>{props.title}</Text>}
      <View style={style.container}>
        <Button
          onPress={showDatepicker}
          title={moment(date).format('DD-MM-YYYY')}
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
        {show && !props.disabled && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={onChange}
            themeVarian="light"
          />
        )}
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    width: '100%',
    padding: 10,
    marginTop: 15,
    backgroundColor: '#F3F3FA',
    borderRadius: 8,
  },
  button: {
    paddingVertical: 7,
    paddingHorizontal: 15,
    width: '100%',
    backgroundColor: '#F3F3FA',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    color: '#000',
    textAlign: 'left',
  },
  containerTitle: {
    fontSize: 20,
    color: '#000000',
  },
});
