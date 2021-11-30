import React, { useState } from "react";
import { Image, StyleSheet, View, FlatList } from "react-native";
import {
  Avatar,
  Card,
  ListItem,
  Icon,
  Text,
  withBadge,
  SpeedDial,
} from "react-native-elements";
import { Badge } from "react-native-elements/dist/badge/Badge";
import { headerFont } from "../../styles/fontStyle";
import img from "./../../assets/images/download.jpg";
import banner from "./../../assets/images/banner.jpg";
import AbsenceForm from "./AbsenceForm";
import { STYLES, FONTS, COLORS } from "../../styles";

export default function HomeScreen() {
  const BadgedIcon = withBadge(10)(Icon);
  const [open, setOpen] = useState(false);
  const [absenceForm, setAbsence] = useState(false);
  const listItem = [
    {
      name: "Đơn hàng còn lại",
      iconName: "assignment",
      count: 10,
      color: "#7FC3DC",
    },
    {
      name: "Đơn hàng đã nhận",
      iconName: "assignment",
      count: 15,
      color: "#6DC36C",
    },
    {
      name: "Trạng thái xe",
      iconName: "assignment",
      count: "Tốt",
      color: "#ccc",
    },
  ];

  const renderItem = ({ item }) => (
    <ListItem style={homeStyle.listItem}>
      <ListItem.Content
        style={{
          borderRadius: 20,
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-evenly",
        }}
      >
        <ListItem.Title style={homeStyle.titleFont}>{item.name}</ListItem.Title>
        <Icon
          name={item.iconName}
          color={item.color}
          size={40}
          style={{ marginVertical: 10 }}
        />

        <ListItem.Subtitle
          style={{ fontSize: 28, fontWeight: "bold", color: "#000" }}
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
        <Text h4 style={homeStyle.headerFont}>
          Welcome, shibe
        </Text>
        <Avatar rounded size="small" source={img} />
      </View>

      <View style={{ width: "100%", height: "40%", marginVertical: 20 }}>
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
        containerStyle={{borderRadius: 10}}
        isOpen={open}
        icon={{ name: 'edit', color: '#fff' }}
        openIcon={{ name: 'close', color: '#fff' }}
        onOpen={() => setOpen(!open)}
        onClose={() => {
            setOpen(!open)
            setAbsence(false)
        }}
        iconContainerStyle={{
          backgroundColor: "#80CDBF",
        }}
      >
        <SpeedDial.Action
          icon={{ name: "home", color: "#fff", type: "iconicon" }}
          iconContainerStyle={{
            backgroundColor: "#80CDBF",
          }}
          title="Xin nghỉ phép"
          onPress={() => setAbsence(true)}
        />
      </SpeedDial>

      {absenceForm ? <AbsenceForm></AbsenceForm> : null}
    </View>
  );
}

const homeStyle = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#FFF",
    height: "100%",
    width: "100%",
  },
  header: {
    ...header,
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
    width: "100%",
    height: "30%",
  },
  listItem: {
    width: 180,
    height: 170,
    backgroundColor: '#FFF',
    borderColor: '#000',
    paddingVertical: 15,
    marginHorizontal: 12,
    borderRadius: 20,
    // ...shadowCard,
  },
  titleFont: {
    fontSize: 16,
    color: "#737373",
  },
  banner: {
    width: "100%",
    height: "100%",
    borderTopRightRadius: 25,
  },
});
