import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Loading from '../components/Loading';
import AuthStack from './StackNavigator/AuthStack';
import TabNavigatior from './TabNavigator/TabNavigatior';
import Geolocation from '@react-native-community/geolocation';
import authApi from '../api/authApi';

export const Routes = props => {
  const [logged, setLogged] = useState();
  const [loading, setLoading] = useState(props.userInfo.isLoading);

  useEffect(() => {
    // Get permission
    Geolocation.getCurrentPosition(
      info => {},
      err => {},
      { timeout: 1000, maximumAge: 1000, enableHighAccuracy: true },
    );
    // Watcher
    Geolocation.watchPosition(onPositionChange, err => console.log(err), {
      timeout: 5000,
      maximumAge: 5000,
      enableHighAccuracy: true,
      useSignificantChanges: true,
    });
  }, []);

  function onPositionChange(position) {
    if (props.userInfo && props.userInfo.jwt)
      authApi
        .update(props.userInfo.user.id, position.coords)
        .then(() => {})
        .catch(err => console.log(err));
  }

  useEffect(() => {
    if (props.userInfo && props.userInfo.jwt) {
      setLogged(true);
    } else {
      setLogged(false);
    }
    setLoading(false);
  }, [props.userInfo]);

  if (loading) {
    return <Loading />;
  }

  return logged ? <TabNavigatior /> : <AuthStack />;
};

const mapStateToProps = state => ({
  userInfo: state.userInfo,
});

export default connect(mapStateToProps, null)(Routes);
