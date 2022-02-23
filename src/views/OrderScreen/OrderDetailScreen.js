import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Icon, CheckBox, Avatar, Text } from 'react-native-elements';
import { COLORS, FONTS, STYLES } from '../../styles';
import img from '../../assets/images/download.jpg';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Header from '../../components/Header';
import { joinAddress } from '../../utils/addressUltis';
import PackageItem from './components/PackageItem';
import InfoField from '../../components/InfoField';
import shipmentApi from '../../api/shipmentAPI';

export default function OrderDetailScreen({ navigation, route }) {
  const tempData = [
    {
      quantity: 133,
      weight: 1,
      state: 0,
      _id: '61a983c312c1a70016415259',
      package_type: {
        package_type: 'normal',
      },
      code: '784544',
      current_address: 'Kho Hà Nội',
      order: {
        state: 0,
        _id: '61a982b712c1a7001641524f',
        sender_phone: '0946853324',
        fee: 2000,
        remain_fee: 2000,
        sender_name: 'Duong Tran',
        receiver_name: 'Tran Duong',
        receiver_phone: '0986657442',
        from_address: {
          street: '123 Ly Thuong Kiet',
          ward: 'Thanh Thanh',
          province: 'Quan 3',
          city: 'Ho Chi Minh',
        },
        to_address: {
          street: '02 Tran Hung Dao',
          ward: 'Phuong 3',
          province: 'An Ba',
          city: 'An Giang',
        },
        id: '61a982b712c1a7001641524f',
      },
      size: {
        len: 5,
        width: 20,
        height: 10,
      },
      imports: [],
      exports: [],
      shipments: [],
      id: '61a983c312c1a70016415259',
    },
    {
      quantity: 20,
      weight: 3,
      state: 0,
      package_type: {
        package_type: 'normal',
      },
      code: '16516518791',
      current_address: 'Kho Hà Nội',
      order: {
        state: 0,
        sender_phone: '0946853324',
        fee: 2000,
        remain_fee: 2000,
        sender_name: 'Duong Tran',
        receiver_name: 'Tran Duong',
        receiver_phone: '0986657442',
        from_address: {
          street: '123 Ly Thuong Kiet',
          ward: 'Thanh Thanh',
          province: 'Quan 3',
          city: 'Ho Chi Minh',
        },
        to_address: {
          street: '02 Tran Hung Dao',
          ward: 'Phuong 3',
          province: 'An Ba',
          city: 'An Giang',
        },
        id: '61a982b712c1a7001641524f',
      },
      size: {
        len: 101,
        width: 20,
        height: 30,
      },
      id: '61a9840512c1a7001641525c',
    },
  ];
  const [data, setData] = useState([]);

  useEffect(() => {
    if (route.params.shipmentID)
      shipmentApi.shipmentDetail(route.params.shipmentID).then(response => {
        console.log(response);
        setData(response.packages);
      });
  }, []);

  const renderItem = ({ item, index }) => <PackageItem item={item} />;

  return (
    <View style={{ ...STYLES.container }}>
      <Header
        leftElement={
          <TouchableOpacity>
            <MaterialIcon
              name="west"
              size={30}
              onPress={() => navigation.goBack()}
            />
          </TouchableOpacity>
        }
        headerText={'Chi tiết đơn hàng'}
      />

      {data.length > 0 && (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
          <View
            style={{
              ...STYLES.row,
              ...STYLES.subContainer,
              padding: 0,
              paddingBottom: 20,
              ...styles.borderBottom,
            }}>
            <Avatar
              size="medium"
              avatarStyle={{ borderRadius: 10 }}
              source={img}
            />
            <View style={{ flex: 1 }}>
              <View style={{ ...STYLES.column, flex: 1, marginLeft: 20 }}>
                <Text>{data[0].order.sender_name}</Text>
                <Text>SĐT: {data[0].order.sender_phone}</Text>
              </View>
            </View>
            <Icon
              name={'sms'}
              size={50}
              color={COLORS.primary}
              type="material"
            />
          </View>

          <View
            style={{
              ...STYLES.row,
              ...STYLES.subContainer,
              ...styles.borderBottom,
              paddingBottom: 18,
            }}>
            <InfoField
              title={'Địa chỉ'}
              style={{ flex: 1 }}
              content={
                data[0].current_address !== null
                  ? joinAddress(data[0].order.from_address)
                  : data[0].current_address
              }
            />
            <InfoField
              title={'Khối lượng'}
              style={{ flex: 0.8 }}
              content={
                data.reduce(
                  (previous, current) =>
                    previous + current.weight * current.quantity,
                  0,
                ) + ' Kg'
              }
            />
          </View>

          <View style={{ flex: 1, alignItems: 'stretch' }}>
            <FlatList
              data={data}
              renderItem={renderItem}
              keyExtractor={item => `${item.id}`}
            />
          </View>
          <TouchableOpacity style={STYLES.button}>
            <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>
              Chụp ảnh
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {data.length == 0 && (
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            height: 200,
          }}>
          <Text style={{ color: COLORS.primary, ...FONTS.header }}>
            No Record
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.primary,
  },
});
