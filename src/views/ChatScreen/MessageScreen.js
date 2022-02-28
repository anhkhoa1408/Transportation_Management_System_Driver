import React, { useCallback, useEffect, useState } from 'react';
import { View, StyleSheet, Touchable } from 'react-native';
import { Avatar, Text } from 'react-native-elements';
import { GiftedChat } from 'react-native-gifted-chat';
import { header } from '../../styles/layoutStyle';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import img from './../../assets/images/download.jpg';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { socket } from '../../config/socketIO';
import { addMessage } from '../../actions/actions';
import { useDispatch } from 'react-redux';
import { connect } from 'react-redux';
import { LogBox } from 'react-native';

LogBox.ignoreLogs(['EventEmitter.removeListener']);

const MessageScreen = props => {
  const { navigation, route, messenger } = props;
  const { room, user } = route.params;

  const [messages, setMessages] = useState();

  useEffect(() => {
    setMessages(messenger[room]);
  }, []);

  const onSend = useCallback((newMessages = []) => {
    socket.emit('chat', newMessages[0], room);

    setMessages(previousMessages => {
      props.addMessage(newMessages[0], room);
      return GiftedChat.append(previousMessages, newMessages);
    });
  }, []);

  return (
    <View style={messagesScreenStyle.container}>
      <View style={header}>
        <TouchableOpacity>
          <MaterialIcon
            name="west"
            size={30}
            onPress={() => navigation.goBack()}
          />
        </TouchableOpacity>
        <Text h4>Uchiha papasuker</Text>
        <Avatar
          rounded
          size="small"
          source={img}
          onPress={() => navigation.navigate('CustomerInfo')}
        />
      </View>
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: user.id,
          name: user.name,
          avatar: user.avatar?.url,
        }}
        placeholder="Nhập"
        textInputStyle={messagesScreenStyle.input}
      />
    </View>
  );
};

const messagesScreenStyle = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#FFF',
  },
  input: {
    padding: 15,
    backgroundColor: '#FFF',
  },
});

const mapStateToProps = state => ({
  messenger: state.messenger,
});

const mapDispatchToProps = dispatch => ({
  addMessage: (message, room) => dispatch(addMessage(message, room)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MessageScreen);
