// Import Component
import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, View, FlatList } from 'react-native';
import { Icon, withBadge, SpeedDial } from 'react-native-elements';
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

function HomeScreen({ navigation, ...props }) {
  const BadgedIcon = withBadge(10)(Icon);
  const [open, setOpen] = useState(false);
  const [absenceForm, setAbsence] = useState(false);
  const [listData, setListData] = useState([]);

  const [user, setUser] = useState({
    name: 'Shiba',
    avatar:
      'https://res.cloudinary.com/dfnoohdaw/image/upload/v1638692549/avatar_default_de42ce8b3d.png',
  });

  const { userInfo } = props;

  useEffect(() => {
    if (userInfo.user.avatar && userInfo.user.avatar.url)
      setUser({
        ...user,
        avatar: userInfo.user.avatar.url,
      });
    setUser({
      ...user,
      name: userInfo.user.name,
    });
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      homeAPI
        .getDriverStatus()
        .then(response => {
          setListData(response);
        })
        .catch(() => {
          // Do nothing
        });
    });
    return unsubscribe;
  }, [navigation]);

  const renderItem = ({ item }) => <InfoCard item={item} />;
  const keyExtractor = (item, index) => index.toString();

  return (
    <>
      {!listData.length && <Loading />}
      <View style={homeStyle.container}>
        <Header
          leftElement={
            <BadgedIcon name="notifications" color={COLORS.primary} size={30} />
          }
          headerText={'Xin chào ' + user.name}
          rightElement={
            <HeaderAvatar
              url={user.avatar}
              onPressAction={() => navigation.navigate('Account')}
            />
          }
        />

        {/* Banner Section */}
        <View
          style={{
            ...STYLES.container,
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

        <SpeedDial
          isOpen={open}
          icon={{ name: 'edit', color: '#fff' }}
          openIcon={{ name: 'close', color: '#fff' }}
          onOpen={() => setOpen(!open)}
          onClose={() => {
            setOpen(!open);
            setAbsence(false);
          }}
          overlayColor="rgba(0,0,0,0.15)"
          iconContainerStyle={{
            backgroundColor: COLORS.primary,
          }}>
          <SpeedDial.Action
            icon={{ name: 'home', color: '#fff', type: 'iconicon' }}
            iconContainerStyle={{
              backgroundColor: COLORS.primary,
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
});

export default connect(mapStateToProps)(HomeScreen);
