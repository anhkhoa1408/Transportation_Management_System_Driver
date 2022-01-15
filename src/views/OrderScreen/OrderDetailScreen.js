import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Icon, CheckBox, Avatar, Text } from 'react-native-elements';
import { COLORS, FONTS } from '../../styles';
import img from '../../assets/images/download.jpg';
import { container, header } from '../../styles/layoutStyle';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

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
        paddingVertical: 25,
        paddingHorizontal: 20,
        marginHorizontal: 25,
        marginVertical: 15,
        borderRadius: 12,
        backgroundColor: COLORS.white,
        ...styles.shadow,
      }}>
      <View style={{ ...styles.row }}>
        <Image
          style={{
            tintColor: '#000000',
            resizeMode: 'contain',
            height: 50,
            width: 50,
          }}
          source={require('../../assets/images/package.png')}
        />
        <View
          style={{
            ...styles.column,
            flex: 1,
            marginLeft: 10,
            alignItems: 'flex-start',
          }}>
          <Text style={{ ...styles.bigText }}>ID: {item.id}</Text>
          <Text style={{ ...styles.smolText }}>
            Số lượng: <Text style={{ ...styles.info }}>{item.quantity}</Text>
          </Text>
          <Text style={{ ...styles.smolText }}>
            Địa điểm hiện tại:{' '}
            <Text style={{ ...styles.info }}>{item.current_address}</Text>
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <MaterialIcon
            name="west"
            size={30}
            onPress={() => navigation.goBack()}
          />
        </TouchableOpacity>
        <Text h4>Chi tiết đơn</Text>
        <Avatar
          rounded
          size="small"
          source={img}
          onPress={() => navigation.navigate('CustomerInfo')}
        />
      </View>
      {data.length > 0 && (
        <View style={{ flex: 1 }}>
          <View
            style={{
              ...styles.row,
              paddingHorizontal: 20,
              paddingVertical: 10,
              ...styles.borderBottom,
            }}>
            <Avatar
              size="medium"
              avatarStyle={{ borderRadius: 10 }}
              source={img}
            />
            <View style={{ flex: 1 }}>
              <View style={{ ...styles.column, flex: 1, marginLeft: 20 }}>
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

          <View style={{ ...styles.borderBottom, padding: 20 }}>
            <View style={{ ...styles.row }}>
              <View
                style={{
                  ...styles.column,
                  flex: 1,
                  marginRight: 20,
                }}>
                <Text style={{ ...styles.title }}>Địa chỉ</Text>
              </View>
              <View style={{ ...styles.column, flex: 0.8 }}>
                <Text style={{ ...styles.title }}>Cần vận chuyển</Text>
              </View>
            </View>
            <View style={{ ...styles.row }}>
              <View
                style={{
                  ...styles.column,
                  flex: 1,
                  alignItems: 'flex-start',
                  marginRight: 20,
                }}>
                <Text style={{ ...styles.info }}>
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
                  ...styles.column,
                  flex: 0.8,
                  alignItems: 'flex-start',
                }}>
                <Text style={{ ...styles.info }}>
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
          <TouchableOpacity style={styles.button}>
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
  container: {
    ...container,
    alignItems: 'stretch',
    flex: 1,
  },
  header: {
    ...header,
    // width: '100%',
    // flexDirection: 'row',
    // justifyContent: 'space-between'
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
  },
  row: {
    flexWrap: 'nowrap',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  column: {
    flexWrap: 'nowrap',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  smolText: {
    fontSize: 12,
    marginVertical: 1,
  },
  bigText: {
    fontSize: 16,
    marginBottom: 5,
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.primary,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '60%',
    backgroundColor: '#3B3DBF',
    borderRadius: 8,
    paddingVertical: 10,
    alignSelf: 'center',
    marginBottom: 20,
    marginTop: 10,
  },
  title: {
    fontWeight: '700',
    fontSize: 14,
    color: 'gray',
  },
  info: {
    fontWeight: '700',
    fontSize: 14,
  },
});
