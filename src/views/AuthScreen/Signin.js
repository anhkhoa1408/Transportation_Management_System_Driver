import React, { useEffect, useState } from 'react';
import {
  BackHandler,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  SafeAreaView,
  ImageBackground,
  Dimensions,
} from 'react-native';
import { COLORS } from '../../styles';
import TextField from '../../components/TextField';
import authApi from '../../api/authApi';
import { useDispatch } from 'react-redux';
import * as Bonk from 'yup';
import { useFormik } from 'formik';
import CustomInput from '../../components/CustomInput/CustomInput';
import { danger } from '../../styles/color';
import { saveInfo } from '../../actions/actions';
import background from './../../assets/images/background.png';
import bg from './../../assets/images/bg.png';
// import { BackHandler } from 'react-native';

const SignIn = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isFocus, setFocus] = useState('');

  const dispatch = useDispatch();
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: email,
      password: password,
    },
    validationSchema: Bonk.object({
      email: Bonk.string().required('Thông tin bắt buộc'),
      password: Bonk.string()
        .required('Thông tin bắt buộc')
        .min(8, 'Mật khẩu phải tối thiểu 8 ký tự'),
    }),
    onSubmit: values => {
      handleSubmit(values);
    },
  });

  const handleSubmit = values => {
    authApi
      .login({
        identifier: values.email,
        password: values.password,
      })
      .then(data => {
        dispatch(saveInfo(data));
      })
      .catch(err => alert('Username or password incorrect!'));
  };

  useEffect(() => {
    function handleBackButton() {
      // navigation.navigate('register-phone');
      // return true;
      console.log(1);
    }

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackButton,
    );

    return () => backHandler.remove();
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      {/* <Text>Delivery Management</Text> */}
      {/* <Image source={bg} style={styles.background} /> */}
      <ImageBackground style={styles.background} source={bg}>
        {!isFocus && (
          <Text
            style={{
              // color: COLORS.white,
              fontSize: 37,
              alignSelf: 'flex-start',
              marginLeft: 25,
              marginBottom: 20,
              fontWeight: 'bold',
            }}>
            Xin chào
          </Text>
        )}
        <View
          onFocus={() =>
            setFocus({
              width: '100%',
              height: '100%',
              paddingTop: 30,
              borderRadius: 0,
            })
          }
          style={{ ...styles.form, ...isFocus }}>
          <TextField
            icon="person-outline"
            placeholder="Tên đăng nhập"
            value={formik.values.email}
            onChangeText={setEmail}
          />

          {formik.touched.email && formik.errors.email ? (
            <Text
              style={{ color: danger, marginBottom: 15, fontWeight: 'bold' }}>
              {formik.errors.email}
            </Text>
          ) : null}

          <TextField
            icon="https"
            placeholder="Mật khẩu"
            value={formik.values.password}
            secureTextEntry
            onChangeText={setPassword}
          />

          {formik.touched.password && formik.errors.password ? (
            <Text
              style={{ color: danger, marginBottom: 15, fontWeight: 'bold' }}>
              {formik.errors.password}
            </Text>
          ) : null}

          <TouchableOpacity
            onPress={() => navigation.navigate('ForgotPassword')}>
            <Text style={styles.forgot}>Quên mật khẩu?</Text>
          </TouchableOpacity>

          <View style={styles.btnContainer}>
            <TouchableOpacity
              style={styles.loginBtn}
              onPress={formik.submitForm}>
              <Text
                style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>
                Đăng nhập
              </Text>
            </TouchableOpacity>
          </View>

          <View style={[styles.container1]}>
            <Text>Chưa có tài khoản? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
              <Text style={{ color: COLORS.primary }}>Đăng ký</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default SignIn;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    backgroundColor: COLORS.white,
    width: '100%',
    height: '100%',
  },
  btnContainer: {
    width: '100%',
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container1: {
    marginTop: 20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 35,
    height: 50,
  },
  forgot: {
    color: COLORS.primary,
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'flex-end',
  },
  background: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    paddingHorizontal: 30,
    paddingVertical: 25,
    width: '90%',
    backgroundColor: COLORS.white,
    borderRadius: 30,
  },
});
