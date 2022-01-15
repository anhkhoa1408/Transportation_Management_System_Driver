import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { Icon, Text, Card, Tooltip } from 'react-native-elements';
import { container, header, shadowCard } from '../../styles/layoutStyle';
import { primaryColor } from '../../styles/color';
import img from './../../assets/images/download.jpg';
import { TouchableHighlight } from 'react-native-gesture-handler';
import ErrorForm from './ErrorForm';
import { store } from '../../config/configureStore';
import Loading from '../../components/Loading';
import { COLORS } from '../../styles';
import { InfoField } from '../../components/InfoField';

const VehicleScreen = () => {
  const carr = {
    licence: '',
    type: '',
    load: '',
    size: { len: '', width: '', height: '' },
  };

  const [errorForm, setError] = useState(false);
  const [car, setCar] = useState(carr);
  const carInfo = store.getState().userInfo.user.car;

  useEffect(() => {
    setCar(carInfo);
  }, []);

  return (
    <>
      {!car.licence && <Loading />}
      <View style={vehicleStyle.container}>
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
          <ScrollView>
            <Card containerStyle={vehicleStyle.truckContainer}>
              <View style={vehicleStyle.infoItem}>
                <Icon
                  type="feather"
                  name="truck"
                  reverse
                  size={18}
                  color="#f0531f"
                  containerStyle={{
                    marginRight: 10,
                    marginLeft: 0,
                  }}
                />
                <Text h4>Phương tiện</Text>
              </View>

              <View style={vehicleStyle.infoItem}>
                <View style={{ flex: 1 }}>
                  <Text style={vehicleStyle.infoTittle}>Phương tiện</Text>
                  <Text style={vehicleStyle.infoContent}>
                    {'type' in car ? car.type : 'Loading...'}
                  </Text>
                </View>

                <View style={{ flex: 1 }}>
                  <Text style={vehicleStyle.infoTittle}>Tải trọng tối đa</Text>
                  <Text style={vehicleStyle.infoContent}>
                    {'load' in car ? car.load : 'Loading...'} Kg
                  </Text>
                </View>
              </View>

              <View style={vehicleStyle.infoItem}>
                <View style={{ flex: 1 }}>
                  <Text style={vehicleStyle.infoTittle}>
                    Kích thước thùng xe
                  </Text>
                  <Text style={vehicleStyle.infoContent}>
                    {'size' in car
                      ? `${car.size.len} m x ${car.size.width} m x ${car.size.height} m`
                      : 'Loading...'}
                  </Text>
                </View>

                <View style={{ flex: 1 }}>
                  <Text style={vehicleStyle.infoTittle}>Biển số xe</Text>
                  <Text style={vehicleStyle.infoContent}>
                    {'licence' in car ? car.licence : 'Loading...'}
                  </Text>
                </View>
              </View>
            </Card>

            <Card containerStyle={vehicleStyle.truckContainer}>
              <View style={vehicleStyle.infoItem}>
                <Icon
                  type="feather"
                  name="user"
                  reverse
                  size={18}
                  color="#2ed964"
                  containerStyle={{
                    marginRight: 10,
                    marginLeft: 0,
                  }}
                />
                <Text h4>Người vận chuyển</Text>
              </View>

              <View style={vehicleStyle.infoItem}>
                <View style={{ flex: 1 }}>
                  <Text style={vehicleStyle.infoTittle}>Tên</Text>
                  <Text style={vehicleStyle.infoContent}>Uchiha shisui</Text>
                </View>

                <View style={{ flex: 1 }}>
                  <Text style={vehicleStyle.infoTittle}>Số điện thoại</Text>
                  <Text style={vehicleStyle.infoContent}>012345678</Text>
                </View>
              </View>

              <View style={vehicleStyle.infoItem}>
                <View style={{ flex: 1 }}>
                  <Text style={vehicleStyle.infoTittle}>Người hỗ trợ</Text>
                  <Text style={vehicleStyle.infoContent}>Danzo</Text>
                </View>

                <View style={{ flex: 1 }}>
                  <Text style={vehicleStyle.infoTittle}>SDT người hỗ trợ</Text>
                  <Text style={vehicleStyle.infoContent}>012345689</Text>
                </View>
              </View>
            </Card>
          </ScrollView>
        </Card>
      </View>
      {errorForm ? <ErrorForm setError={setError} /> : null}
    </>
  );
};

const vehicleStyle = StyleSheet.create({
  container: {
    ...container,
  },
  infoContainer: {
    position: 'absolute',
    top: '10%',
    bottom: 0,
    left: 0,
    right: 0,
    margin: 0,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    backgroundColor: '#FFF',
    paddingVertical: 30,
  },
  truckContainer: {
    display: 'flex',
    justifyContent: 'flex-start',
    borderRadius: 20,
    paddingHorizontal: 20,
    marginBottom: 20,
    borderWidth: 0,
    ...shadowCard,
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
