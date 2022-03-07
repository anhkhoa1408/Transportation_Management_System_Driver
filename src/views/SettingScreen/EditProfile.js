import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import { COLORS } from '../../styles';
import authApi from '../../api/authApi';
import { useDispatch } from 'react-redux';
import { store } from '../../config/configureStore';
import { useFormik } from 'formik';
import * as Bonk from 'yup';
import { saveInfo } from '../../actions/actions';
import ModalMess from '../../components/ModalMess';
import { danger, success } from '../../styles/color';
import { Avatar, Icon } from 'react-native-elements';
import Header from '../../components/Header';
import TextField from '../../components/TextField';
import PillButton from '../../components/CustomButton/PillButton';
import Loading from '../../components/Loading';
import { launchImageLibrary } from 'react-native-image-picker';
import { getAvatarFromUser } from '../../utils/avatarUltis';
import PrimaryButton from '../../components/CustomButton/PrimaryButton';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const EditProfile = ({ navigation }) => {
  const [data, setData] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [avatar, setAvatar] = useState(getAvatarFromUser());
  const [dataChange, setDataChange] = useState(true);
  const [user, setUser] = useState({});
  const dispatch = useDispatch();
  const { userInfo } = store.getState();
  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: data,
    validationSchema: Bonk.object({
      name: Bonk.string().required('Thông tin bắt buộc'),
      email: Bonk.string()
        .required('Thông tin bắt buộc')
        .email('Email không hợp lệ'),
      phone: Bonk.string().required('Thông tin bắt buộc'),
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
        phone: userInfo.user.phone,
      });
      if (userInfo.user?.avatar?.url !== undefined)
        setAvatar(userInfo.user.avatar.url);
      setDataChange(false);
      setDataChange(true);
    });
    return unsubscribe;
  }, [navigation]);

  const handleSubmit = values => {
    setLoading(true);
    authApi
      .update(user.user.id, values)
      .then(response => {
        setLoading(false);
        dispatch(saveInfo({ user: response }));
        setAlert({
          type: 'success',
          message: 'Cập nhật thông tin thành công',
        });
      })
      .catch(err => {
        setLoading(false);
        setAlert({
          type: 'error',
          message: 'Cập nhật thông tin thất bại',
        });
      });
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
        headerText="Thông tin cá nhân"
      />

      <KeyboardAwareScrollView
        enableOnAndroid
        enableAutomaticScroll
        contentContainerStyle={{ padding: 25 }}>
        <View style={{ alignItems: 'center' }}>
          <Avatar
            size={150}
            source={{
              uri: getAvatarFromUser(userInfo.user),
            }}
            rounded>
            <Avatar.Accessory
              underlayColor="#CCC"
              style={{ backgroundColor: COLORS.primary }}
              color={COLORS.white}
              onPress={() =>
                launchImageLibrary({
                  mediaTypes: 'photo',
                  quality: 1,
                }).then(data => {
                  if (data.assets && data.assets.length > 0) {
                    setLoading(true);
                    authApi
                      .updateAvatar(data.assets[0])
                      .then(response => {
                        setLoading(false);
                        dispatch(saveInfo({ user: response }));
                        setAlert({
                          type: 'success',
                          message: 'Cập nhật ảnh đại diện thành công',
                        });
                      })
                      .catch(err => {
                        console.error(err);
                        setLoading(false);
                        setAlert({
                          type: 'danger',
                          message: 'Cập nhật ảnh đại diện thất bại',
                        });
                      });
                  }
                })
              }
              size={35}
            />
          </Avatar>
        </View>

        <TextField
          title="Tên"
          style={styles.fsize}
          onChangeText={text => {
            formik.setFieldValue('name', text);
          }}
          value={formik.values.name}
          error={formik.touched.name && formik.errors.name}
          errorMessage={formik.errors.name}
        />

        <TextField
          title="Email"
          style={styles.fsize}
          value={formik.values.email}
          onChangeText={text => formik.setFieldValue('email', text)}
          error={formik.touched.email && formik.errors.email}
          errorMessage={formik.errors.email}
        />

        <TextField
          keyboardType="numeric"
          title="Số điện thoại"
          style={styles.fsize}
          value={formik.values.phone}
          onChangeText={text => formik.setFieldValue('phone', text)}
          error={formik.touched.phone && formik.errors.phone}
          errorMessage={formik.errors.phone}
        />
        <PrimaryButton
          title="Cập nhật"
          backgroundColor={COLORS.success}
          onPress={formik.submitForm}
          containerStyle={{ marginTop: 30 }}
        />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default EditProfile;

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
