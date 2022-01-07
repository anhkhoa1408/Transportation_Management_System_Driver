import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
// import Loading from '../components/Loading/Loading';
import AuthStack from './StackNavigator/AuthStack';
import MainStack from './StackNavigator/MainStack';

export const Routes = (props) => {
  const [logged, setLogged] = useState();

  useEffect(
    () => {
        console.log('aaa')
      if (props.userInfo && props.userInfo.jwt) {
        setLogged(true);
      } else {
        setLogged(false);
      }
    },
    [props.userInfo],
  );

  return logged ? <MainStack /> : <AuthStack />;
};

const mapStateToProps = (state) => ({
  userInfo: state.userInfo,
});

export default connect(mapStateToProps, null)(Routes);
