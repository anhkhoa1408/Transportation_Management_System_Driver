import React from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../../src/views/HomeScreen/HomeScreen';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Tab = createBottomTabNavigator();

const TabNavigatior = () => {
  return (
    <Tab.Navigator
			screenOptions={({ route }) => ({
				headerShown: false,
				tabBarStyle: style.container,
				tabBarLabelStyle: style.label,
				tabBarIcon: ({ focused, color, size }) => {
					let iconName;
					switch (route.name) {
						case 'Vehicle':
							iconName = 'home'
							break;
						case 'Chat':
							iconName = 'chat'
							break;
						case 'Home':
							iconName = 'home'
							break;
						case 'Order':
							iconName = 'assignment'
							break;
						case 'Setting':
							iconName = 'settings'
					}

					return <MaterialIcons name={iconName} size={30} color={color} />;
				},
				tabBarActiveTintColor: '#7FC3DC',
				tabBarInactiveTintColor: 'gray',
			})}
		>
      <Tab.Screen name="Vehicle" component={HomeScreen} />
			<Tab.Screen name="Chat" component={HomeScreen} />
      <Tab.Screen name="Home" component={HomeScreen} />
			<Tab.Screen name="Order" component={HomeScreen} />
			<Tab.Screen name="Setting" component={HomeScreen} />
    </Tab.Navigator>
  );
};

const style = StyleSheet.create({
	container: {
		height: '10%',
		display: 'flex',
		alignItems: 'center',
	},
	label: {
		fontSize: 13,
		fontFamily: 'Roboto',
		paddingBottom: 10,
	},
	
})

export default TabNavigatior;
