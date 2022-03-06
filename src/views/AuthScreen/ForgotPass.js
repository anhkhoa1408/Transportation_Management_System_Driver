import React, { useEffect, useState } from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import { Image, Text } from 'react-native-elements';
import { useDispatch } from 'react-redux';
import TextField from '../../components/TextField';
import { useFormik } from 'formik';
import * as Bonk from 'yup';
import banner from './../../assets/images/password_banner.png';
import Loading from './../../components/Loading';
import PrimaryButton from '../../components/CustomButton/PrimaryButton';
import { COLORS, STYLES, FONTS } from '../../styles';
import authApi from '../../api/authApi';

const ForgotPass = ({ navigation }) => {
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
    navigation.navigate('inputOtp');
  };

  return (
    <SafeAreaView style={styles.container}>
      {loading}
      <Image
        resizeMode="contain"
        source={banner}
        style={{
          height: 220,
          marginBottom: 20,
        }}
      />
      <View style={{ paddingHorizontal: 15 }}>
        <Text style={styles.title}>Quên mật khẩu</Text>
        <Text
          style={{
            fontSize: 15,
            color: 'rgba(0, 0, 0, 0.5)',
          }}>
          Nhập số điện thoại của bạn
        </Text>
        <TextField
          keyboardType="numeric"
          icon="phone"
          placeholder="Số điện thoại"
          value={formik.values.email}
          onChangeText={setEmail}
        />

        {formik.touched.email && formik.errors.email ? (
          <Text
            style={{
              color: COLORS.danger,
              marginBottom: 15,
              fontWeight: 'bold',
            }}>
            {formik.errors.email}
          </Text>
        ) : null}

        <PrimaryButton
          backgroundColor="#f55651"
          containerStyle={{ marginTop: 20 }}
          title="Lấy mã OTP"
          onPress={formik.submitForm}
        />
      </View>
    </SafeAreaView>
  );
};

export default ForgotPass;

export const styles = StyleSheet.create({
  container: {
    ...STYLES.container,
    padding: 25,
  },
  title: {
    alignSelf: 'flex-start',
    fontSize: 30,
    fontWeight: 'bold',
    paddingBottom: 10,
    borderBottomColor: '#f55651',
    borderBottomWidth: 5,
    marginBottom: 10,
  },
});
