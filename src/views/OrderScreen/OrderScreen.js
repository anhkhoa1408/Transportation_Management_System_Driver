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
          let tempShipmentState = shipmentState;
          resData.map(item => {
            if (!(item.id in tempShipmentState)) {
              tempShipmentState = {
                ...tempShipmentState,
                [item.id]: {
                  checked: false,
                  time: new Date(),
                },
              };
            }
          });
          dispatch(saveShipmentState(tempShipmentState));
          setLoaded(true);
        })
        .catch(err => {
          // Handle Error
          // setLoaded(true);
        });
    });
    return unsubscribe;
  }, [navigation]);

  const renderItem = ({ item, index }) => (
    <ShipmentItem
      navigation={navigation}
      item={item}
      isDone={shipmentState[item.id].checked}
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
