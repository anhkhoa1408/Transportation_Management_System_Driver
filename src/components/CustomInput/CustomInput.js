import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { Card } from 'react-native-elements';
import { shadowInput } from '../../styles/layoutStyle';

const CustomInput = props => {
  return (
    <Card
      wrapperStyle={{ padding: 20, backgroundColor: '#FFF', borderRadius: 10 }}
      containerStyle={style.container}>
      <TextInput {...props} />
    </Card>
  );
};

const style = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 10,
    margin: 0,
    padding: 0,
    ...shadowInput,
  },
});

export default CustomInput;
