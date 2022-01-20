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
import { container, header } from '../../styles/layoutStyle';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Header from '../../components/Header';

export default function OrderDetailScreen({ navigation }) {
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
  const [data, setData] = useState(tempData);

  const renderItem = ({ item, index }) => (
    <View
      style={{
        ...STYLES.subContainer,
        ...STYLES.shadowCard,
        padding: 20,
        borderRadius: 12,
        backgroundColor: COLORS.white,
      }}>
      <View style={{ ...STYLES.row }}>
        <Image
          style={{
            tintColor: '#000000',
            resizeMode: 'contain',
            height: 50,
            width: 50,
            marginTop: 10,
          }}
          source={require('../../assets/images/package.png')}
        />
        <View
          style={{
            ...STYLES.column,
            flex: 1,
            marginLeft: 20,
          }}>
          <Text style={{ ...FONTS.Big }}>ID: {item.id}</Text>
          <Text style={{ ...FONTS.Smol }}>
            Số lượng: <Text style={{ ...FONTS.SmolBold }}>{item.quantity}</Text>
          </Text>
          <Text style={{ ...FONTS.Smol }}>
            Địa điểm hiện tại:{' '}
            <Text style={{ ...FONTS.SmolBold }}>{item.current_address}</Text>
          </Text>
        </View>
      </View>
    </View>
  );

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
              ...STYLES.subContainer,
              paddingBottom: 18,
              ...styles.borderBottom,
            }}>
            <View style={{ ...STYLES.row }}>
              <View
                style={{
                  ...STYLES.column,
                  flex: 1,
                  marginRight: 20,
                }}>
                <Text style={{ ...styles.title }}>Địa chỉ</Text>
              </View>
              <View style={{ ...STYLES.column, flex: 0.8 }}>
                <Text style={{ ...styles.title }}>Cần vận chuyển</Text>
              </View>
            </View>
            <View style={{ ...STYLES.row }}>
              <View
                style={{
                  ...STYLES.column,
                  flex: 1,
                  alignItems: 'flex-start',
                  marginRight: 20,
                }}>
                <Text style={{ ...FONTS.SmolBold }}>
                  {data[0].current_address === null
                    ? data[0].order.from_address.street +
                      ', ' +
                      data[0].order.from_address.ward +
                      ', ' +
                      data[0].order.from_address.province +
                      ', ' +
                      data[0].order.from_address.city
                    : data[0].current_address}
                </Text>
              </View>
              <View
                style={{
                  ...STYLES.column,
                  flex: 0.8,
                  alignItems: 'flex-start',
                }}>
                <Text style={{ ...FONTS.SmolBold }}>
                  {data.reduce(
                    (previous, current) =>
                      previous + current.weight * current.quantity,
                    0,
                  )}{' '}
                  Kg
                </Text>
              </View>
            </View>
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
