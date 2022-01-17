import React, { useState, useEffect } from 'react';
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
import banner from './../../assets/images/delivery.jpg';
import AbsenceForm from './AbsenceForm';
import { STYLES, FONTS, COLORS } from '../../styles';
import { primaryColor } from '../../styles/color';
import { connect } from 'react-redux';
import Loading from '../../components/Loading';
import { backdropColor } from '../../styles/color';
import Header from '../../components/Header';
import HeaderAvatar from '../../components/HeaderAvatar';
import { TouchableHighlight } from 'react-native-gesture-handler';

function HomeScreen({ navigation, ...props }) {
  const BadgedIcon = withBadge(10)(Icon);
  const [open, setOpen] = useState(false);
  const [absenceForm, setAbsence] = useState(false);
  let listItem = [
    {
      name: 'Đơn hàng đã nhận',
      iconName: 'event-available',
      count: 0,
      color: '#5ffa62',
    },
    {
      name: 'Đơn hàng còn lại',
      iconName: 'assignment',
      count: 0,
      color: '#f0b432',
    },
    {
      name: 'Trạng thái xe',
      iconName: 'local-shipping',
      count: '',
      color: '#1cacff',
    },
  ];
  const [listData, setListData] = useState(listItem);

  const [data, setData] = useState({
    name: 'Shiba',
    avatar:
      'https://res.cloudinary.com/dfnoohdaw/image/upload/v1638692549/avatar_default_de42ce8b3d.png',
  });

  const [dataChange, setDataChange] = useState(false);
  const [order, setOrder] = useState({ receive: 0, remain: 0 });
  const [user, setUser] = useState({});
  const { userInfo } = props;

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setUser(userInfo);
      if ('avatar' in userInfo.user)
        if ('url' in userInfo.user.avatar)
          setData({
            ...data,
            avatar: userInfo.user.avatar.url,
          });
      setData({
        ...data,
        name: userInfo.user.name,
      });
    });
    return unsubscribe;
  }, [navigation]);

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
        }}>
        <ListItem.Title style={homeStyle.titleFont}>{item.name}</ListItem.Title>
        <Icon
          name={item.iconName}
          color={item.color}
          reverse
          containerStyle={{
            marginVertical: 15,
          }}
        />

        <ListItem.Subtitle
          style={{ fontSize: 28, fontWeight: 'bold', color: '#000' }}>
          {item.count}
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );

  const keyExtractor = (item, index) => index.toString();
  return (
    <>
      {!listData[2].count && <Loading />}
      <View style={homeStyle.container}>
        <Header
          leftElement={
            <BadgedIcon name="notifications" color={primaryColor} size={30} />
          }
          headerText={'Hello ' + data.name}
          rightElement={
            <HeaderAvatar
              url={data.avatar}
              onPressAction={() => navigation.navigate('Account')}
            />
          }
        />

        <View style={homeStyle.bannerContainer}>
          <Image style={homeStyle.banner} source={banner} />
        </View>
        {dataChange && (
          <View style={homeStyle.listInfo}>
            <FlatList
              showsHorizontalScrollIndicator={false}
              horizontal
              data={listData}
              renderItem={renderItem}
              keyExtractor={keyExtractor}
            />
          </View>
        )}
        <SpeedDial
          isOpen={open}
          icon={{ name: 'edit', color: '#fff' }}
          openIcon={{ name: 'close', color: '#fff' }}
          onOpen={() => setOpen(!open)}
          onClose={() => {
            setOpen(!open);
            setAbsence(false);
          }}
          overlayColor="rgba(180,179,219, 0.8)"
          //   activeOpacity={0.8}
          iconContainerStyle={{
            backgroundColor: primaryColor,
          }}>
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
    </>
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
    padding: 20,
    // borderWidth: 1,
    // backgroundColor: primaryColor,
    // borderTopRightRadius: 25,
  },
  banner: {
    width: '100%',
    height: '100%',
  },
});

const mapStateToProps = state => ({
  userInfo: state.userInfo,
});

export default connect(mapStateToProps)(HomeScreen);
