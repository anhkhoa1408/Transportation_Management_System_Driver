import React from 'react';
import MapView, { Polyline } from 'react-native-maps';
import { StyleSheet } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import MapViewDirections from 'react-native-maps-directions';
import { getDistanceFromCordinateInKm } from '../../utils/addressUltis';
import { GOOGLE_MAPS_API_KEY } from '@env';

export default function Notification(props) {
  React.useEffect(() => {
    // Geolocation.getCurrentPosition(
    //   info => console.log(info),
    //   () => {},
    //   { timeout: 60000, maximumAge: 60000, enableHighAccuracy: true },
    // );
  }, []);

  const [region, setRegion] = React.useState({
    latitude: 37.8025259,
    longitude: -122.4351431,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const onRegionChange = region => {
    setRegion({ region });
  };
  const origin = { latitude: 37.3318456, longitude: -122.0296002 };
  const destination = { latitude: 37.771707, longitude: -122.4053769 };
  return (
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}>
      <MapViewDirections
        // region={'VI'}
        origin={origin}
        destination={destination}
        mode={'DRIVING'}
        timePrecision={'now'}
        apikey={GOOGLE_MAPS_API_KEY}
        channel={'Driver'}
        strokeWidth={3}
        strokeColor={'#1a73e8'}
      />
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%',
  },
});
