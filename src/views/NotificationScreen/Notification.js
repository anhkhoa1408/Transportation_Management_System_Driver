import React from 'react';
import { View, Button } from 'react-native';
import {
  onGoogleButtonPress,
  getPhoneNumberVerificator,
  onPhoneLogin,
} from '../../config/OAuth';
import TextField from '../../components/TextField';

export default function Notification(props) {
  const onPress = () => {
    onGoogleButtonPress()
      .then(data => console.log(data))
      .catch(err => console.log(err));
  };

  const onSubmitCode = () => {
    onPhoneLogin(confirm, code);
  };

  const [confirm, setConfirm] = React.useState(null);
  const [code, setCode] = React.useState('');

  return (
    <View>
      <Button title="Display Notification" onPress={onPress} />
      <TextField
        name="code"
        icon="person-outline"
        placeholder="Code"
        value={code}
        onChangeText={setCode}
      />
      <Button title="Code" onPress={onSubmitCode} />
    </View>
  );
}
