import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Card } from 'react-native-elements';
import PillButton from '../../components/CustomButton/PillButton';
import CustomInput from '../../components/CustomInput/CustomInput';
import { DatePicker } from '../../components/DatePicker/DatePicker';
import { shadowCard } from '../../styles/layoutStyle';

const AbsenceForm = () => {
  return (
    <View style={formStyle.container}>
      <Card containerStyle={formStyle.form}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
          }}
        >
          <Card.Title>Thời gian</Card.Title>
          <DatePicker />

          <Card.Title>Lý do</Card.Title>
          <CustomInput multiline={true} numberOfLines={5} maxLength={150} />
        </View>
        <PillButton
          title="Gửi"
          containerStyle={formStyle.button}
          type="solid"
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
        translateX: -Dimensions.get('window').width * 0.45,
      },
      {
        translateY: -Dimensions.get('window').width * 0.45,
      },
    ],
    width: '90%',
    height: '40%',
    ...shadowCard,
  },
  input: {
    borderWidth: 1,
    borderRadius: 20,
    padding: 0,
  },
  form: {
    paddingHorizontal: 35,
    paddingVertical: 35,
    borderRadius: 5,
  },
  button: {
    marginTop: 20,
  },
});

export default AbsenceForm;
