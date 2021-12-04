import React from "react";
import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../../src/views/HomeScreen/HomeScreen";
import ChatScreen from "../../src/views/ChatScreen/ChatScreen";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { Icon } from "react-native-elements";
import CustomerInfo from "../views/CustomerInfo/CustomerInfo";
import MessageScreen from "../views/ChatScreen/MessageScreen";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { primaryColor } from "../styles/color";
import VehicleScreen from "../views/VehicleScreen/VehicleScreen";
import OrderDetailScreen from "../views/OrderScreen/OrderDetailScreen";
import OrderScreen from "../views/OrderScreen/OrderScreen";
import SignIn from "../views/AuthScreen/Signin";

const Tab = createMaterialBottomTabNavigator();

const TabNavigatior = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor={primaryColor}
      // inactiveColor="#AAA"
      barStyle={style.container}
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: style.container,
        tabBarLabelStyle: style.label,
        tabBarIcon: ({ focused, color }) => {
          let iconName;
          switch (route.name) {
            case "Vehicle":
              iconName = "local-shipping";
              break;
            case "Chat":
              iconName = "forum";
              break;
            case "Home":
              iconName = "dashboard";
              break;
            case "Order":
              iconName = "assignment";
              break;
            case "Setting":
              iconName = "settings";
          }

          return (
            <Icon name={iconName} size={23} color={color} type="material" />
          );
        },
        tabBarActiveTintColor: "#7FC3DC",
        tabBarInactiveTintColor: "#BBB",
      })}
    >
      <Tab.Screen name="Vehicle" component={VehicleScreen} />
      <Tab.Screen name="Chat" component={ChatScreen} />
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Order" component={CustomerInfo} />
      <Tab.Screen name="Setting" component={OrderScreen} />
    </Tab.Navigator>
  );
};

const style = StyleSheet.create({
  container: {
    // height: '10%',
    // height: '10%',
    padding: 20,
    backgroundColor: "#FFF",
  },
  label: {
    fontSize: 20,
    fontFamily: "Roboto",
  },
});

export default TabNavigatior;
