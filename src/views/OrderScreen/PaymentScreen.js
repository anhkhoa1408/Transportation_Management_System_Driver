import React, { useState, useEffect } from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Keyboard,
} from 'react-native';
import { Icon, Text } from 'react-native-elements';
import { COLORS, FONTS, STYLES } from '../../styles';
import Header from '../../components/Header';
import shipmentApi from '../../api/shipmentAPI';
import Loading from '../../components/Loading';
import { useFormik } from 'formik';
import * as Bonk from 'yup';
import PrimaryButton from '../../components/CustomButton/PrimaryButton';
import TextField from '../../components/TextField';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { launchCamera } from 'react-native-image-picker';
import ModalMess from '../../components/ModalMess';

const PaymentScreen = ({ navigation, route }) => {
  const [loading, setLoading] = useState(false);
  const [receipt, setReceipt] = useState(null);
  const [alert, setAlert] = useState(null);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: route.params,
    validationSchema: Bonk.object({
      fee: Bonk.number().required('Thông tin bắt buộc'),
    }),
    onSubmit: values => {
      Keyboard.dismiss();
      handleSubmit(values);
    },
  });

  const handleSubmit = values => {
    setLoading(<Loading />);
    const data = {
      payer_name: values.name,
      payer_phone: values.phone,
      order: values.order,
      paid: values.fee,
    };
    shipmentApi
      .payment(JSON.stringify(data), receipt)
      .then(response => {
        setAlert({
          type: 'success',
          message: 'Cập nhật thành công!',
          btnText: 'Trở lại',
        });
        setLoading(false);
      })
      .catch(err => {
        setAlert({
          type: 'warning',
          message: 'Cập nhật thất bại!',
        });
        setLoading(false);
        console.log(err);
      });
  };

  const handleCamera = async () => {
    const result = await launchCamera({
      mediaTypes: 'photo',
      quality: 1,
      cameraType: 'back',
      // saveToPhotos: true,
    });
    if (result.assets) {
      setReceipt(result.assets[0]);
    }
  };

  const renderReceipt = () => {
    if (receipt) {
      return (
        <Image
          style={styles.image}
          source={{ uri: receipt.uri }}
          resizeMode="cover"
        />
      );
    } else {
      return (
        <Icon
          name="camera"
          size={50}
          type="font-awesome"
          color={COLORS.primary}
        />
      );
    }
  };

  const onAlertConfirm = value => {
    setAlert(value);
    if (alert.type === 'success') {
      navigation.goBack();
    }
  };

  return (
    <KeyboardAwareScrollView enableOnAndroid enableAutomaticScroll>
      {loading}
      {alert && (
        <ModalMess
          type={alert.type}
          message={alert.message}
          alert={alert}
          setAlert={onAlertConfirm}
        />
      )}
      <SafeAreaView style={styles.container}>
        <Header
          leftElement={
            <Icon name="west" size={30} onPress={() => navigation.goBack()} />
          }
          headerText={'Thanh toán đơn hàng'}
        />

        <TextField
          icon="person-outline"
          placeholder="Nhập tên người trả"
          value={formik.values.name}
          onChangeText={text => formik.setFieldValue('name', text)}
          error={formik.touched.name && formik.errors.name}
          errorMessage={formik.errors.name}
        />
        <TextField
          keyboardType="numeric"
          icon="phone"
          placeholder="Nhập số điện thoại người trả"
          value={formik.values.phone}
          onChangeText={text => formik.setFieldValue('remain_fee', text)}
          error={formik.touched.phone && formik.errors.phone}
          errorMessage={formik.errors.phone}
        />
        <TextField
          keyboardType="numeric"
          icon="money"
          placeholder="Nhập số tiền"
          value={`${formik.values.fee}`}
          onChangeText={text => formik.setFieldValue('fee', text)}
          error={formik.touched.fee && formik.errors.fee}
          errorMessage={formik.errors.fee}
          afterText={'vnd'}
        />

        <Text style={styles.text}>Ảnh Biên lai:</Text>

        <View style={styles.camera}>
          <TouchableOpacity
            onPress={handleCamera}
            style={styles.imageContainer}>
            {renderReceipt()}
          </TouchableOpacity>
        </View>

        <PrimaryButton
          title="Xác nhận"
          backgroundColor={COLORS.header}
          onPress={formik.submitForm}
        />
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
};

export default PaymentScreen;

const styles = StyleSheet.create({
  container: {
    ...STYLES.container,
    alignItems: 'stretch',
    padding: 20,
  },
  camera: {
    flex: 1,
    minHeight: 200,
    marginVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    flex: 1,
    borderWidth: 1,
    width: '100%',
    borderStyle: 'dashed',
    borderRadius: 15,
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: COLORS.primary,
  },
  closeBtn: {
    padding: 20,
    borderWidth: 5,
    borderColor: COLORS.primary,
    borderRadius: 50,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  image: { width: '100%', height: '100%', borderRadius: 15 },
});
