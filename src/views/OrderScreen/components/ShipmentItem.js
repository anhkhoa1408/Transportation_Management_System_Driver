// Component
import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
// Function
import { joinAddress } from '../../../utils/addressUltis';
// Asset
import OrderImage from '../../../assets/images/outline_inventory_black_24dp.png';
import { COLORS, FONTS, STYLES } from '../../../styles';

export default function ShipmentItem({
  item,
  isDone,
  checkBoxHandler,
  onPress,
}) {
  return (
    <TouchableOpacity
      style={{
        ...STYLES.subContainer,
        ...STYLES.shadowCard,
        borderRadius: 12,
        backgroundColor: COLORS.white,
      }}
      onPress={() => onPress()}>
      <View style={{ ...STYLES.row }}>
        <Image
          size={50}
          tintColor={isDone === false ? 'orange' : COLORS.green}
          source={OrderImage}
        />
        <View
          style={{
            ...STYLES.column,
            flex: 1,
            marginLeft: 10,
            alignItems: 'flex-start',
          }}>
          <Text style={{ ...FONTS.MediumBold }}>ID: {item.id}</Text>
          <Text
            style={{
              ...FONTS.MediumBold,
              color: isDone === false ? 'orange' : COLORS.green,
            }}>
            {isDone === false ? 'Đang vận chuyển' : 'Đã nhận'}
          </Text>
        </View>
        <CheckBox
          disabled={false}
          value={isDone}
          onValueChange={newValue => {
            checkBoxHandler(item.id, newValue);
          }}
        />
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
