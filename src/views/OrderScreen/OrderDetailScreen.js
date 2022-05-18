import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Icon, CheckBox, Avatar, Text } from 'react-native-elements';
import { COLORS, FONTS, STYLES } from '../../styles';
import img from '../../assets/images/download.jpg';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Header from '../../components/Header';
import { joinAddress } from '../../utils/addressUltis';
import PackageItem from './components/PackageItem';
import InfoField from '../../components/InfoField';
import shipmentApi from '../../api/shipmentAPI';
import { socket } from '../../config/socketIO';
import { connect } from 'react-redux';
import PrimaryButton from '../../components/CustomButton/PrimaryButton';
import ModalMess from '../../components/ModalMess';

function OrderDetailScreen(props) {
  const [data, setData] = useState([]);
  const [meta, setMeta] = useState(null);
  const [alert, setAlert] = useState(null);

  const { userInfo, navigation, route } = props;

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      updateShipmentData();
    });
    return unsubscribe;
  }, [navigation]);

  const updateShipmentData = () => {
    if (route.params.shipmentID)
      shipmentApi
        .shipmentDetail(route.params.shipmentID)
        .then(response => {
          response.shipment_items.map(item => {
            const pkg = response.packages.find(
              _package => _package.id === item.package,
            );
            if (item.assmin) pkg.need_received = item.quantity;
            else pkg.received = item.quantity;
          });
          setData(response);
          if (response.from_storage && response.to_storage) {
            setMeta({
              address: response.to_address,
            });
          } else if (response.to_storage) {
            setMeta({
              name: response.sender_name,
              phone: response.sender_phone,
              address: response.to_address,
            });
          } else if (response.from_storage) {
            setMeta({
              name: response.receiver_name,
              phone: response.receiver_phone,
              address: response.to_address,
            });
          }
        })
        .catch(err => console.log(err));
  };

  const renderItem = ({ item, index }) => (
    <PackageItem
      item={item}
      navigation={navigation}
      isDone={route?.params?.isDone}
      shipment={route.params.shipmentID}
    />
  );

  const handleChatButton = () => {
    socket.emit('room', {
      senderId: userInfo.user.id,
      receiverId: data?.customer,
    });
    socket.once('room', (room, customer) => {
      navigation.navigate('MessageScreen', {
        room: room,
      });
    });
  };

  const acceptOrder = () => {
    shipmentApi
      .acceptOrder(route.params.shipmentID)
      .then(data => {
        setAlert({
          type: 'success',
          message: 'Đơn hàng đã được nhận!',
        });
        updateShipmentData();
      })
      .catch(err =>
        setAlert({
          type: 'warning',
          message: 'Nhận đơn hàng thất bại!',
        }),
      );
  };

  const finishShipment = () => {
    shipmentApi
      .finishShipment(data.id)
      .then(data => navigation.goBack())
      .catch(err => console.log(err));
  };

  return (
    // TODO: Show order price
    <View style={{ ...STYLES.container }}>
      <Header
        leftElement={
          <Icon name="west" size={30} onPress={() => navigation.goBack()} />
        }
        headerText={'Chi tiết đơn hàng'}
        rightElement={
          data.driver && (
            <Icon
              name="check"
              size={30}
              color={COLORS.primary}
              onPress={() => finishShipment()}
            />
          )
        }
      />

      {alert && (
        <ModalMess
          type={alert.type}
          message={alert.message}
          alert={alert}
          setAlert={setAlert}
        />
      )}

      <View style={{ flex: 1, backgroundColor: 'white' }}>
        {meta?.name && (
          <View
            style={{
              ...STYLES.row,
              ...STYLES.subContainer,
              padding: 0,
              paddingBottom: 20,
              ...styles.borderBottom,
            }}>
            <Avatar
              size="medium"
              avatarStyle={{ borderRadius: 10 }}
              source={img}
            />
            <View style={{ flex: 1 }}>
              <View style={{ ...STYLES.column, flex: 1, marginLeft: 20 }}>
                <Text>{meta?.name}</Text>
                <Text>SĐT: {meta?.phone}</Text>
              </View>
            </View>
            <View
              style={{
                backgroundColor: COLORS.white,
                padding: 12,
                borderRadius: 15,
                elevation: 5,
              }}>
              <TouchableOpacity onPress={handleChatButton}>
                <Icon
                  name="comment"
                  type="font-awesome"
                  color={COLORS.primary}
                />
              </TouchableOpacity>
            </View>
          </View>
        )}

        <View
          style={{
            ...STYLES.row,
            ...STYLES.subContainer,
            ...styles.borderBottom,
            paddingBottom: 18,
          }}>
          <InfoField
            title={'Địa chỉ'}
            style={{ flex: 1 }}
            content={data?.to_address && joinAddress(data.to_address)}
          />
          <InfoField
            title={'Khối lượng'}
            style={{ flex: 0.6 }}
            content={
              Array.isArray(data.packages) &&
              data.packages.reduce(
                (previous, current) =>
                  previous + current.weight * current.quantity,
                0,
              ) + ' Kg'
            }
          />
        </View>

        <FlatList
          data={data.packages}
          renderItem={renderItem}
          keyExtractor={item => `${item.id}`}
        />

        {!data.arrived_time && data.driver && (
          <PrimaryButton
            title="Thanh toán"
            backgroundColor={COLORS.header}
            containerStyle={{ margin: 20 }}
            onPress={() =>
              navigation.navigate('PaymentScreen', {
                name: meta?.name,
                phone: meta?.phone,
                fee: data.remain_fee,
                order: data.order_id,
              })
            }
          />
        )}
      </View>

      {meta && !data.driver && (
        <PrimaryButton
          title="Nhận đơn hàng"
          backgroundColor={COLORS.header}
          containerStyle={{ margin: 20 }}
          onPress={acceptOrder}
        />
      )}

      {/* !{data.length && (
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            height: 200,
          }}>
          <Text style={{ color: COLORS.primary, ...FONTS.header }}>
            No Record
          </Text>
        </View>
      )} */}
    </View>
  );
}

const styles = StyleSheet.create({
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.primary,
  },
});

const mapStateToProps = state => ({
  userInfo: state.userInfo,
});

export default connect(mapStateToProps)(OrderDetailScreen);
