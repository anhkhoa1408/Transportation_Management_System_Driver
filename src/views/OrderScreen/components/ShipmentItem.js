// Component
import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { Icon } from 'react-native-elements';
// Function
import {
  joinAddress,
  getDistanceFromCordinateInKm,
} from '../../../utils/addressUltis';
import Geolocation from '@react-native-community/geolocation';
// Asset
import OrderImage from '../../../assets/images/outline_inventory_black_24dp.png';
import { COLORS, FONTS, STYLES } from '../../../styles';

// Function get Color and Text of shipment item
function getItemState(item, isDone) {
  // TODO: Insert check giao hay nhan hang
  const itemState = {
    init: {
      color: 'gray',
      text: 'Chưa được nhận',
    },
    accept: {
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
  if (!item.driver) return itemState.init;
  if (!item.arrived_time) {
    if (isDone) return itemState.process;
    else return itemState.accept;
  }
  return itemState.done;
}

function getItemDestination(item) {
  if (item.from_address?.latitude && item.from_address?.longitude)
    return {
      latitude: item.from_address.latitude,
      longitude: item.from_address.longitude,
    };
  else return undefined;
}

function getItemDistance(item, origin) {
  const itemCoord = getItemDestination(item);
  if (itemCoord && origin) {
    const distance = getDistanceFromCordinateInKm(
      itemCoord.latitude,
      itemCoord.longitude,
      origin.latitude,
      origin.longitude,
    );
    return Number(distance).toFixed(2) + 'km';
  } else return 'Không xác định';
}

export default function ShipmentItem({
  item,
  isDone,
  checkBoxHandler,
  onPress,
  navigation,
}) {
  const [origin, setOrigin] = React.useState(null);

  React.useEffect(() => {
    Geolocation.getCurrentPosition(
      info => setOrigin(info.coords),
      err => console.log(err),
      { timeout: 5000, maximumAge: 5000, enableHighAccuracy: true },
    );
  }, []);

  const currentState = getItemState(item, isDone);
  return (
    <TouchableOpacity
      style={{
        ...STYLES.subContainer,
        ...STYLES.shadowCard,
        shadowColor: COLORS.primary,
        elevation: 12,
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
          <Text style={{ ...FONTS.MediumBold }}>{getAddressText(item)}</Text>
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
              checkBoxHandler(item._id, newValue);
            }}
          />
        )}
      </View>
      <View style={{ paddingLeft: 5, paddingTop: 5 }}>
        <View style={{ ...STYLES.row, justifyContent: 'space-between' }}>
          {!item.arrived_time && origin && (
            <Text style={{ ...FONTS.MediumBold, paddingTop: 5 }}>
              Cách vị trí hiện tại: {getItemDistance(item, origin)}
            </Text>
          )}
          {!item.arrived_time && (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('MapScreen', {
                  destination: getItemDestination(item),
                })
              }>
              <Icon name="directions" size={28} color={COLORS.map} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

function getAddressText(item) {
  if (item.from_storage && item.to_storage) {
    return `Chuyển hàng đến ${item.to_address.city}`;
  } else {
    const address = joinAddress(item.from_address, 'FIRST');
    return `Nhận hàng tại ${address}`;
  }
}
