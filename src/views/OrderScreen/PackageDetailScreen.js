import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { Icon, Text } from 'react-native-elements';
import Header from '../../components/Header';
import InfoField from '../../components/InfoField';
import { COLORS, STYLES } from '../../styles';
import PackageImage from './components/PackageImage';

const PackageDetailScreen = ({ navigation, route }) => {
  const { item } = route.params;

  return (
    <SafeAreaView style={[STYLES.container]}>
      <Header
        leftElement={
          <Icon name="west" size={30} onPress={() => navigation.goBack()} />
        }
        headerText={'Chi tiết kiện hàng'}
      />

      <View style={{ paddingHorizontal: 20 }}>
        <View
          style={{
            ...STYLES.row,
            paddingTop: 10,
            paddingBottom: 15,
            alignItems: 'center',
          }}>
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
            <View
              style={{
                backgroundColor: COLORS.white,
                padding: 12,
                borderRadius: 8,
                elevation: 12,
                shadowColor: COLORS.primary,
                marginRight: 10
              }}>
              <View>
                <Icon
                  name="inventory"
                  color={COLORS.primary}
                />
              </View>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ flex: 1 }}>
                Tên kiện hàng: {item.name ? item.name : 'Không có'}
              </Text>
              <Text style={{ flex: 1 }}>{item.id}</Text>
            </View>
          </View>
        </View>

        <View style={[STYLES.column, styles.info]}>
          <View style={[STYLES.row, STYLES.subContainer]}>
            <InfoField
              style={{ flex: 1 }}
              title="Chiều dài"
              content={item.size.len + ' cm'}
            />
            <InfoField
              style={{ flex: 1 }}
              title="Chiều rộng"
              content={item.size.width + ' cm'}
            />
          </View>
          <View style={[STYLES.row, STYLES.subContainer]}>
            <InfoField
              style={{ flex: 1 }}
              title="Chiều cao"
              content={item.size.height + ' cm'}
            />
            <InfoField
              style={{ flex: 1 }}
              title="Khối lượng"
              content={`${item.weight} kg`}
            />
          </View>
          <View style={[STYLES.row, STYLES.subContainer]}>
            <InfoField
              style={{ flex: 1 }}
              title="Loại hàng hoá"
              content={item.package_type}
            />
          </View>
        </View>
        <View style={[STYLES.subContainer]}>
          <InfoField
            title="Hình ảnh xác nhận"
            content={item.images.length === 0 ? 'Chưa có' : ''}
          />
        </View>
      </View>
      {item.images && <PackageImage images={item.images} />}
    </SafeAreaView>
  );
};

export default PackageDetailScreen;

const styles = StyleSheet.create({
  divider: {
    color: COLORS.primary,
    marginBottom: 15,
    marginHorizontal: '10%',
  },
  info: { backgroundColor: COLORS.gray, borderRadius: 8, paddingVertical: 15 },
});
