// Component
import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
// Function
import { joinAddress } from '../../../utils/addressUltis';
// Asset
import OrderImage from '../../../assets/images/outline_inventory_black_24dp.png';
import { COLORS, FONTS, STYLES } from '../../../styles';

// Function get Color and Text of shipment item
function getItemState(item, isDone) {
  // TODO: Insert check giao hay nhan hang
  const itemState = {
    init: {
      color: 'orange',
      text: 'Đang vận chuyển',
    },
    process: {
      color: COLORS.green,
      text: 'Đã nhận',
    },
    done: {
      color: COLORS.primary,
      text: 'Đã hoàn thành',
    },
  };
  if (!item.arrived_time) {
    if (isDone) return itemState.process;
    else return itemState.init;
  }
  return itemState.done;
}

export default function ShipmentItem({
  item,
  isDone,
  checkBoxHandler,
  onPress,
}) {
  const currentState = getItemState(item, isDone);
  return (
    <TouchableOpacity
      style={{
        ...STYLES.subContainer,
        ...STYLES.shadowCard,
        padding: 20,
        borderRadius: 12,
        backgroundColor: COLORS.white,
      }}
      onPress={() => onPress()}>
      <View style={{ ...STYLES.row }}>
        <Image size={50} tintColor={currentState.color} source={OrderImage} />
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
              color: currentState.color,
            }}>
            {currentState.text}
          </Text>
        </View>
        {!item.arrived_time && (
          <CheckBox
            disabled={false}
            value={isDone}
            onValueChange={newValue => {
              checkBoxHandler(item.id, newValue);
            }}
          />
        )}
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
