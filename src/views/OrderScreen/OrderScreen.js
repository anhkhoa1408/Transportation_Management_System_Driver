// Import Component
import React, { useState, useEffect } from 'react';
import { View, FlatList, RefreshControl, StyleSheet } from 'react-native';
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
        // Save Shipment's State
        resData.map(item => {
          if (!(item._id in shipmentState)) {
            updateShipmentState(item._id, false);
          }
        });
        setCurrentShipment(resData);
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
      isDone={!item.arrived_time && shipmentState[item._id]?.checked}
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
      <View style={{ paddingHorizontal: 15, height: 62 }}>
        <Tab
          value={index}
          onChange={e => setIndex(e)}
          indicatorStyle={{
            height: 0,
          }}>
          <Tab.Item
            title="Đơn hiện tại"
            titleStyle={{ fontSize: 12, color: COLORS.primary }}
            containerStyle={{
              backgroundColor: COLORS.gray,
              borderTopLeftRadius: 20,
              borderBottomLeftRadius: 20,
            }}
            buttonStyle={[
              { padding: 3 },
              index === 0 ? [styles.activeTab] : [styles.inactiveTab],
            ]}
          />
          <Tab.Item
            title="Đã vận chuyển"
            titleStyle={{ fontSize: 12, color: COLORS.primary }}
            containerStyle={[
              {
                backgroundColor: COLORS.gray,
                borderTopRightRadius: 20,
                borderBottomRightRadius: 20,
              },
            ]}
            buttonStyle={[
              { padding: 3 },
              index === 1 ? [styles.activeTab] : [styles.inactiveTab],
            ]}
          />
        </Tab>
      </View>

      {/* List display shipments */}
      <TabView value={index} onChange={setIndex} animationType="spring">
        <TabView.Item
          onMoveShouldSetResponder={e => e.stopPropagation()}
          style={{ width: '100%', paddingTop: 10 }}>
          <FlatList
            data={currentShipment}
            renderItem={renderItem}
            keyExtractor={item => `${item._id}`}
            onRefresh={() => updateCurrentShipment(origin)}
            refreshing={refreshingC}
          />
        </TabView.Item>
        <TabView.Item
          onMoveShouldSetResponder={e => e.stopPropagation()}
          style={{ width: '100%', paddingTop: 10 }}>
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

const styles = StyleSheet.create({
  activeTab: {
    backgroundColor: COLORS.white,
    margin: 8,
    marginHorizontal: 5,
    borderRadius: 16,
  },
  inactiveTab: {
    backgroundColor: '#F1F1FA',
    margin: 8,
    marginHorizontal: 5,
  },
});

const mapStateToProps = state => ({
  shipmentState: state.shipmentState,
});

export default connect(mapStateToProps)(OrderScreen);
