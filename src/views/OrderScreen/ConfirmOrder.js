import React, { useState, useEffect } from 'react';
import {
  Image,
  StyleSheet,
  View,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { Icon, Text } from 'react-native-elements';
import { COLORS, FONTS, STYLES } from '../../styles';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import PillButton from '../../components/CustomButton/PillButton';
import ModalMess from '../../components/ModalMess';
import Header from '../../components/Header';
import shipmentApi from '../../api/shipmentAPI';
import Loading from '../../components/Loading';
import { MAIN_URL } from './../../api/config';
import TextField from '../../components/TextField';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import PrimaryButton from '../../components/CustomButton/PrimaryButton';

const ConfirmOrder = ({ navigation, route }) => {
  const { packageId, shipment, current } = route?.params;
  const [images, setImages] = useState([]);
  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(false);
  const [deleteList, setDelete] = useState([]);
  const [uploadList, setUpload] = useState([]);
  const [numOfPackage, setNumOfPackage] = useState(`${current ? current : 1}`);

  const handleImages = async () => {
    if (images.reduce((acc, ele) => (ele ? acc + 1 : acc), 0) >= 3) {
      return;
    } else {
      const result = await launchCamera({
        mediaTypes: 'photo',
        quality: 1,
        cameraType: 'back',
        saveToPhotos: true,
      });
      try {
        let idx;
        for (let index = 0; index < 3; index++) {
          if (!images[index]) {
            idx = index;
            break;
          }
        }
        images[idx] = result.assets[0];
        setImages([...images]);
        setUpload([...uploadList, images[idx]]);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleDeleteImage = index => {
    if (images[index] && 'url' in images[index]) {
      setDelete([...deleteList, images[index]._id]);
    }
    let temp = uploadList.filter(item => item !== images[index]);
    setUpload(temp);
    images[index] = null;
    setImages([...images]);
  };

  const handleListImage = list => {
    let temp = Array.from({ length: 3 }, (item, index) => {
      if (typeof list[index] !== 'undefined') {
        return {
          ...list[index],
          uri: list[index].url,
        };
      } else {
        return null;
      }
    });
    setImages(temp);
  };

  const handleUpdateImage = () => {
    setLoading(true);
    try {
      shipmentApi.addShipmentItem({
        shipment,
        quantity: numOfPackage,
        package: packageId,
        assmin: false,
      });
      shipmentApi
        .updatePackageImage(packageId, uploadList, deleteList)
        .then(data => {
          setLoading(false);
          setAlert({
            type: 'success',
            message: 'Cập nhật thông tin thành công',
          });
          setUpload([]);
          setDelete([]);
          handleListImage(data.images);
        });
    } catch (error) {
      console.log(error);
      setLoading(false);
      setAlert({
        type: 'danger',
        message: 'Cập nhật thông tin thất bại',
      });
    }
  };

  const handleUploadImage = index => {
    if (images[index]) return;
    launchImageLibrary({
      mediaTypes: 'photo',
      quality: 1,
    })
      .then(image => {
        images[index] = image.assets[0];
        setImages([...images]);
        let temp =
          uploadList && uploadList.length
            ? [...uploadList, image.assets[0]]
            : [image.assets[0]];

        setUpload(temp);
      })
      .catch(error => console.log(error));
  };

  useEffect(() => {
    shipmentApi
      .packageDetail(packageId)
      .then(respones => {
        handleListImage(respones.images);
      })
      .catch(error => console.log(error));
  }, []);

  return (
    <SafeAreaView style={[STYLES.container]}>
      <KeyboardAwareScrollView enableOnAndroid enableAutomaticScroll>
        {alert && (
          <ModalMess
            type={alert.type}
            message={alert.message}
            setAlert={_alert => {
              setAlert(_alert);
              if (alert.type === 'success')
                navigation.navigate({
                  name: 'OrderDetail',
                  merge: true,
                });
            }}
            alert={alert}
          />
        )}
        {loading && <Loading />}
        <Header
          headerText="Chụp ảnh kiện hàng"
          leftElement={
            <Icon name="west" size={30} onPress={() => navigation.goBack()} />
          }
        />
        <View style={[STYLES.container, { padding: 20, paddingTop: 10 }]}>
          <Text
            style={[
              FONTS.Smol,
              { textAlign: 'center', width: '100%', alignSelf: 'center' },
            ]}>
            Vui lòng nhấn vào biểu tượng máy ảnh để chụp ảnh kiện hàng hoặc nhấn
            chọn bên dưới để chọn ảnh từ thư viện
          </Text>
          <View style={[styles.camera]}>
            <TouchableOpacity onPress={handleImages} style={styles.closeBtn}>
              <Icon
                name="camera"
                size={50}
                type="font-awesome"
                color={COLORS.primary}
              />
            </TouchableOpacity>
          </View>

          <View style={[STYLES.row, { justifyContent: 'space-between' }]}>
            {Array.from({ length: 3 }, (_, index) => (
              <TouchableOpacity
                onPress={() => handleUploadImage(index)}
                key={index}
                style={[styles.imageContainer]}>
                {images[index] && Object.keys(images[index]).length ? (
                  <TouchableOpacity
                    onPress={() => handleDeleteImage(index)}
                    style={{
                      position: 'absolute',
                      top: -15,
                      right: -15,
                      margin: 0,
                      zIndex: 100,
                    }}>
                    <Icon
                      name="close"
                      reverse
                      color="red"
                      containerStyle={{ margin: 0 }}
                      size={15}
                    />
                  </TouchableOpacity>
                ) : null}

                {images.length && images[index] && images[index].uri ? (
                  <Image
                    style={styles.image}
                    source={{ uri: images[index].uri }}
                    resizeMode="cover"
                  />
                ) : (
                  <View>
                    <Icon
                      name="image"
                      size={30}
                      type="font-awesome"
                      color={COLORS.primary}
                    />
                    <Text style={{ marginTop: 5, color: COLORS.primary }}>
                      Chọn
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>

          <TextField
            title="Số lượng gói hàng"
            keyboardType="numeric"
            value={numOfPackage}
            onChangeText={setNumOfPackage}
            error={parseInt(numOfPackage) < 1}
            errorMessage={'Số gói hàng phải lớn hơn 0'}
          />

          <PrimaryButton
            onPress={handleUpdateImage}
            title="Xác nhận"
          />
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default ConfirmOrder;

const styles = StyleSheet.create({
  camera: {
    // flex: 1,
    paddingVertical: 40,
    marginTop: 20,
    marginBottom: 45,
    borderWidth: 3,
    borderStyle: 'dashed',
    borderColor: COLORS.primary,
    backgroundColor: COLORS.white,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    width: 110,
    height: 110,
    borderWidth: 1,
    borderStyle: 'dashed',
    marginBottom: 50,
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
  image: { width: '100%', height: '100%', borderRadius: 15 },
});
