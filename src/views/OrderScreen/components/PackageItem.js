import React from 'react';
import { View, Text, Image } from 'react-native';

import { COLORS, FONTS, STYLES } from '../../../styles';
import PackageImage from '../../../assets/images/package.png';

const PackageItem = ({ item }) => {
  return (
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
            height: 40,
            width: 40,
            marginTop: 10,
          }}
          source={PackageImage}
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
};

export default PackageItem;
