import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Card, Text, Input, Button } from 'react-native-elements';
import { shadowCard } from '../../styles/layoutStyle';

const AbsenceForm = () => {
  return (
    <View style={formStyle.container}>
      <Card>
        <View>
          <Card.Title>Nghỉ phép</Card.Title>
          <Input
            placeholder=""
            containerStyle={formStyle.input}
            // leftIcon={{ type: 'font-awesome', name: 'chevron-left' }}
          />
          <Card.Title>Nghỉ phép</Card.Title>
          <Input
            placeholder=""
            containerStyle={formStyle.input}
            numberOfLines={4}
            // leftIcon={{ type: 'font-awesome', name: 'chevron-left' }}
          />
        </View>
        <Button
          title="Gửi"
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
        translateX: -Dimensions.get('window').width * 0.4,
      },
      {
        translateY: -Dimensions.get('window').width * 0.25,
      },
    ],
    width: '80%',
    height: '40%',
    ...shadowCard
  },
  input: {
    // ...shadowCard
    // borderWidth: 1,
    // borderRadius: 20,
    // opacity: 0.2,
    // padding: 0
  }
});

export default AbsenceForm;
