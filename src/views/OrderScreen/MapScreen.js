import React, { useRef, useState, useEffect } from 'react';
import Geolocation from '@react-native-community/geolocation';
import { GOOGLE_MAPS_API_KEY } from '@env';
import MapViewDirections from 'react-native-maps-directions';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 10.8231;
const LONGITUDE = 106.6297;
const DELTA = {
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0922 * ASPECT_RATIO,
};

const MapScreen = ({ navigation, route }) => {
  const { destination } = route.params;
  const [origin, setOrigin] = useState(null);
  const [currentCoord, setCurrentCoord] = useState({});
  const mapRef = useRef(null);

  useEffect(() => {
    Geolocation.getCurrentPosition(
      info => setOrigin(info.coords),
      err => console.log(err),
      { timeout: 5000, maximumAge: 5000, enableHighAccuracy: true },
    );
  }, []);

  useEffect(() => {
    if (currentCoord) {
      mapRef.current.animateCamera(
        {
          center: currentCoord,
          heading: currentCoord.heading,
          altitude: currentCoord.altitude,
          zoom: 16,
        },
        { duration: 1000 },
      );
    }
  }, [currentCoord]);

  const isCoordChanged = newCoord => {
    return (
      currentCoord.latitude !== newCoord.latitude ||
      currentCoord.longitude !== newCoord.longitude
    );
  };

  return (
    <MapView
      ref={mapRef}
      style={styles.map}
      initialRegion={{
        latitude: LATITUDE,
        longitude: LONGITUDE,
        ...DELTA,
      }}
      userLocationFastestInterval={5000}
      onUserLocationChange={e => {
        const newCoord = e.nativeEvent.coordinate;
        if (isCoordChanged(newCoord)) {
          setCurrentCoord(newCoord);
        }
      }}
      showsUserLocation={true}
      followsUserLocation={true}>
      {/* Map direction */}
      {origin && (
        <MapViewDirections
          region={'VI'}
          origin={origin}
          destination={destination}
          mode={'DRIVING'}
          timePrecision={'now'}
          apikey={GOOGLE_MAPS_API_KEY}
          channel={'Driver'}
          strokeWidth={4}
          strokeColor={'#1a73e8'}
        />
      )}

      {/* Map marker */}
      {destination && (
        <Marker
          coordinate={{
            latitude: destination.latitude,
            longitude: destination.longitude,
          }}
          title={'Destination'}
          identifier={'destination'}
        />
      )}
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default MapScreen;
