import React, { useState, useEffect } from 'react';
import { View, FlatList } from 'react-native';
import shipmentApi from '../../api/shipmentAPI';
import { STYLES } from '../../styles';
import Loading from '../../components/Loading';
import Header from '../../components/Header';
import ShipmentItem from './components/ShipmentItem';

export default function OrderScreen({ navigation }) {
  const [data, setData] = useState([]);
  const [check, setCheck] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      shipmentApi
        .shipment()
        .then(resData => {
          setData(resData);
          setCheck(data.map(item => 'arrived_time' in item));
          setLoaded(true);
        })
        .catch(err => {
          setData([]);
          setCheck(data.map(item => 'arrived_time' in item));
          setLoaded(true);
        });
    });
    return unsubscribe;
  }, [navigation]);

  const renderItem = ({ item, index }) => (
    <ShipmentItem navigation={navigation} item={item} isDone={check[index]} />
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
