// Import Component
import React, { useState, useEffect } from 'react';
import { View, FlatList } from 'react-native';
import { Tab, Text, TabView } from 'react-native-elements';
import Loading from '../../components/Loading';
import Header from '../../components/Header';
import ShipmentItem from './components/ShipmentItem';
// Import Function
import shipmentApi from '../../api/shipmentAPI';
import { connect } from 'react-redux';
import { useDispatch } from 'react-redux';
import { saveShipmentState } from '../../actions/actions';
// Import Asset
import { COLORS, FONTS, STYLES } from '../../styles';

function OrderScreen({ navigation, ...props }) {
  const [currentShipment, setCurrentShipment] = useState([]);
  const [finishedShipment, setFinishedShipment] = useState([]);
  const [loadedC, setLoadedC] = useState(false);
  const [loadedF, setLoadedF] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [pageIndex, setPageIndex] = useState(1);
  const [index, setIndex] = React.useState(0);

  const { shipmentState } = props;
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      shipmentApi
        .currentShipment()
        .then(resData => {
          setCurrentShipment(resData);

          // Save Shipment's State
          resData.map(item => {
            if (!(item.id in shipmentState)) {
              updateShipmentState(item.id, false);
            }
          });
          setLoadedC(true);
        })
        .catch(err => {
          // Handle Error
          // setLoaded(true);
        });
      shipmentApi
        .finishedShipment()
        .then(resData => {
          setFinishedShipment(resData);
          setLoadedF(true);
        })
        .catch(err => {
          // Handle Error
          // setLoaded(true);
        });
    });
    return unsubscribe;
  }, [navigation]);

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
      onPress={() =>
        navigation.navigate('OrderDetail', { shipmentID: item.id })
      }
      item={item}
      isDone={shipmentState[item.id].checked}
      checkBoxHandler={updateShipmentState}
    />
  );

  const renderFinishedItem = ({ item, index }) => (
    <ShipmentItem
      onPress={() =>
        navigation.navigate('OrderDetail', { shipmentID: item.id })
      }
      item={item}
    />
  );

  const handleLoadMore = () => {
    if (isLoading) return;
    setLoading(true);
    console.log('Load more! Load moreeee!');
    shipmentApi
      .finishedShipment(pageIndex)
      .then(resData => {
        if (resData.length !== 0) setPageIndex(pageIndex + 1);
        setFinishedShipment([...finishedShipment, ...resData]);
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
        // Handle Error
        // setLoaded(true);
      });
  };

  return (
    <View style={STYLES.container}>
      <Header headerText={'Đơn vận chuyển'} />

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

      <TabView value={index} onChange={setIndex} animationType="spring">
        <TabView.Item style={{ width: '100%', paddingTop: 10 }}>
          {loadedC && (
            <FlatList
              data={currentShipment}
              renderItem={renderItem}
              keyExtractor={item => `${item.id}`}
            />
          )}

          {/* {!loadedC && <Loading />} */}
        </TabView.Item>
        <TabView.Item style={{ width: '100%', paddingTop: 10 }}>
          {loadedF && (
            <FlatList
              data={finishedShipment}
              renderItem={renderFinishedItem}
              keyExtractor={item => `${item.id}`}
              onEndReached={handleLoadMore}
            />
          )}
        </TabView.Item>
      </TabView>
    </View>
  );
}

const mapStateToProps = state => ({
  shipmentState: state.shipmentState,
});

export default connect(mapStateToProps)(OrderScreen);
