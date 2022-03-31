import React, { useState, useEffect } from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Icon, CheckBox, Avatar, Text, Divider } from 'react-native-elements';
import { COLORS, FONTS, STYLES } from '../../styles';
import img from '../../assets/images/download.jpg';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Header from '../../components/Header';
import { joinAddress } from '../../utils/addressUltis';
import PackageItem from './components/PackageItem';
import InfoField from '../../components/InfoField';
import shipmentApi from '../../api/shipmentAPI';
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
            backgroundColor: COLORS.white,
            elevation: 3,
            padding: 20,
            marginBottom: 10,
            borderRadius: 15,
          }}>
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
            <View
              style={{
                backgroundColor: COLORS.primary,
                padding: 5,
                borderRadius: 15,
                marginRight: 20,
              }}>
              <Icon
                reverse
                size={15}
                name="inventory"
                color={COLORS.white}
                reverseColor={COLORS.primary}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ flex: 1 }}>ID: {item.id}</Text>
              <Text style={{ flex: 1 }}>
                Tên kiện hàng: {item.name ? item.name : 'Không có'}
              </Text>
            </View>
          </View>
        </View>

        <View style={[STYLES.column]}>
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
          <View style={[STYLES.subContainer]}>
            <InfoField title="Hình ảnh xác nhận" />
          </View>
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
});
