import React, { useState } from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
} from 'react-native';
import { Avatar, Icon, ListItem, Switch } from 'react-native-elements';
import { container, shadowCard } from '../../styles/layoutStyle';
import img from '../../assets/images/download.jpg';
import { COLORS, FONTS } from '../../styles';
import { useDispatch } from 'react-redux';
import { success, warning, danger, backdropColor } from '../../styles/color';
import { connect } from 'react-redux';
import { socket } from '../../config/socketIO';
import { getAvatarFromUser } from '../../utils/avatarUltis';
import { removeToken } from '../../config/cloudMessage';

const Account = ({ navigation, userInfo }) => {
  const dispatch = useDispatch();
  const [toggle, setToggle] = useState({
    language: true,
    nightMode: false,
    notification: false,
  });

  const toggleSwitch = (e, item) => {
    setToggle({ ...toggle, [item.name]: e });
  };

  const accountList = [
    {
      title: 'Chỉnh sửa thông tin',
      icon: 'edit',
      navigate: 'EditProfile',
      color: COLORS.primary,
      neutral: COLORS.neutralPrimary,
    },
    {
      title: 'Đổi mật khẩu',
      icon: 'lock',
      navigate: 'ChangePass',
      color: COLORS.warning,
      neutral: COLORS.neutralWarning,
    },
    {
      title: 'Đăng xuất',
      icon: 'logout',
      color: COLORS.danger,
      neutral: COLORS.neutralDanger,
    },
  ];

  const appList = [
    {
      title: 'English',
      icon: 'language',
      name: 'language',
      state: toggle.language,
      color: COLORS.purple,
      neutral: COLORS.neutralPurple,
    },
    // {
    //   title: 'Chế độ tối',
    //   icon: 'nightlight-round',
    //   name: 'nightMode',
    //   state: toggle.nightMode,
    //   color: '#000',
    // },
    // {
    //   title: 'Thông báo',
    //   icon: 'notifications',
    //   name: 'notification',
    //   state: toggle.notification,
    //   color: COLORS.primary,
    // },
  ];

  const keyExtractor = (item, index) => index.toString();

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          if (item.navigate) {
            navigation.navigate(item.navigate);
          } else {
            socket.close();
            removeToken();
            dispatch({ type: 'CLEAN_STORE' });
          }
        }}
        style={{ width: '100%' }}>
        <ListItem
          containerStyle={{
            width: '100%',
            display: 'flex',
            paddingVertical: 15,
          }}
          bottomDivider>
          <View
            style={{
              backgroundColor: item.neutral,
              padding: 10,
              borderRadius: 12,
            }}>
            <Icon name={item.icon} color={item.color} size={22} />
          </View>
          <ListItem.Title
            style={[
              FONTS.Medium,
              {
                flex: 1,
                marginLeft: 10,
              },
            ]}>
            {item.title}
          </ListItem.Title>

          <View
            style={{
              padding: 10,
              backgroundColor: COLORS.gray,
              borderRadius: 12,
            }}>
            <ListItem.Chevron size={22} />
          </View>
        </ListItem>
      </TouchableOpacity>
    );
  };

  const renderAppItem = ({ item }) => {
    return (
      <View style={{ width: '100%' }}>
        <ListItem
          containerStyle={{
            width: '100%',
            display: 'flex',
            paddingVertical: 15,
          }}
          bottomDivider>
          <View
            style={{
              backgroundColor: item.neutral,
              padding: 10,
              borderRadius: 12,
            }}>
            <Icon name={item.icon} color={item.color} size={22} />
          </View>
          <ListItem.Title
            style={[
              FONTS.Medium,
              {
                flex: 1,
                marginLeft: 10,
              },
            ]}>
            {item.title}
          </ListItem.Title>

          <View
            style={
              item.state
                ? [styles.switchContainer, styles.switchOn]
                : [styles.switchContainer, styles.switchOff]
            }>
            <Switch
              onValueChange={e => toggleSwitch(e, item)}
              thumbColor="#FFF"
              trackColor={{ false: COLORS.gray, true: success }}
              value={item.state}
            />
          </View>
        </ListItem>
      </View>
    );
  };

  const footerComponent = (
    <>
      <Text style={styles.sectionText}>Tài khoản</Text>
      <FlatList
        listKey="A"
        nestedScrollEnabled
        style={{
          width: '100%',
          paddingHorizontal: 20,
          flexGrow: 0,
          marginBottom: 20,
        }}
        keyExtractor={keyExtractor}
        data={accountList}
        renderItem={renderItem}
      />
      <Text style={styles.sectionText}>Ứng dụng</Text>
      <FlatList
        listKey="B"
        nestedScrollEnabled
        style={{
          width: '100%',
          paddingHorizontal: 20,
          flexGrow: 0,
          marginBottom: 20,
        }}
        keyExtractor={keyExtractor}
        data={appList}
        renderItem={renderAppItem}
      />
    </>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View nestedScrollEnabled style={styles.header}>
        <Avatar
          avatarStyle={{
            borderRadius: 30,
          }}
          containerStyle={{
            width: 55,
            height: 55,
          }}
          source={{
            uri: getAvatarFromUser(userInfo.user),
          }}
        />
        <View style={{ marginLeft: 20, flex: 1 }}>
          <Text style={styles.smallText}>Nhân viên</Text>
          <Text style={styles.bigText}>{userInfo?.user?.name}</Text>
          {/* <Text style={styles.statusText}>Đang làm việc</Text> */}
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('EditProfile')}>
          <Icon name="edit" size={28} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
      <FlatList
        style={styles.scrollContainer}
        data={[]}
        renderItem={() => null}
        ListEmptyComponent={footerComponent}
      />
    </SafeAreaView>
  );
};

const mapStateToProps = state => {
  return {
    userInfo: state.userInfo,
  };
};

export default connect(mapStateToProps, null)(Account);

const styles = StyleSheet.create({
  container: {
    ...container,
  },
  scrollContainer: {
    width: '100%',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingVertical: 20,
    marginVertical: 20,
    marginHorizontal: 15,
    elevation: 15,
    shadowColor: COLORS.primary,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    marginBottom: 20
  },
  bigText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#000',
  },
  smallText: {
    fontSize: 13,
    color: 'rgba(0, 0, 0, 0.5)',
  },
  editBtn: {
    marginVertical: 20,
    marginRight: 20,
    fontSize: 20,
    color: COLORS.primary,
  },
  statusText: {
    color: success,
    fontWeight: 'bold',
    fontSize: 15,
  },
  sectionText: {
    alignSelf: 'flex-start',
    marginLeft: 30,
  },
  switchContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
  },
  switchOn: {
    backgroundColor: success,
  },
  switchOff: {
    backgroundColor: COLORS.gray,
  },
});
