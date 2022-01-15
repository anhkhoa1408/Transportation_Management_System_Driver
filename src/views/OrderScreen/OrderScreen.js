import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Image } from 'react-native';
import shipmentApi from '../../api/shipmentAPI';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Avatar, Text, Icon, CheckBox } from 'react-native-elements';
import { COLORS, FONTS } from '../../styles';
import img from './../../assets/images/download.jpg';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { container, header } from '../../styles/layoutStyle';
import Loading from '../../components/Loading';
// import ButtonSwitch from '../../components/ButtonSwitch';

export default function OrderScreen({ navigation }) {
  const [data, setData] = useState([]);
  const [check, setCheck] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      shipmentApi
        .shipment()
        .then(resData => {
          setData(resData);
          setCheck(data.map(item => 'arrived_time' in item));
        })
        .catch(err => {
          setData([]);
          setCheck(data.map(item => 'arrived_time' in item));
        });
    });
    return unsubscribe;
  }, [navigation]);

  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      style={{
        padding: 20,
        marginHorizontal: 20,
        marginVertical: 10,
        borderRadius: 12,
        backgroundColor: COLORS.white,
        ...styles.shadow,
      }}
      onPress={() => navigation.navigate('OrderDetail')}>
      <View style={{ ...styles.row }}>
        <Image
          size={50}
          tintColor={'orange'}
          source={require('../../assets/images/outline_inventory_black_24dp.png')}
        />
        <View
          style={{
            ...styles.column,
            flex: 1,
            marginLeft: 10,
            alignItems: 'flex-start',
          }}>
          <Text
            style={{
              fontWeight: '700',
            }}>
            ID: {item.id}
          </Text>
          <Text style={{ color: 'orange', fontWeight: '700' }}>
            {check[index] === false ? 'Đang vận chuyển' : 'Đã nhận'}
          </Text>
        </View>
        <CheckBox
          checked={check[index]}
          onIconPress={() => {
            setCheck(
              check.map((item, key) => {
                return key === index ? !item : item;
              }),
            );
          }}
        />
      </View>
      <View style={{ paddingLeft: 5 }}>
        <Text style={{ fontWeight: '700', color: 'gray' }}>Đến</Text>
        <Text style={{ fontWeight: '700' }}>
          {item.to_address.street}, {item.to_address.ward},{' '}
          {item.to_address.province}, {item.to_address.city}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text h4>Danh sách vận chuyển</Text>
        <Avatar
          rounded
          size="small"
          source={img}
          onPress={() => navigation.navigate('Setting')}
        />
      </View>

      {/* <ButtonSwitch /> */}

      {data.length > 0 && (
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => `${item.id}`}
        />
      )}

      {data.length == 0 && <Loading />}
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
    alignItems: 'center',
  },
  column: {
    flexWrap: 'nowrap',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
