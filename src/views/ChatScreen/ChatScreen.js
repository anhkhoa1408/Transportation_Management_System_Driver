import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Avatar, SearchBar, Text, ListItem } from 'react-native-elements';
import CustomSearch from '../../components/CustomSearch/CustomSearch';
import { container, header } from '../../styles/layoutStyle';
import { ScrollView } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import img from '../../assets/images/download.jpg';
import { socket } from '../../config/socketIO';
import { MAIN_URL } from '../../api/config';
import { getAvatarFromUri, getAvatarFromUser } from '../../utils/avatarUltis';

const ChatScreen = props => {
  const { userInfo, messenger, navigation, customerInfo } = props;

  const [historyChatList, setHistoryChatList] = React.useState([]);

  React.useEffect(() => {
    // console.log(JSON.stringify(messenger));
    const _historyChatList = Object.keys(messenger).map(room => {
      const lastMessage = messenger[room][0];
      return {
        room: room,
        avatar: customerInfo[room]?.avatar.url,
        name: customerInfo[room]?.name,
        lastMessage: lastMessage.text,
        time: formatDate(lastMessage.createdAt),
      };
    });
    setHistoryChatList([..._historyChatList, temp]);
  }, [messenger]);

  const temp = {
    room: '62189ecbf63eae0268063ab4',
    avatar: img,
    name: 'Uchiha sasuker',
    lastMessage: 'Bạn: hãy giao vào lúc 10h',
    time: '10:30:56',
  };

  const formatDate = dateString => {
    const today = new Date();
    const date = new Date(dateString);
    if (today.toDateString() === date.toDateString()) {
      return date.toLocaleTimeString('vi-VN', {
        hour: 'numeric',
        minute: 'numeric',
      });
    }
    return date.toLocaleDateString('vi-VN', {
      weekday: 'short',
      month: 'long',
      day: 'numeric',
    });
  };

  const onChoose = element => {
    socket.emit('join', {
      roomId: element.room,
    });
    navigation.navigate('MessageScreen', {
      room: element.room,
    });
  };

  return (
    <View style={chatScreenStyle.container}>
      <View style={chatScreenStyle.header}>
        <Text h4>Tin nhắn</Text>
        <Avatar
          rounded
          size="small"
          source={{
            uri: getAvatarFromUser(userInfo.user),
          }}
        />
      </View>

      <View style={{ width: '100%', paddingHorizontal: 20 }}>
        <CustomSearch />
      </View>

      <ScrollView vertical style={chatScreenStyle.chatList}>
        {historyChatList.map((element, index) => {
          return (
            <TouchableOpacity
              key={index}
              activeOpacity={0.5}
              onPress={() => onChoose(element)}>
              <ListItem
                underlayColor="#F0F1F5"
                containerStyle={chatScreenStyle.chatItem}>
                <Avatar
                  size="medium"
                  avatarStyle={{ borderRadius: 10 }}
                  source={{
                    uri: getAvatarFromUri(element.avatar),
                  }}
                />
                <ListItem.Content style={{ display: 'flex' }}>
                  <View>
                    <ListItem.Title>{element.name}</ListItem.Title>
                    <ListItem.Subtitle>{element.lastMessage}</ListItem.Subtitle>
                  </View>
                  <Text style={chatScreenStyle.time}>{element.time}</Text>
                </ListItem.Content>
              </ListItem>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const chatScreenStyle = StyleSheet.create({
  container: { ...container },
  header: { ...header },
  chatItem: {
    paddingVertical: 25,
    paddingHorizontal: 25,
    marginVertical: 20,
    backgroundColor: '#F0F1F5',
    borderRadius: 15,
  },
  chatList: {
    width: '100%',
    paddingHorizontal: 30,
    marginBottom: 20,
  },
  time: {
    alignSelf: 'flex-end',
    color: 'rgba(0,0,0,0.5)',
  },
});

const mapStateToProps = state => ({
  messenger: state.messenger,
  userInfo: state.userInfo,
  customerInfo: state.customerInfo,
});

export default connect(mapStateToProps)(ChatScreen);
