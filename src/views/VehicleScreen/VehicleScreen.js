import React, { useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Icon, Text, Card, Tooltip } from 'react-native-elements';
import { container, header, shadowCard } from '../../styles/layoutStyle';
import { primaryColor } from '../../styles/color';
import img from './../../assets/images/download.jpg';
import { TouchableHighlight } from 'react-native-gesture-handler';
import ErrorForm from './ErrorForm';

const VehicleScreen = () => {
  const [errorForm, setError] = useState(false);
  console.log(errorForm);
  return (
    <>
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
                <Text style={vehicleStyle.infoContent}>Container</Text>
              </View>

              <View style={{ flex: 1 }}>
                <Text style={vehicleStyle.infoTittle}>Tải trọng tối đa</Text>
                <Text style={vehicleStyle.infoContent}>1000 Kg</Text>
              </View>
            </View>

            <View style={vehicleStyle.infoItem}>
              <View style={{ flex: 1 }}>
                <Text style={vehicleStyle.infoTittle}>Kích thước thùng xe</Text>
                <Text style={vehicleStyle.infoContent}>10m x 2m x 3m</Text>
              </View>

              <View style={{ flex: 1 }}>
                <Text style={vehicleStyle.infoTittle}>Biển số xe</Text>
                <Text style={vehicleStyle.infoContent}>29C-888-888</Text>
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
    top: '15%',
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
    borderLeftWidth: 10,
    borderColor: '#8de3e3',
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
    alignItems: 'center',
  },
  headerContainer: {
    ...header,
    justifyContent: 'space-between',
    flexDirection: 'row',
    height: '40%',
    backgroundColor: primaryColor,
    marginTop: 0,
    alignItems: 'flex-start',
    backgroundColor: '#5fd0fa',
  },
  headerContent: {
    marginTop: 50,
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