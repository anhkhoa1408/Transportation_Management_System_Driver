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
  const [data, setData] = useState([]);

  useEffect(() => {
    if (route.params.shipmentID)
      shipmentApi.shipmentDetail(route.params.shipmentID).then(response => {
        setData(response);
      });
  }, []);

  const renderItem = ({ item, index }) => (
    <PackageItem item={item} navigation={navigation} />
  );

  return (
    <View style={{ ...STYLES.container }}>
      <Header
        leftElement={
          <Icon name="west" size={30} onPress={() => navigation.goBack()} />
        }
        headerText={'Chi tiết đơn hàng'}
      />

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
              <Text>{data.sender_name}</Text>
              <Text>SĐT: {data.sender_phone}</Text>
            </View>
          </View>
          <View
            style={{
              backgroundColor: COLORS.white,
              padding: 12,
              borderRadius: 15,
              elevation: 5,
            }}>
            <Icon name="comment" type="font-awesome" color={COLORS.primary} />
          </View>
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
              data && data.from_address && joinAddress(data.from_address)
            }
          />
          <InfoField
            title={'Khối lượng'}
            style={{ flex: 0.8 }}
            content={
              Array.isArray(data.packages) &&
              data.packages.reduce(
                (previous, current) =>
                  previous + current.weight * current.quantity,
                0,
              ) + ' Kg'
            }
          />
        </View>

        <FlatList
          data={data.packages}
          renderItem={renderItem}
          keyExtractor={item => `${item.id}`}
        />
      </View>

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
