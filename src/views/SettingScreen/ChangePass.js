import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native';
import { COLORS } from '../../styles';
import authApi from '../../api/authApi';
import { useFormik } from 'formik';
import * as Bonk from 'yup';
import ModalMess from '../../components/ModalMess';
import { danger, success } from '../../styles/color';
import { Icon } from 'react-native-elements';
import Header from '../../components/Header';
import TextField from '../../components/TextField';
import PillButton from '../../components/CustomButton/PillButton';
import Loading from '../../components/Loading';

const ChangePass = props => {
  const { navigation } = props;
  const [data, setData] = useState({
    currPass: '',
    password: '',
    confirmPassword: '',
  });

  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: data,
    validationSchema: Bonk.object({
      currPass: Bonk.string().required('Thông tin bắt buộc'),
      password: Bonk.string()
        .required('Thông tin bắt buộc')
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/,
          'Mật khẩu mới phải tối thiểu 8 ký tự, bao gồm chữ in hoa',
        )
        .min(8, 'Mật khẩu phải tối thiểu 8 ký tự'),
      confirmPassword: Bonk.string()
        .required('Thông tin bắt buộc')
        .oneOf(
          [Bonk.ref('password'), null],
          'Mật khẩu và xác nhận mật khẩu không khớp',
        )
        .min(8, 'Mật khẩu phải tối thiểu 8 ký tự'),
    }),
    onSubmit: values => {
      authApi
        .changepassword({
          password: values.currPass,
          newPassword: values.password,
        })
        .then(data => setAlert(alertType.success))
        .catch(error => setAlert(alertType.error));
    },
  });

  const alertType = {
    error: {
      type: 'danger',
      message: 'Cập nhật mật khẩu thất bại',
    },
    success: {
      type: 'success',
      message: 'Cập nhật mật khẩu thành công',
    },
  };

  return (
    <SafeAreaView style={styles.screen}>
      {alert && (
        <ModalMess
          type={alert.type}
          message={alert.message}
          setAlert={setAlert}
          alert={alert}
        />
      )}
      {loading && <Loading />}
      <Header
        leftElement={
          <Icon name="west" size={30} onPress={() => navigation.goBack()} />
        }
        headerText="Đổi mật khẩu"
      />

      <ScrollView contentContainerStyle={{ padding: 25 }}>
        <Text
          style={{
            textAlign: 'center',
            marginBottom: 25,
          }}>
          Mật khẩu mới phải tối thiểu 8 ký tự, bao gồm chữ in hoa, số và khác
          với mật khẩu hiện tại
        </Text>

        <TextField
          title="Mật khẩu hiện tại"
          style={styles.fsize}
          value={formik.values.currPass}
          secureTextEntry
          onChangeText={text => formik.setFieldValue('currPass', text)}
        />

        {formik.touched.currPass && formik.errors.currPass ? (
          <Text style={{ color: danger, marginBottom: 10 }}>
            {formik.errors.currPass}
          </Text>
        ) : null}

        <TextField
          title="Mật khẩu mới"
          style={styles.fsize}
          value={formik.values.password}
          secureTextEntry
          onChangeText={text => formik.setFieldValue('password', text)}
        />

        {formik.touched.password && formik.errors.password ? (
          <Text style={{ color: danger, marginBottom: 10 }}>
            {formik.errors.password}
          </Text>
        ) : null}

        <TextField
          title="Xác nhận mật khẩu"
          style={styles.fsize}
          value={formik.values.confirmPassword}
          secureTextEntry
          onChangeText={text => formik.setFieldValue('confirmPassword', text)}
        />

        {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
          <Text style={{ color: danger, marginBottom: 10 }}>
            {formik.errors.confirmPassword}
          </Text>
        ) : null}

        <PillButton
          title="Cập nhật"
          buttonStyle={{ backgroundColor: success }}
          onPress={formik.submitForm}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ChangePass;

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.white,
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  fsize: {
    fontSize: 17,
    color: '#000',
    paddingLeft: 20,
    paddingVertical: 8,
  },
});
