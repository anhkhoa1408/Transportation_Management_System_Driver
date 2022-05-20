import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

import { COLORS, FONTS, STYLES } from '../../../styles';
import PackageImage from '../../../assets/images/package.png';
import { ListItem, Button, Icon } from 'react-native-elements';
import { joinAddress } from '../../../utils/addressUltis';

const PackageItem = ({ item, navigation, isDone, shipment, type }) => {
  return (
    <ListItem.Swipeable
      bottomDivider
      rightContent={
        !isDone && (
          <Button
            title={`${type} hàng`}
            icon={{ name: 'camera', color: 'white' }}
            buttonStyle={{
              backgroundColor: COLORS.header,
              minHeight: '100%',
            }}
            onPress={() =>
              navigation.navigate('ConfirmOrder', {
                packageId: item.id,
                packageImage: item.images,
                shipment: shipment,
                current: item.received,
              })
            }
          />
        )
      }
      leftContent={
        <Button
          title="Chi tiết"
          icon={{ name: 'info', color: 'white' }}
          buttonStyle={{
            backgroundColor: COLORS.success,
            minHeight: '100%',
          }}
          onPress={() =>
            navigation.navigate('PackageDetail', {
              item: item,
            })
          }
        />
      }
      containerStyle={{
        ...STYLES.shadowCard,
        padding: 30,
        backgroundColor: COLORS.white,
        position: 'relative',
      }}>
      <ListItem.Content style={{ ...STYLES.row }}>
        <View
          style={{
            backgroundColor: COLORS.white,
            padding: 12,
            borderRadius: 15,
            elevation: 3,
          }}>
          <Icon name="inventory" size={28} color={COLORS.primary} />
        </View>
        <View
          style={{
            ...STYLES.column,
            flex: 1,
            marginLeft: 20,
          }}>
          <Text style={{ ...FONTS.Big }}>
            {item.name ? item.name : item.id}
          </Text>
          <Text style={{ ...FONTS.Smol }}>
            Số lượng: <Text style={{ ...FONTS.SmolBold }}>{item.quantity}</Text>
          </Text>
          {type && item.received >= 0 && (
            <Text style={{ ...FONTS.Smol }}>
              Đã {type.toLowerCase()}:{' '}
              <Text style={{ ...FONTS.SmolBold }}>{item.received}</Text>
            </Text>
          )}
          {type && item.need_received >= 0 && (
            <Text style={{ ...FONTS.Smol }}>
              Cần {type.toLowerCase()}:{' '}
              <Text style={{ ...FONTS.SmolBold }}>{item.need_received}</Text>
            </Text>
          )}
        </View>
      </ListItem.Content>
    </ListItem.Swipeable>
  );
};

export default PackageItem;
