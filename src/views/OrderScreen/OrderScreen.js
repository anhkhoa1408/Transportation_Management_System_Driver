// Import Component
import React, { useState, useEffect } from 'react';
import { View, FlatList } from 'react-native';
import Loading from '../../components/Loading';
import Header from '../../components/Header';
import ShipmentItem from './components/ShipmentItem';
// Import Function
import shipmentApi from '../../api/shipmentAPI';
import { connect } from 'react-redux';
import { useDispatch } from 'react-redux';
import { saveShipmentState } from '../../actions/actions';
// Import Asset
import { STYLES } from '../../styles';

function OrderScreen({ navigation, ...props }) {
  const [data, setData] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const { shipmentState } = props;
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      shipmentApi
        .shipment()
        .then(resData => {
          setData(resData);

          // Save Shipment's State
          resData.map(item => {
            if (!(item.id in shipmentState)) {
              dispatch(
                saveShipmentState({
                  ...shipmentState,
                  [item.id]: {
                    checked: false,
                    time: new Date().toDateString(),
                  },
                }),
              );
            }
          });
          setLoaded(true);
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
          time: shipmentState[id].time,
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

  return (
    <View style={STYLES.container}>
      <Header headerText={'Đơn vận chuyển'} />

      {loaded && (
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => `${item.id}`}
        />
      )}

      {!loaded && <Loading />}
    </View>
  );
}

const mapStateToProps = state => ({
  shipmentState: state.shipmentState,
});

export default connect(mapStateToProps)(OrderScreen);
