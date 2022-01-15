import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { Card } from 'react-native-elements';
import { shadowInput } from '../../styles/layoutStyle';

const CustomInput = props => {
  return (
    <Card
      wrapperStyle={{
        margin: 0,
        paddingHorizontal: 10,
        backgroundColor: '#FFF',
        borderRadius: 10,
      }}
      containerStyle={style.container}>
      <TextInput maxLength={400} numberOfLines={5} {...props} />
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
    height: 100,
  },
});

export default CustomInput;
