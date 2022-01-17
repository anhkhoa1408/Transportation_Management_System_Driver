import React from 'react';
import { Avatar } from 'react-native-elements';
import { TouchableWithoutFeedback } from 'react-native';

function HeaderAvatar({ url, navigation }) {
  return (
    <TouchableWithoutFeedback>
      <Avatar
        rounded
        size="small"
        source={{
          uri: url,
        }}
      />
    </TouchableWithoutFeedback>
  );
}

export default HeaderAvatar;
