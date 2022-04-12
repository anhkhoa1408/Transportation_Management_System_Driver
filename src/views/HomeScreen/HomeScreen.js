// Import Component
import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, View, FlatList } from 'react-native';
import { Icon, withBadge, Overlay } from 'react-native-elements';
import AbsenceForm from './AbsenceForm';
import Loading from '../../components/Loading';
import Header from '../../components/Header';
import HeaderAvatar from '../../components/HeaderAvatar';
import InfoCard from './InfoCard';
// Import Function
import { connect } from 'react-redux';
import homeAPI from '../../api/homeAPI';
// Import Asset
import { STYLES, COLORS } from '../../styles';
import banner from './../../assets/images/delivery.jpg';
import { container } from '../../styles/layoutStyle';
import { backdropColor } from '../../styles/color';
import { getAvatarFromUser, getNameFromUser } from '../../utils/avatarUltis';
import ModalMess from '../../components/ModalMess';
import SpeedDial from './SpeedDial';

function HomeScreen({ navigation, ...props }) {
  const [badge, setBadge] = useState(null);
  const [open, setOpen] = useState(false);
  const [absenceForm, setAbsence] = useState(false);
  const [listData, setListData] = useState([]);

  const [modal, setModal] = useState(null);

  const { userInfo, noties } = props;

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      homeAPI
        .getDriverStatus()
        .then(response => {
          setListData(response);
        })
        .catch(err => {
          // Do nothing
          console.log(err);
        });
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    setBadge(Badge(Object.keys(noties).length));
  }, [noties]);

  const Badge = totalNoties => {
    const BadgedIcon = withBadge(totalNoties)(Icon);
    return (
      <BadgedIcon
        name="notifications"
        color={COLORS.primary}
        size={30}
        onPress={() => navigation.navigate('Notification')}
      />
    );
  };

  const renderItem = ({ item }) => <InfoCard item={item} />;
  const keyExtractor = (item, index) => index.toString();

  return (
    <>
      {!listData.length && <Loading />}
      <View style={homeStyle.container}>
        <Header
          leftElement={badge}
          headerText={'Xin chào ' + getNameFromUser(userInfo?.user)}
          rightElement={
            <HeaderAvatar
              url={getAvatarFromUser(userInfo.user)}
              onPressAction={() => navigation.navigate('EditProfile')}
            />
          }
        />

        {/* Banner Section */}
        <View
          style={{
            ...STYLES.container,
            flex: 0,
            height: '40%',
            paddingHorizontal: 10,
          }}>
          <Image style={homeStyle.banner} source={banner} />
        </View>

        {/* Info Cards Section */}
        {listData.length > 0 && (
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

        {/* Absence form */}
        <SpeedDial
          open={open}
          setOpen={setOpen}
          setAbsence={setAbsence}
          absenceForm={absenceForm}
        />

        {modal && (
          <ModalMess
            type={modal.type}
            message={modal.message}
            alert={modal}
            setAlert={setModal}
          />
        )}

        <Overlay
          backdropStyle={{
            width: '100%',
            height: '100%',
            backgroundColor: backdropColor,
            opacity: 0.6,
          }}
          overlayStyle={{
            width: '90%',
            height: '55%',
            borderRadius: 12,
            paddingVertical: 30,
            paddingHorizontal: 15,
          }}
          visible={absenceForm}>
          <AbsenceForm
            onOpen={setOpen}
            setAbsence={setAbsence}
            setModal={setModal}
          />
        </Overlay>
      </View>
    </>
  );
}

const homeStyle = StyleSheet.create({
  container: {
    ...container,
  },
  listInfo: {
    width: '100%',
    height: '30%',
  },
  banner: {
    width: '100%',
    height: '100%',
  },
});

const mapStateToProps = state => ({
  userInfo: state.userInfo,
  noties: state.notification,
});

export default connect(mapStateToProps)(HomeScreen);
