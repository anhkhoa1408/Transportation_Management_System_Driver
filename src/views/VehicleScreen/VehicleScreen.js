import React from 'react';
import { View, StyleSheet } from 'react-native';
import img from './../../assets/images/download.jpg';
import { Avatar, Icon, Text, Card } from 'react-native-elements';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { container, header } from '../../styles/layoutStyle';
import { primaryColor } from '../../styles/color';

const VehicleScreen = () => {
  return (
    <View style={vehicleStyle.container}>
      <View style={vehicleStyle.header}>
				{/* <TouchableHighlight>
          <Icon
            name="west"
            size={30}
            onPress={() => navigation.goBack()}
						type="material"
          />
				</TouchableHighlight> */}
        <Text h4 style={vehicleStyle.headerFont}>Thông tin phương tiện</Text>
        {/* <Avatar rounded size="small" source={img} /> */}
      </View>
			
			<Card>

			</Card>

			<Card>

			</Card>

    </View>
  );
};

const vehicleStyle = StyleSheet.create({
	container: {
		...container
	},
	header: {
		...header,
		justifyContent: 'center',
		height: '40%',
		backgroundColor: primaryColor,
		marginTop: 0,
		alignItems: 'flex-start',
	},
	headerFont: {
		color: '#FFF',
		marginTop: 40
	}
})

export default VehicleScreen;
