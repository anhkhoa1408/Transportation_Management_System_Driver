import React, { useEffect, useState } from 'react';
import {
  BackHandler,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ImageBackground,
  Dimensions,
  ScrollView,
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
import bg from './../../assets/images/bg.png';
import { Input } from 'react-native-elements';

const SignUp = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeat] = useState('');
  const [isFocus, setFocus] = useState('');

  const dispatch = useDispatch();
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: email,
      password: password,
      repeatPassword: repeatPassword,
    },
    validationSchema: Bonk.object({
      email: Bonk.string().required('Thông tin bắt buộc'),
      password: Bonk.string()
        .required('Thông tin bắt buộc')
        .min(8, 'Mật khẩu phải tối thiểu 8 ký tự'),
      repeatPassword: Bonk.string()
        .required('Thông tin bắt buộc')
        .min(8, 'Mật khẩu phải tối thiểu 8 ký tự')
        .oneOf(
          [Bonk.ref('password'), null],
          'Xác nhận mật khẩu và mật khẩu chưa chính xác',
        ),
    }),
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: values => {
      handleSubmit(values);
    },
  });

  const handleSubmit = values => {
    // authApi
    //   .login({
    //     identifier: values.email,
    //     password: values.password,
    //   })
    //   .then(data => {
    //     dispatch(saveInfo(data));
    //   })
    //   .catch(err => alert('Username or password incorrect!'));
  };

  // useEffect(() => {
  //   function handleBackButton() {
  //     // navigation.navigate('register-phone');
  //     // return true;
  //     console.log(1);
  //   }

  //   const backHandler = BackHandler.addEventListener(
  //     'hardwareBackPress',
  //     handleBackButton,
  //   );

  //   return () => backHandler.remove();
  // }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground style={styles.background} source={bg}>
        {/* {!isFocus && ( */}
        <Text
          style={{
            // color: '',
            fontSize: 37,
            alignSelf: 'flex-start',
            marginLeft: 25,
            marginBottom: 20,
            fontWeight: 'bold',
          }}>
          Đăng ký
        </Text>
        {/* )} */}
        <View style={{ ...styles.form, ...isFocus }}>
          {/* <Text
            style={{
              color: '#000',
              fontSize: 40,
              alignSelf: 'flex-start',
              marginLeft: 25,
              marginBottom: 20,
            }}>
            Đăng ký
          </Text> */}
          <ScrollView
            contentContainerStyle={{
              paddingHorizontal: 5,
              paddingVertical: 25,
            }}
            onFocus={() =>
              setFocus({
                height: '75%',
              })
            }>
            <TextField
              icon="person-outline"
              placeholder="Tên đăng nhập"
              value={formik.values.email}
              onChangeText={setEmail}
            />

            {formik.touched.email && formik.errors.email ? (
              <Text
                style={{ color: danger, marginBottom: 5, fontWeight: 'bold' }}>
                {formik.errors.email}
              </Text>
            ) : null}

            <TextField
              icon="lock"
              placeholder="Mật khẩu"
              value={formik.values.password}
              secureTextEntry
              onChangeText={setPassword}
            />

            {formik.touched.email && formik.errors.email ? (
              <Text
                style={{ color: danger, marginBottom: 5, fontWeight: 'bold' }}>
                {formik.errors.email}
              </Text>
            ) : null}

            <TextField
              icon="lock"
              placeholder="Xác nhận mật khẩu"
              value={formik.values.repeatPassword}
              secureTextEntry
              onChangeText={setRepeat}
            />

            {formik.touched.repeatPassword && formik.errors.repeatPassword ? (
              <Text
                style={{ color: danger, marginBottom: 5, fontWeight: 'bold' }}>
                {formik.errors.repeatPassword}
              </Text>
            ) : null}

            <View style={styles.btnContainer}>
              <TouchableOpacity
                style={styles.loginBtn}
                onPress={() => {
                  setFocus('');
                  formik.submitForm;
                }}>
                <Text
                  style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>
                  Xác nhận
                </Text>
              </TouchableOpacity>
            </View>

            <View style={[styles.container1]}>
              <Text>Đã có tài khoản? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Signin')}>
                <Text style={{ color: COLORS.primary }}>Đăng nhập</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default SignUp;

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
    marginTop: 10,
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
    paddingVertical: 20,
    width: '90%',
    // marginBottom: 10

    backgroundColor: COLORS.white,
    borderRadius: 30,
  },
});
