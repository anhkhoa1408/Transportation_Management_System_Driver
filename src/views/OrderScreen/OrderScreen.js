// Import Component
import React, { useState, useEffect } from 'react';
import { View, FlatList, RefreshControl } from 'react-native';
import { Tab, Text, TabView } from 'react-native-elements';
import Header from '../../components/Header';
import ShipmentItem from './components/ShipmentItem';
// Import Function
import shipmentApi from '../../api/shipmentAPI';
import { connect } from 'react-redux';
import { useDispatch } from 'react-redux';
import { saveShipmentState } from '../../actions/actions';
import Geolocation from '@react-native-community/geolocation';
// Import Asset
import { COLORS, FONTS, STYLES } from '../../styles';

function OrderScreen({ navigation, ...props }) {
  const [currentShipment, setCurrentShipment] = useState([]);
  const [finishedShipment, setFinishedShipment] = useState([]);
  const [refreshingC, setRefreshingC] = useState(true);
  const [refreshingF, setRefreshingF] = useState(true);
  const [isLoading, setLoading] = useState(false); // is getting finished shipments
  const [pageIndex, setPageIndex] = useState(1); // 10 finished shipments per page
  const [index, setIndex] = useState(0); // Tab index
  const [origin, setOrigin] = React.useState(null);

  React.useEffect(() => {
    Geolocation.getCurrentPosition(
      info => {
        setOrigin(info.coords);
        updateCurrentShipment(info.coords);
      },
      err => console.log(err),
      { timeout: 5000, maximumAge: 5000, enableHighAccuracy: true },
    );
  }, []);

  const { shipmentState } = props; // whether driver checked a shipment or not
  const dispatch = useDispatch();

  // Load both current and unfinish shipments on first render
  useEffect(() => {
    setRefreshingC(true);
    setRefreshingF(true);
    updateCurrentShipment(origin);
    updateFinishedShipment();
  }, []);

  const updateCurrentShipment = coord => {
    shipmentApi
      .currentShipment(coord)
      .then(resData => {
        setCurrentShipment(resData);

        // Save Shipment's State
        resData.map(item => {
          if (!(item._id in shipmentState)) {
            updateShipmentState(item._id, false);
          }
        });
        setRefreshingC(false);
      })
      .catch(err => {
        setRefreshingC(false);
      });
  };

  const updateFinishedShipment = () => {
    shipmentApi
      .finishedShipment()
      .then(resData => {
        setFinishedShipment(resData);
        setRefreshingF(false);
      })
      .catch(err => {
        setRefreshingF(false);
      });
  };

  const updateShipmentState = (id, state) => {
    dispatch(
      saveShipmentState({
        ...shipmentState,
        [id]: {
          checked: state,
          time: new Date().toDateString(),
        },
      }),
    );
  };

  const renderItem = ({ item, index }) => (
    <ShipmentItem
      item={item}
      isDone={!item.arrived_time && shipmentState[item._id].checked}
      onPress={() =>
        navigation.navigate('OrderDetail', {
          shipmentID: item._id,
          isDone: item.arrived_time,
        })
      }
      navigation={navigation}
      checkBoxHandler={updateShipmentState}
    />
  );

  const handleLoadMore = () => {
    if (isLoading) return;
    setLoading(true);
    shipmentApi
      .finishedShipment(pageIndex)
      .then(resData => {
        if (resData.length !== 0) setPageIndex(pageIndex + 1);
        setFinishedShipment([...finishedShipment, ...resData]);
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
      });
  };

  return (
    <View style={STYLES.container}>
      <Header headerText={'Đơn vận chuyển'} />

      {/* Tab separate Current and Finished shipments */}
      <Tab
        value={index}
        onChange={e => setIndex(e)}
        indicatorStyle={{
          backgroundColor: COLORS.primary,
          height: 5,
        }}
        variant="primary">
        <Tab.Item
          title="Đơn hàng hiện tại"
          containerStyle={{ backgroundColor: 'white' }}
          titleStyle={{ ...FONTS.Smol, color: COLORS.green }}
          icon={{
            name: 'local-shipping',
            color: COLORS.green,
          }}
        />
        <Tab.Item
          title="Lịch sử đơn hàng"
          containerStyle={{ backgroundColor: 'white' }}
          titleStyle={{ ...FONTS.Smol, color: COLORS.primary }}
          icon={{ name: 'timer', type: 'ionicon', color: COLORS.primary }}
        />
      </Tab>

      {/* List display shipments */}
      <TabView value={index} onChange={setIndex} animationType="spring">
        <TabView.Item style={{ width: '100%', paddingTop: 10 }}>
          <FlatList
            data={currentShipment}
            renderItem={renderItem}
            keyExtractor={item => `${item._id}`}
            onRefresh={() => updateCurrentShipment()}
            refreshing={refreshingC}
          />
        </TabView.Item>
        <TabView.Item style={{ width: '100%', paddingTop: 10 }}>
          <FlatList
            data={finishedShipment}
            renderItem={renderItem}
            keyExtractor={item => `${item._id}`}
            onEndReached={handleLoadMore}
            onRefresh={() => updateFinishedShipment()}
            refreshing={refreshingF}
          />
        </TabView.Item>
      </TabView>
    </View>
  );
}

const mapStateToProps = state => ({
  shipmentState: state.shipmentState,
});

export default connect(mapStateToProps)(OrderScreen);
