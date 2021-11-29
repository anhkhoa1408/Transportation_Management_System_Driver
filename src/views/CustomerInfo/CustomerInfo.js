import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Avatar, Card, Text } from 'react-native-elements';
import { container, header } from '../../styles/layoutStyle';
import banner from '../../assets/images/download.jpg';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

const CustomerInfo = ({ navigation }) => {
  return (
    <View style={customerInfoStyle.container}>
      <View style={customerInfoStyle.header}>
        <MaterialIcon
          name="west"
          size={30}
          style={{ alignSelf: 'flex-start', color: '#FFF' }}
          onPress={() => navigation.goBack()}
        />
        <View
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Card containerStyle={{ borderRadius: 100, padding: 5 }}>
            <Avatar size="xlarge" rounded source={banner} />
          </Card>
          <Text h4 style={{ color: '#FFF', fontSize: 40, marginVertical: 20 }}>
            Nguyen Anh Khoa
          </Text>
        </View>
      </View>

      <Card containerStyle={customerInfoStyle.infoContainer}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingVertical: 25,
            paddingHorizontal: 20,
          }}
        >
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <MaterialIcon
              name="email"
              style={{ ...customerInfoStyle.icon, color: '#fc653f' }}
            />
            <Text>Email</Text>
          </View>
          <Text>akhoa981@gmail.com</Text>
        </View>

        {/* <Card.Divider /> */}

        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingVertical: 25,
            paddingHorizontal: 20,
          }}
        >
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <MaterialIcon
              name="phone"
              style={{ ...customerInfoStyle.icon, color: '#428bff' }}
            />
            <Text>Phone number</Text>
          </View>
          <Text>akhoa981@gmail.com</Text>
        </View>

        {/* <Card.Divider /> */}

        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingVertical: 25,
            paddingHorizontal: 20,
          }}
        >
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <MaterialIcon
              name="home"
              style={{ ...customerInfoStyle.icon, color: '#3cc732' }}
            />
            <Text>Address</Text>
          </View>
          <Text>akhoa981@gmail.com</Text>
        </View>
      </Card>
    </View>
  );
};

const customerInfoStyle = StyleSheet.create({
  container: {
    ...container,
  },
  header: {
    ...header,
    height: '45%',
    backgroundColor: '#7FC3DC',
    justifyContent: 'center',
    flexDirection: 'column',
    marginTop: 0,
    marginBottom: 0,
    paddingHorizontal: 20,
  },
  infoContainer: {
    width: '100%',
    height: '100%',
    margin: 0,
    padding: 10,
  },
  icon: {
    fontSize: 30,
    color: 'rgba(0, 0, 0, 0.5)',
    marginRight: 15,
  },
});

export default CustomerInfo;
