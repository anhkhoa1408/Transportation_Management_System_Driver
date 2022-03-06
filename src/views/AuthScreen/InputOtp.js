import React, { useEffect, useState } from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import { COLORS, FONTS, STYLES } from '../../styles';
import TextField from '../../components/TextField';
import authApi from '../../api/authApi';
import { useDispatch } from 'react-redux';
import * as Bonk from 'yup';
import { useFormik } from 'formik';
import { danger, success, warning } from '../../styles/color';
import banner from './../../assets/images/otp_banner.png';
import Loading from './../../components/Loading';
import PrimaryButton from '../../components/CustomButton/PrimaryButton';
import { Divider, Image, Text } from 'react-native-elements';

const InputOtp = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(60);

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
    navigation.navigate('resetPass');
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (timer) {
        setTimer(timer - 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  return (
    <SafeAreaView style={styles.container}>
      <Image
        resizeMode="contain"
        style={styles.background}
        source={banner}
        containerStyle={{
          height: 250,
        }}
      />
      <View style={{ padding: 20 }}>
        <Text
          style={{
            alignSelf: 'center',
            marginBottom: 5,
            color: 'rgba(0,0,0,0.5)',
          }}>
          Kiểm tra điện thoại của bạn và nhập mã OTP từ tin nhắn
        </Text>
        <TextField
          icon="phone"
          placeholder="Nhập mã OTP"
          value={formik.values.email}
          onChangeText={setEmail}
        />

        {formik.touched.email && formik.errors.email ? (
          <Text
            style={{
              ...FONTS.Big,
              color: danger,
              marginBottom: 15,
              fontWeight: 'bold',
            }}>
            {formik.errors.email}
          </Text>
        ) : null}

        <PrimaryButton
          title="Xác nhận"
          backgroundColor={COLORS.header}
          onPress={handleSubmit}
        />

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Divider
            width={1}
            style={{ marginVertical: 20, flex: 1 }}
            color={COLORS.header}
          />
          <Text style={{ paddingHorizontal: 20 }}>hoặc</Text>
          <Divider
            width={1}
            style={{ marginVertical: 20, flex: 1 }}
            color={COLORS.header}
          />
        </View>

        <PrimaryButton
          disabled={timer !== 0}
          disabledStyle={{
            backgroundColor: COLORS.neutralWarning,
          }}
          title={`Gửi lại mã ${timer ? '(' + timer + ')' : ''}`}
          backgroundColor={COLORS.warning}
        />
      </View>
    </SafeAreaView>
  );
};

export default InputOtp;

export const styles = StyleSheet.create({
  container: {
    ...STYLES.container,
    alignItems: 'stretch',
    padding: 20,
  },
});
