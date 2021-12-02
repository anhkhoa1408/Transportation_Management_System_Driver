import React, { useState } from 'react';
import { Image, StyleSheet, View, FlatList } from 'react-native';
import {
  Avatar,
  Card,
  ListItem,
  Icon,
  Text,
  withBadge,
  SpeedDial,
} from 'react-native-elements';
import { Badge } from 'react-native-elements/dist/badge/Badge';
import { headerFont } from '../../styles/fontStyle';
import img from './../../assets/images/download.jpg';
import banner from './../../assets/images/delivery.jpg';
import AbsenceForm from './AbsenceForm';
import { STYLES, FONTS, COLORS } from '../../styles';
import { primaryColor } from '../../styles/color';

export default function HomeScreen() {
  const BadgedIcon = withBadge(10)(Icon);
  const [open, setOpen] = useState(false);
  const [absenceForm, setAbsence] = useState(false);
  const listItem = [
    {
      name: 'Đơn hàng đã nhận',
      iconName: 'event-available',
      count: 10,
      color: '#5ffa62',
    },
    {
      name: 'Đơn hàng còn lại',
      iconName: 'assignment',
      count: 15,
      color: '#f0b432',
    },
    {
      name: 'Trạng thái xe',
      iconName: 'local-shipping',
      count: 'Tốt',
      color: '#1cacff',
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
          reverse
          //   style={{ marginVertical: 10 }}
          containerStyle={{
            marginVertical: 15,
          }}
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
        <BadgedIcon name="notifications" color={primaryColor} size={30} />
        <Text h4 style={homeStyle.headerFont}>
          Welcome, shibe
        </Text>
        <Avatar rounded size="small" source={img} />
      </View>

      <View style={homeStyle.bannerContainer}>
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
        // containerStyle={{borderRadius: 10}}
        isOpen={open}
        icon={{ name: 'edit', color: '#fff' }}
        openIcon={{ name: 'close', color: '#fff' }}
        onOpen={() => setOpen(!open)}
        onClose={() => {
          setOpen(!open);
          setAbsence(false);
        }}
        iconContainerStyle={{
          backgroundColor: primaryColor,
        }}
      >
        <SpeedDial.Action
          icon={{ name: 'home', color: '#fff', type: 'iconicon' }}
          iconContainerStyle={{
            backgroundColor: primaryColor,

          }}
          title="Xin nghỉ phép"
          onPress={() => setAbsence(!absenceForm)}
        />
      </SpeedDial>

      {absenceForm ? <AbsenceForm setAbsence={setAbsence} /> : null}
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
    // ...header,
    ...STYLES.header,
  },
  image: {
    borderRadius: 20,
    width: 50,
    height: 50,
  },
  headerFont: {
    ...FONTS.headerFont,
  },
  listInfo: {
    width: '100%',
    height: '30%',
  },
  listItem: {
    width: 180,
    height: 170,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
    borderColor: '#000',
    paddingVertical: 15,
    marginHorizontal: 12,
    borderRadius: 20,
    ...STYLES.shadowCard,
    // elevation: 2,
  },
  titleFont: {
    fontSize: 16,
    color: '#737373',
  },
  bannerContainer: {
    width: '100%', 
    height: '45%', 
    marginVertical: 10,
    padding: 20
    // borderWidth: 1,
    // backgroundColor: primaryColor,
    // borderTopRightRadius: 25,
  },
  banner: {
    width: '100%',
    height: '100%',
  },
});
