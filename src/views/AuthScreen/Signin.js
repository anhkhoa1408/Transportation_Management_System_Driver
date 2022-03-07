import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  SafeAreaView,
  Keyboard,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import { COLORS, STYLES, FONTS } from '../../styles';
import TextField from '../../components/TextField';
import authApi from '../../api/authApi';
import { useDispatch } from 'react-redux';
import * as Bonk from 'yup';
import { useFormik } from 'formik';
import { danger } from '../../styles/color';
import { saveInfo } from '../../actions/actions';
import Loading from './../../components/Loading';
import ModalMess from '../../components/ModalMess';
import banner from './../../assets/images/banner_signin.jpg';
import { Icon, Image, Text, SocialIcon } from 'react-native-elements';
import PrimaryButton from '../../components/CustomButton/PrimaryButton';
import { socket } from '../../config/socketIO';
import { syncToken } from '../../config/cloudMessage';

const SignIn = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(null);
  const [alert, setAlert] = useState(null);
  const [showPass, setShowPass] = useState(false);

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
    Keyboard.dismiss();
    setLoading(<Loading />);
    authApi
      .login({
        identifier: values.email,
        password: values.password,
      })
      .then(data => {
        dispatch(saveInfo(data));
        socket.connect();
        syncToken();
        setLoading(null);
      })
      .catch(err => {
        setAlert({
          type: 'warning',
          message: 'Tài khoản hoặc mật khẩu không đúng!',
        });
        setLoading(null);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView contentContainerStyle={styles.container}>
          {alert && (
            <ModalMess
              type={alert.type}
              message={alert.message}
              alert={alert}
              setAlert={setAlert}
            />
          )}
          {loading}
          <Image
            source={banner}
            resizeMode="contain"
            style={{
              height: 130,
              alignSelf: 'center',
              display: 'flex',
              marginBottom: 20,
            }}
          />
          <View style={{ alignItems: 'center' }}>
            <Text h2 style={{ marginBottom: 10 }}>
              Xin chào
            </Text>
            <Text style={styles.subTitle}>
              Đăng nhập để bắt đầu sử dụng dịch vụ của chúng tôi
            </Text>
          </View>

          <View style={{ ...styles.form }}>
            <TextField
              name="email"
              icon="person-outline"
              placeholder="Tên đăng nhập"
              value={formik.values.email}
              onChangeText={setEmail}
              onBlur={() => {
                formik.setFieldTouched('email');
              }}
            />
            {formik.touched.email && formik.errors.email ? (
              <Text
                style={{
                  color: danger,
                  fontWeight: 'bold',
                }}>
                {formik.errors.email}
              </Text>
            ) : null}
            <TextField
              name="password"
              icon="https"
              placeholder="Mật khẩu"
              value={formik.values.password}
              secureTextEntry={!showPass}
              onChangeText={setPassword}
              onBlur={() => formik.setFieldTouched('password')}
              afterComponent={
                <Icon
                  onPress={() => setShowPass(!showPass)}
                  name={!showPass ? 'visibility' : 'visibility-off'}
                  size={25}
                  color={COLORS.primary}
                />
              }
            />
            {formik.touched.password && formik.errors.password ? (
              <Text
                style={{
                  color: danger,
                  fontWeight: 'bold',
                }}>
                {formik.errors.password}
              </Text>
            ) : null}
            <TouchableOpacity
              onPress={() => navigation.navigate('forgotPassword')}>
              <Text style={styles.forgot}>Quên mật khẩu?</Text>
            </TouchableOpacity>
            <PrimaryButton title="Đăng nhập" onPress={formik.submitForm} />
          </View>
          <View
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={styles.subTitle}>Đăng nhập với</Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 25,
              }}>
              <Icon
                name="google"
                type="font-awesome"
                color="#4285F4"
                containerStyle={styles.icon}
              />
              <Icon
                name="facebook"
                type="font-awesome"
                color="#4267B2"
                containerStyle={styles.icon}
              />
              <Icon
                name="phone"
                type="font-awesome"
                color={COLORS.warning}
                containerStyle={styles.icon}
              />
            </View>
          </View>
          <View style={[styles.container1]}>
            <Text style={[FONTS.Medium]}>Chưa có tài khoản? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
              <Text style={{ ...FONTS.BigBold, color: COLORS.primary }}>
                Đăng ký
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignIn;

export const styles = StyleSheet.create({
  container: {
    ...STYLES.container,
    alignItems: 'stretch',
  },
  container1: {
    marginBottom: 30,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  forgot: {
    color: COLORS.primary,
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'flex-end',
  },
  form: {
    paddingHorizontal: 30,
    paddingTop: 15,
  },
  icon: {
    paddingVertical: 10,
    paddingHorizontal: 30,
    backgroundColor: '#FFF',
    elevation: 10,
    shadowColor: COLORS.primary,
    marginHorizontal: 8,
  },
  subTitle: {
    color: 'rgba(0,0,0,0.5)',
  },
});
