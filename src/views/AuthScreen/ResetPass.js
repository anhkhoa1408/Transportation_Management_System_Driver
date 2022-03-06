import React, { useEffect, useState } from 'react';
import { StyleSheet, View, TouchableOpacity, SafeAreaView } from 'react-native';
import { Text } from 'react-native-elements';
import { COLORS, STYLES, FONTS } from '../../styles';
import TextField from '../../components/TextField';
import authApi from '../../api/authApi';
import { useDispatch } from 'react-redux';
import * as Bonk from 'yup';
import { useFormik } from 'formik';
import { danger, success } from '../../styles/color';
import Loading from './../../components/Loading';
import PrimaryButton from '../../components/CustomButton/PrimaryButton';

const ResetPass = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isFocus, setFocus] = useState('');
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: email,
      password: password,
    },
    // validationSchema: Bonk.object({
    //   email: Bonk.string().required('Thông tin bắt buộc'),
    //   password: Bonk.string()
    //     .required('Thông tin bắt buộc')
    //     .min(8, 'Mật khẩu phải tối thiểu 8 ký tự'),
    // }),
    onSubmit: values => {
      handleSubmit(values);
    },
  });

  const handleSubmit = values => {
    navigation.navigate('Signin');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ paddingHorizontal: 20, marginTop: '40%', flex: 1 }}>
        <Text style={styles.title}>Đổi mật khẩu</Text>
        <Text
          style={{
            marginBottom: 5,
            color: 'rgba(0,0,0,0.5)',
          }}>
          Nhập mật khẩu mới cho tài khoản của bạn
        </Text>
        <TextField
          icon="https"
          placeholder="Mật khẩu mới"
          value={formik.values.email}
          onChangeText={setEmail}
        />

        {formik.touched.email && formik.errors.email ? (
          <Text
            style={{
              color: danger,
              marginBottom: 15,
              fontWeight: 'bold',
            }}>
            {formik.errors.email}
          </Text>
        ) : null}

        <TextField
          icon="https"
          placeholder="Xác nhận mật khẩu"
          value={formik.values.password}
          secureTextEntry
          onChangeText={setPassword}
        />

        {formik.touched.password && formik.errors.password ? (
          <Text
            style={{
              color: danger,
              marginBottom: 15,
              fontWeight: 'bold',
            }}>
            {formik.errors.password}
          </Text>
        ) : null}

        <PrimaryButton title="Xác nhận" />
      </View>
      <View style={[styles.container1]}>
        <Text style={[FONTS.Medium]}>Đổi mật khẩu thành công? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Signin')}>
          <Text style={{ ...FONTS.BigBold, color: COLORS.primary }}>
            Đăng nhập
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    ...STYLES.container,
    alignItems: 'stretch',
    padding: 20,
  },
  container1: {
    marginTop: 20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    alignSelf: 'flex-start',
    fontWeight: 'bold',
    borderBottomColor: COLORS.primary,
    borderBottomWidth: 5,
    paddingBottom: 10,
    marginBottom: 10,
  },
});

export default ResetPass;
