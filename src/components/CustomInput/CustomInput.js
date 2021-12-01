import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { Card } from 'react-native-elements';
import { shadowInput } from '../../styles/layoutStyle';

const CustomInput = (props) => {
  return (
    <Card containerStyle={style.container}>
      <TextInput {...props} />
    </Card>
  );
};

const style = StyleSheet.create({
  container: {
    width: '100%',
    borderWidth: 1,
    borderRadius: 10,
    marginHorizontal: 0,
    marginTop: 0,
    marginBottom: 10,
    ...shadowInput,
  },
});

export default CustomInput;
