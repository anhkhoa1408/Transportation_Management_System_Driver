import React, { useState } from 'react';
import { Image, StyleSheet, View, Text, FlatList } from 'react-native';
import {
  Avatar,
  Card,
  ListItem,
  Icon,
  withBadge,
  SpeedDial,
} from 'react-native-elements';
import { Badge } from 'react-native-elements/dist/badge/Badge';
import { headerFont } from '../../styles/fontStyle';
import img from './../../assets/images/download.jpg';
import banner from './../../assets/images/banner.jpg';


export default function HomeScreen() {
  const BadgedIcon = withBadge(10)(Icon);
  const [open, setOpen] = useState(false);
  const listItem = [
    {
      name: 'Đơn hàng còn lại',
      iconName: 'assignment',
      count: 10000,
      color: '#7FC3DC',
    },
    {
      name: 'Đơn hàng đã nhận',
      iconName: 'assignment',
      count: 10000,
      color: '#6DC36C',
    },
    {
      name: 'Trạng thái xe',
      iconName: 'assignment',
      count: 10000,
      color: '#ccc',
    },
  ];

  const renderItem = ({ item }) => (
    <ListItem style={homeStyle.listItem}>
      <ListItem.Content
        style={{
          borderRadius: 20,
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-evenly',
        }}
      >
        <ListItem.Title style={homeStyle.titleFont}>{item.name}</ListItem.Title>
        <Icon
          name={item.iconName}
          color={item.color}
          size={40}
          style={{ marginVertical: 5 }}
        />

        <ListItem.Subtitle
          style={{ fontSize: 28, fontWeight: 'bold', color: '#000' }}
        >
          {item.count}
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );

  const keyExtractor = (item, index) => index.toString();

  return (
    <View style={homeStyle.container}>
      <View style={homeStyle.header}>
        <BadgedIcon type="ionicon" name="notifications" size={30} />
        <Text style={homeStyle.headerFont}>Welcome</Text>
        <Avatar rounded size="small" source={img} />
      </View>

      <View style={{ width: '100%', height: '40%', marginVertical: 20 }}>
          <Image style={homeStyle.banner} source={banner} />
      </View>

      <View style={homeStyle.listInfo}>
        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal
          data={listItem}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
        />
      </View>

      <SpeedDial
        isOpen={open}
        icon={{ name: 'add', color: '#fff' }}
        openIcon={{ name: 'close', color: '#fff' }}
        onOpen={() => setOpen(!open)}
        onClose={() => setOpen(!open)}
      >
        <SpeedDial.Action
          icon={{ name: 'add', color: '#fff', type: 'iconicon' }}
          title="Add"
          onPress={() => console.log('Add Something')}
        />
      </SpeedDial>

    </View>
  );
}

const homeStyle = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#FFF',
    height: '100%',
    width: '100%',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 20,
    marginHorizontal: 15,
  },
  image: {
    borderRadius: 20,
    width: 50,
    height: 50,
  },
  headerFont: {
    ...headerFont,
  },
  listInfo: {
    width: '100%',
    height: '30%',
  },
  listItem: {
    // display: 'flex',
    // flexDirection: 'row',
    // justifyContent: 'center',
    width: 180,
    height: 180,
    backgroundColor: '#FFF',
    borderColor: '#000',
    paddingVertical: 15,
    marginHorizontal: 12,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 5,
  },
  titleFont: {
    fontSize: 16,
    color: '#737373',
  },
  banner: {
    width: '100%', 
    height: '100%', 
    borderTopRightRadius: 25
  }
});
