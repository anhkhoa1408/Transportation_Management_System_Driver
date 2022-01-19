import { View, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import OrderImage from '../../../assets/images/outline_inventory_black_24dp.png';
import { COLORS, FONTS, STYLES } from '../../../styles';
import { joinAddress } from '../../../utils/addressUltis';

export default function ShipmentItem({ navigation, item, isDone }) {
  return (
    <TouchableOpacity
      style={{
        ...STYLES.subContainer,
        ...STYLES.shadowCard,
        borderRadius: 12,
        backgroundColor: COLORS.white,
      }}
      onPress={() => navigation.navigate('OrderDetail')}>
      <View style={{ ...STYLES.row }}>
        <Image size={50} tintColor={'orange'} source={OrderImage} />
        <View
          style={{
            ...STYLES.column,
            flex: 1,
            marginLeft: 10,
            alignItems: 'flex-start',
          }}>
          <Text style={{ ...FONTS.MediumBold }}>ID: {item.id}</Text>
          <Text style={{ ...FONTS.MediumBold, color: 'orange' }}>
            {isDone === true ? 'Đang vận chuyển' : 'Đã nhận'}
          </Text>
        </View>
      </View>
      <View style={{ paddingLeft: 5 }}>
        <Text style={{ ...FONTS.Medium, color: 'gray' }}>Đến</Text>
        <Text style={{ ...FONTS.MediumBold }}>
          {joinAddress(item.to_address)}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
