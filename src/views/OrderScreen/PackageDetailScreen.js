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
import Loading from '../../components/Loading';

const PackageDetailScreen = ({ navigation, route }) => {
  const { packageId } = route.params;
  const [data, setData] = useState({
    len: 0,
    width: 0,
    height: 0,
    weight: 0,
    quantity: 1,
    package_type: 'Normal',
    images: null,
    name: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (packageId) {
      setLoading(true);
      shipmentApi
        .packageDetail(packageId)
        .then(response => {
          console.log(JSON.stringify(response));
          setData(response);
          setLoading(false);
        })
        .catch(error => {
          console.log(error);
          setLoading(false);
        });
    }
  }, []);

  return (
    <SafeAreaView style={[STYLES.container]}>
      {loading && <Loading />}

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
              <Text style={{ flex: 1 }}>ID: {packageId}</Text>
              <Text style={{ flex: 1 }}>Tên kiện hàng: {data.name}</Text>
            </View>
          </View>
        </View>

        {/* <Divider style={styles.divider} color={COLORS.primary} width={2} /> */}
        <View style={[STYLES.column]}>
          <View style={[STYLES.row, STYLES.subContainer]}>
            <InfoField
              style={{ flex: 1 }}
              title="Chiều dài"
              content={data.len + ' cm'}
            />
            <InfoField
              style={{ flex: 1 }}
              title="Chiều rộng"
              content={data.width + ' cm'}
            />
          </View>
          <View style={[STYLES.row, STYLES.subContainer]}>
            <InfoField
              style={{ flex: 1 }}
              title="Chiều cao"
              content={data.height + ' cm'}
            />
            <InfoField
              style={{ flex: 1 }}
              title="Khối lượng"
              content={`${data.quantity * data.weight} kg`}
            />
          </View>
          <View style={[STYLES.row, STYLES.subContainer]}>
            <InfoField
              style={{ flex: 1 }}
              title="Loại hàng hoá"
              content={data.package_type?.package_type}
            />
          </View>
          <View style={[STYLES.subContainer]}>
            <InfoField title="Hình ảnh xác nhận" />
          </View>
        </View>
      </View>
      {data.images && <PackageImage images={data.images} />}
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
