import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Avatar, SearchBar, Text, ListItem } from 'react-native-elements';
import CustomSearch from '../../components/CustomSearch/CustomSearch';
import { container, header } from '../../styles/layoutStyle';
import banner from '../../assets/images/banner.jpg';
import img from '../../assets/images/download.jpg';
import { ScrollView } from 'react-native-gesture-handler';

const ChatScreen = ({ navigation }) => {
  const historyChatList = [
    {
      avatar: img,
      name: 'Uchiha sasuker',
      lastMessage: 'Bạn: hãy giao vào lúc 10h',
      time: '10:30 PM',
    },
    {
      avatar: img,
      name: 'Uchiha sasuker',
      lastMessage: 'Bạn: hãy giao vào lúc 10h',
      time: '10:30 PM',
    },
    {
      avatar: img,
      name: 'Uchiha sasuker',
      lastMessage: 'Bạn: hãy giao vào lúc 10h',
      time: '10:30 PM',
    },
    {
      avatar: img,
      name: 'Uchiha sasuker',
      lastMessage: 'Bạn: hãy giao vào lúc 10h',
      time: '10:30 PM',
    },
    {
      avatar: img,
      name: 'Uchiha sasuker',
      lastMessage: 'Bạn: hãy giao vào lúc 10h',
      time: '10:30 PM',
    },
    {
      avatar: img,
      name: 'Uchiha sasuker',
      lastMessage: 'Bạn: hãy giao vào lúc 10h',
      time: '10:30 PM',
    },
    {
      avatar: img,
      name: 'Uchiha sasuker',
      lastMessage: 'Bạn: hãy giao vào lúc 10h',
      time: '10:30 PM',
    },
    {
      avatar: img,
      name: 'Uchiha sasuker',
      lastMessage: 'Bạn: hãy giao vào lúc 10h',
      time: '10:30 PM',
    },
  ];

  return (
    <View style={chatScreenStyle.container}>
      <View style={chatScreenStyle.header}>
        <Text h4>Tin nhắn</Text>
        <Avatar rounded size="small" source={banner} />
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
              onPress={() => navigation.navigate('SendMessage')}
            >
              <ListItem
                underlayColor="#F0F1F5"
                containerStyle={chatScreenStyle.chatItem}
              >
                <Avatar
                  size="medium"
                  avatarStyle={{ borderRadius: 10 }}
                  source={element.avatar}
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
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 1,
    // },
    // shadowOpacity: 0.22,
    // shadowRadius: 2.22,
    // elevation: 3,
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

export default ChatScreen;
