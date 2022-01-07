import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  SafeAreaView,
} from 'react-native';
import { COLORS } from '../../styles';
import TextField from '../../components/TextField';
import authApi from '../../api/authApi';
import { SAVE_USER_INFO } from '../../constants/types';
import { useDispatch } from 'react-redux';
import * as Bonk from 'yup';
import { useFormik } from 'formik';
import CustomInput from '../../components/CustomInput/CustomInput';
import { danger } from '../../styles/color';

const SignIn = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const handleSubmit = (values) => {
    authApi
      .login({
        identifier: values.email,
        password: values.password,
      })
      .then((data) => {
        dispatch({ type: SAVE_USER_INFO, action: data });
        // navigation.navigate('HomeTabs');
      })
      .catch((err) => alert('Username or password incorrect!'));
  };

  return (
    <SafeAreaView style={styles.screen}>
      <TextField
        title="Tên đăng nhập"
        value={formik.values.email}
        onChangeText={setEmail}
      />

      {formik.touched.email && formik.errors.email ? (
        <Text style={{color: danger}}>{formik.errors.email}</Text>
      ) : null}

      <TextField
        title="Mật khẩu"
        value={formik.values.password}
        secureTextEntry
        onChangeText={setPassword}
      />

      {formik.touched.password && formik.errors.password ? (
        <Text style={{color: danger}}>{formik.errors.password}</Text>
      ) : null}

      <View style={styles.container1}>
        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
          <Text style={styles.forgot}>Forgot password?</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.forgot}>Create an account</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        <TouchableOpacity style={styles.loginBtn} onPress={formik.submitForm}>
          <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>
            Sign In
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SignIn;

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    flexDirection: 'column',
    padding: 30,
    alignItems: 'stretch',
    backgroundColor: COLORS.background1,
  },
  container: {
    marginTop: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container1: {
    marginTop: 30,
  },
  loginBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    backgroundColor: '#3B3DBF',
    borderRadius: 15,
    height: 50,
  },
  forgot: {
    color: '#3B3DBF',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
