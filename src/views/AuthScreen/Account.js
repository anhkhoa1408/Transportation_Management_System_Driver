import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { COLORS } from '../../styles';
import authApi from '../../api/authApi';
import { useDispatch } from 'react-redux';
import { CLEAN_STORE } from '../../constants/types';
import { store } from '../../config/configureStore';
import { useFormik } from 'formik';
import * as Bonk from 'yup';
import { saveInfo } from '../../actions/actions';
import ModalMess from '../../components/ModalMess';
import { danger } from '../../styles/color';

const Account = ({ navigation }) => {
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    cpassword: '',
  });
  const [avatar, setAvatar] = useState(
    'https://res.cloudinary.com/dfnoohdaw/image/upload/v1638692549/avatar_default_de42ce8b3d.png',
  );
  const [dataChange, setDataChange] = useState(true);
  const [user, setUser] = useState({});
  const dispatch = useDispatch();
  const { userInfo } = store.getState();
  const [alert, setAlert] = useState(null);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: data,
    validationSchema: Bonk.object({
      name: Bonk.string().required('Thông tin bắt buộc'),
      email: Bonk.string()
        .required('Thông tin bắt buộc')
        .email('Email không hợp lệ'),
      //   password: Bonk.string()
      //     .required('Thông tin bắt buộc')
      //     .min(8, 'Mật khẩu phải tối thiểu 8 ký tự'),
    }),
    onSubmit: values => {
      handleSubmit(values);
    },
  });

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setUser(userInfo);
      setData({
        ...data,
        name: userInfo.user.name,
        email: userInfo.user.email,
      });
      if ('avatar' in userInfo.user)
        if ('url' in userInfo.user.avatar) setAvatar(userInfo.user.avatar.url);
      setDataChange(false);
      setDataChange(true);
    });
    return unsubscribe;
  }, [navigation]);

  const handleSubmit = values => {
    let { name, email } = values;
    let data = {
      name: name,
      email: email,
    };
    authApi
      .update(user.user.id, data)
      .then(response => {
        dispatch(saveInfo(user));
        setAlert({
          type: 'success',
          message: 'Cập nhật thông tin thành công',
        });
      })
      .catch(err => {
        setAlert({
          type: 'error',
          message: 'Cập nhật thông tin thất bại',
        });
      });
  };

  return (
    <ScrollView>
      <SafeAreaView style={styles.screen}>
        {alert && (
          <ModalMess
            type={alert.type}
            message={alert.message}
            setAlert={setAlert}
            alert={alert}
          />
        )}
        <View style={{ alignItems: 'center' }}>
          {dataChange && (
            <Image
              style={{
                height: 145,
                width: 145,
                resizeMode: 'contain',
                marginBottom: 20,
              }}
              source={{
                uri: avatar,
              }}
            />
          )}
          <TouchableOpacity>
            <Text style={styles.forgot}>Change avatar</Text>
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.texttitle}>Name</Text>
          <TouchableOpacity
            style={{ marginLeft: 20 }}
            onPress={formik.submitForm}>
            <Text style={styles.forgot}>Change</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.inputView}>
          {dataChange && (
            <TextInput
              name="name"
              style={styles.fsize}
              onChangeText={text => {
                formik.setFieldValue('name', text);
              }}
              value={formik.values.name}
            />
          )}
        </View>

        {formik.touched.name && formik.errors.name ? (
          <Text style={{ color: danger, marginTop: 10 }}>
            {formik.errors.name}
          </Text>
        ) : null}

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 20,
          }}>
          <Text style={styles.texttitle}>Email</Text>
          <TouchableOpacity
            style={{ marginLeft: 20 }}
            onPress={formik.submitForm}>
            <Text style={styles.forgot}>Change</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.inputView}>
          {dataChange && (
            <TextInput
              name="email"
              style={styles.fsize}
              value={formik.values.email}
              onChangeText={text => formik.setFieldValue('email', text)}
            />
          )}
        </View>

        {formik.touched.email && formik.errors.email ? (
          <Text style={{ color: danger, marginTop: 10 }}>
            {formik.errors.email}
          </Text>
        ) : null}

        <TouchableOpacity>
          <Text style={{ ...styles.forgot, marginTop: 20 }}>
            Change Password
          </Text>
        </TouchableOpacity>
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.loginBtn}
            onPress={() => {
              dispatch({ type: CLEAN_STORE });
            }}>
            <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>
              Log out
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default Account;

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.background1,
    flexDirection: 'column',
    padding: 30,
    alignItems: 'stretch',
  },
  inputView: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  fsize: {
    fontSize: 17,
    color: '#000',
    paddingLeft: 20,
    paddingVertical: 8,
  },
  texttitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
  },
  forgot: {
    color: '#3B3DBF',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  reset: {
    color: COLORS.red,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  container: {
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginBtn: {
    backgroundColor: COLORS.red,
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    borderRadius: 15,
    height: 50,
  },
});