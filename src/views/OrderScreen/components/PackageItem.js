import React from 'react';
import { View, Text, Image } from 'react-native';

import { COLORS, FONTS, STYLES } from '../../../styles';
import PackageImage from '../../../assets/images/package.png';
import { ListItem, Button, Icon } from 'react-native-elements';
import { simplifyString } from '../../../utils/simplifyString';

const PackageItem = ({ item, navigation }) => {
  return (
    <ListItem.Swipeable
      bottomDivider
      rightContent={
        <Button
          title="Chụp ảnh"
          icon={{ name: 'camera', color: 'white' }}
          buttonStyle={{
            backgroundColor: COLORS.header,
            minHeight: '100%',
          }}
          onPress={() =>
            navigation.navigate('ConfirmOrder', {
              packageId: item.id,
              packageImage: item.images,
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
          <Text style={{ ...FONTS.Big }}>ID: {item.id}</Text>
          <Text style={{ ...FONTS.Smol }}>
            Số lượng: <Text style={{ ...FONTS.SmolBold }}>{item.quantity}</Text>
          </Text>
          <Text style={{ ...FONTS.Smol }}>
            Địa điểm hiện tại:{' '}
            <Text style={[FONTS.SmolBold]}>
              {item.current_address
                ? simplifyString(
                    Object.values(item.current_address).slice(1, 5).join(', '),
                    20,
                  )
                : 'Chưa có thông tin'}
            </Text>
          </Text>
        </View>
      </ListItem.Content>
    </ListItem.Swipeable>
  );
};

export default PackageItem;
