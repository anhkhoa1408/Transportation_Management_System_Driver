import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Icon, Text, Card, Overlay } from 'react-native-elements';
import { container, header, shadowCard } from '../../styles/layoutStyle';
import { TouchableHighlight } from 'react-native-gesture-handler';
import ErrorForm from './ErrorForm';
import { store } from '../../config/configureStore';
import Loading from '../../components/Loading';
import styles, { COLORS } from '../../styles';
import { backdropColor } from '../../styles/color';
import ModalMess from '../../components/ModalMess';
import shipmentApi from '../../api/shipmentAPI';
import { FocusStatusBar } from '../../components/FocusStatusBar';

const VehicleScreen = () => {
  const [errorForm, setError] = useState(false);
  const [car, setCar] = useState({});
  const carInfo = store.getState().userInfo.user.car;
  const userInfo = store.getState().userInfo.user;
  const [successModal, setSuccessModal] = useState(null);
  const [failModal, setFailModal] = useState(null);
  const [shipment, setShipment] = useState(null);
  const [assistance, setAssistance] = useState({
    name: '',
    phone: '',
  });

  useEffect(() => {
    setCar(carInfo);
    shipmentApi.assistanceInfo().then(response => {
      setAssistance(response);
    });
  }, []);

  return (
    <>
      {!car.licence && <Loading />}
      <FocusStatusBar backgroundColor={COLORS.header} barStyle="white-content" />
      <SafeAreaView style={vehicleStyle.container}>
        <View style={vehicleStyle.headerContainer}>
          <View style={vehicleStyle.headerContent}>
            <Text style={{ color: '#FFF', fontSize: 22, fontWeight: 'bold' }}>
              Thông tin phương tiện
            </Text>

            <TouchableHighlight>
              <Icon
                onPress={() => setError(true)}
                name="error-outline"
                color="#FFF"
              />
            </TouchableHighlight>
          </View>
        </View>

        <Card containerStyle={vehicleStyle.infoContainer}>
          <ScrollView contentContainerStyle={{ paddingHorizontal: 5 }}>
            <ModalMess
              type={'success'}
              message={'Cập nhật thành công.'}
              alert={successModal}
              setAlert={setSuccessModal}
            />
            <ModalMess
              type={'danger'}
              message={'Cập nhật thất bại.'}
              alert={failModal}
              setAlert={setFailModal}
            />
            <Card containerStyle={vehicleStyle.truckContainer}>
              <View style={[vehicleStyle.infoItem, { alignItems: 'center' }]}>
                <Icon
                  type="feather"
                  name="truck"
                  reverse
                  size={16}
                  color="#f0531f"
                  containerStyle={{
                    marginRight: 15,
                    marginLeft: 0,
                  }}
                />
                <Text style={vehicleStyle.infoTitle}>Phương tiện</Text>
              </View>

              <View style={vehicleStyle.infoItem}>
                <View style={{ flex: 1 }}>
                  <Text style={vehicleStyle.infoSubTittle}>Phương tiện</Text>
                  <Text style={vehicleStyle.infoContent}>
                    {car?.type ? car.type : 'Đang cập nhật'}
                  </Text>
                </View>

                <View style={{ flex: 1 }}>
                  <Text style={vehicleStyle.infoSubTittle}>
                    Tải trọng tối đa
                  </Text>
                  <Text style={vehicleStyle.infoContent}>
                    {car?.load ? car.load + ' Kg' : 'Đang cập nhật'}
                  </Text>
                </View>
              </View>

              <View style={vehicleStyle.infoItem}>
                <View style={{ flex: 1 }}>
                  <Text style={vehicleStyle.infoSubTittle}>
                    Kích thước thùng xe
                  </Text>
                  <Text style={[vehicleStyle.infoContent, { width: '80%' }]}>
                    {'size' in car
                      ? `${car.size.len} m x ${car.size.width} m x ${car.size.height} m`
                      : 'Đang cập nhật'}
                  </Text>
                </View>

                <View style={{ flex: 1 }}>
                  <Text style={vehicleStyle.infoSubTittle}>Biển số xe</Text>
                  <Text style={vehicleStyle.infoContent}>
                    {car?.licence ? car.licence : 'Đang cập nhật'}
                  </Text>
                </View>
              </View>
            </Card>

            <Card containerStyle={vehicleStyle.truckContainer}>
              <View style={[vehicleStyle.infoItem, { alignItems: 'center' }]}>
                <Icon
                  type="feather"
                  name="user"
                  reverse
                  size={16}
                  color="#2ed964"
                  containerStyle={{
                    marginRight: 12,
                    marginLeft: 0,
                  }}
                />
                <Text style={vehicleStyle.infoTitle}>Người vận chuyển</Text>
              </View>

              <View style={vehicleStyle.infoItem}>
                <View style={{ flex: 1 }}>
                  <Text style={vehicleStyle.infoSubTittle}>Tên</Text>
                  <Text style={vehicleStyle.infoContent}>{userInfo.name}</Text>
                </View>

                <View style={{ flex: 1 }}>
                  <Text style={vehicleStyle.infoSubTittle}>Số điện thoại</Text>
                  <Text style={vehicleStyle.infoContent}>{userInfo.phone}</Text>
                </View>
              </View>

              <View style={vehicleStyle.infoItem}>
                <View style={{ flex: 1 }}>
                  <Text style={vehicleStyle.infoSubTittle}>Người hỗ trợ</Text>
                  <Text style={vehicleStyle.infoContent}>
                    {assistance.name ? assistance.name : 'Đang cập nhật'}
                  </Text>
                </View>

                <View style={{ flex: 1 }}>
                  <Text style={vehicleStyle.infoSubTittle}>
                    SDT người hỗ trợ
                  </Text>
                  <Text style={vehicleStyle.infoContent}>
                    {assistance.phone ? assistance.phone : 'Đang cập nhật'}
                  </Text>
                </View>
              </View>
            </Card>
          </ScrollView>
        </Card>
        <Overlay
          backdropStyle={{
            width: '100%',
            height: '100%',
            backgroundColor: backdropColor,
            opacity: 0.6,
          }}
          overlayStyle={{
            width: '90%',
            height: '60%',
            borderRadius: 12,
            paddingVertical: 30,
            paddingHorizontal: 15,
          }}
          isVisible={errorForm}>
          <ErrorForm
            setError={setError}
            car={carInfo}
            onSuccess={setSuccessModal}
            onFailure={setFailModal}
          />
        </Overlay>
      </SafeAreaView>
    </>
  );
};

const vehicleStyle = StyleSheet.create({
  container: {
    ...container,
  },
  infoContainer: {
    position: 'absolute',
    top: 80,
    bottom: 0,
    left: 0,
    right: 0,
    margin: 0,
    backgroundColor: '#FAFAFA',
    paddingVertical: 20,
    zIndex: 1,
    paddingHorizontal: 0,
  },
  truckContainer: {
    display: 'flex',
    justifyContent: 'flex-start',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 20,
    shadowColor: COLORS.primary,
    elevation: 12,
    borderWidth: 0,
  },
  assistContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 8,
    elevation: 2,
    borderWidth: 0,
  },
  infoItem: {
    display: 'flex',
    flexDirection: 'row',
    margin: 10,
    width: '100%',
    alignItems: 'flex-start',
  },
  headerContainer: {
    ...header,
    paddingTop: 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: COLORS.header,
    marginTop: 0,
    alignItems: 'flex-start',
  },
  headerContent: {
    marginTop: 15,
    marginBottom: 0,
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoTitle: {
    fontSize: 19,
    fontWeight: 'bold',
  },
  infoSubTittle: {
    fontSize: 15,
    color: 'rgba(0, 0, 0, 0.5)',
  },
  infoContent: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default VehicleScreen;
