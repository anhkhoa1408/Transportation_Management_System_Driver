import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { Icon, Text, Card, Overlay } from 'react-native-elements';
import { container, header, shadowCard } from '../../styles/layoutStyle';
import { TouchableHighlight } from 'react-native-gesture-handler';
import ErrorForm from './ErrorForm';
import { store } from '../../config/configureStore';
import Loading from '../../components/Loading';
import { COLORS } from '../../styles';
import { backdropColor } from '../../styles/color';
import ModalMess from '../../components/ModalMess';
import shipmentApi from '../../api/shipmentAPI';

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
      <SafeAreaView style={vehicleStyle.container}>
        <View style={vehicleStyle.headerContainer}>
          <View style={vehicleStyle.headerContent}>
            <Text h4 style={{ color: '#FFF' }}>
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
                  size={18}
                  color="#f0531f"
                  containerStyle={{
                    marginRight: 15,
                    marginLeft: 0,
                  }}
                />
                <Text h4>Phương tiện</Text>
              </View>

              <View style={vehicleStyle.infoItem}>
                <View style={{ flex: 1 }}>
                  <Text style={vehicleStyle.infoTittle}>Phương tiện</Text>
                  <Text style={vehicleStyle.infoContent}>
                    {car?.type ? car.type : 'Đang cập nhật'}
                  </Text>
                </View>

                <View style={{ flex: 1 }}>
                  <Text style={vehicleStyle.infoTittle}>Tải trọng tối đa</Text>
                  <Text style={vehicleStyle.infoContent}>
                    {car?.load ? car.load + ' Kg' : 'Đang cập nhật'}
                  </Text>
                </View>
              </View>

              <View style={vehicleStyle.infoItem}>
                <View style={{ flex: 1 }}>
                  <Text style={vehicleStyle.infoTittle}>
                    Kích thước thùng xe
                  </Text>
                  <Text style={vehicleStyle.infoContent}>
                    {car?.size
                      ? `${car.size.len} m x ${car.size.width} m x ${car.size.height} m`
                      : 'Đang cập nhật'}
                  </Text>
                </View>

                <View style={{ flex: 1 }}>
                  <Text style={vehicleStyle.infoTittle}>Biển số xe</Text>
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
                  size={18}
                  color="#2ed964"
                  containerStyle={{
                    marginRight: 12,
                    marginLeft: 0,
                  }}
                />
                <Text h4>Người vận chuyển</Text>
              </View>

              <View style={vehicleStyle.infoItem}>
                <View style={{ flex: 1 }}>
                  <Text style={vehicleStyle.infoTittle}>Tên</Text>
                  <Text style={vehicleStyle.infoContent}>{userInfo.name}</Text>
                </View>

                <View style={{ flex: 1 }}>
                  <Text style={vehicleStyle.infoTittle}>Số điện thoại</Text>
                  <Text style={vehicleStyle.infoContent}>{userInfo.phone}</Text>
                </View>
              </View>

              <View style={vehicleStyle.infoItem}>
                <View style={{ flex: 1 }}>
                  <Text style={vehicleStyle.infoTittle}>Người hỗ trợ</Text>
                  <Text style={vehicleStyle.infoContent}>
                    {assistance.name ? assistance.name : 'Đang cập nhật'}
                  </Text>
                </View>

                <View style={{ flex: 1 }}>
                  <Text style={vehicleStyle.infoTittle}>SDT người hỗ trợ</Text>
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
            borderRadius: 12,
            padding: 30,
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
    top: 90,
    bottom: 0,
    left: 0,
    right: 0,
    margin: 0,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    backgroundColor: '#FFF',
    paddingVertical: 20,
    zIndex: 1,
    paddingHorizontal: 0,
  },
  truckContainer: {
    display: 'flex',
    justifyContent: 'flex-start',
    borderRadius: 20,
    paddingHorizontal: 12,
    marginBottom: 20,
    shadowColor: COLORS.primary,
    elevation: 12,
  },
  assistContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 25,
    borderWidth: 0,
    elevation: 2,
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
    height: '40%',
    backgroundColor: COLORS.header,
    marginTop: 0,
    alignItems: 'flex-start',
  },
  headerContent: {
    marginTop: 20,
    marginBottom: 0,
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoTittle: {
    fontSize: 15,
    color: 'rgba(0, 0, 0, 0.5)',
  },
  infoContent: {
    fontSize: 19,
    fontWeight: 'bold',
  },
});

export default VehicleScreen;
