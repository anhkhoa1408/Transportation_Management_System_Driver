import React, { useState } from 'react';
import { Image, StyleSheet, View, FlatList } from 'react-native';
import {
  Avatar,
  Card,
  ListItem,
  Icon,
  Text,
  withBadge,
  SpeedDial,
} from 'react-native-elements';
import img from './../../assets/images/camera.png';
import { header, shadowCard } from '../../styles/layoutStyle';

//
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';
//
export default function ConfirmOrder() {

  return (
<View style={messagesScreenStyle.container}>
      <View style={messagesScreenStyle.header}>
        <MaterialIcon 
          name="west"
          size={30}
          onPress={() => navigation.goBack()}
        />
        <Text h4>Chi tiết đơn</Text>
        <Avatar 
        />
      </View >
      
      <View style={messagesScreenStyle.body}>
      <Text style={messagesScreenStyle.test} >Hàng hoá</Text>
      <TouchableOpacity onPress={() => navigation.navigate('CustomerInfo')}>
      <Image 
          style={messagesScreenStyle.img}
          source={img} 
          
        />
      </TouchableOpacity>
      <Text style={messagesScreenStyle.test}>Biên bản</Text>
      <Image 
          style={messagesScreenStyle.img}
          source={img} 
          // onPress={() => navigation.navigate('CustomerInfo')}
        />
      </View>
      
      <View style={messagesScreenStyle.item3}>
        <View style={messagesScreenStyle.xacnhan}>
        <Text h4 style={messagesScreenStyle.text_xacnhan}>Xác Nhận</Text>
        </View>
      
      </View>
    </View>
  );
}


const messagesScreenStyle = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#FFF'
  },
  text_xacnhan:{
    // width: 156,
    // height: 53,
    // alignItems: 'center',
    // padding:0,
    // margin:0,
    // backgroundColor: '#3B3DBF'
    color: '#FFFFFF'
  },
  item3:{
    // width: 156,
    // height: 53,
    alignItems: 'center',
    // padding:0,
    // margin:0,
    // backgroundColor: '#3B3DBF'
  },
  xacnhan:{
    width: 156,
    height: 53,
    alignItems: 'center',
    display: 'flex',
    flexDirection:'column',
    justifyContent: 'center',
    backgroundColor: '#3B3DBF'
  },
  header: {...header},
  input: {
    padding: 15,
    backgroundColor: '#FFF',
  },
  body:{
    alignItems: 'center',
    // paddingLeft: 50,
    paddingTop: 50,
  },
  img:{
    width: 250,
    height: 250,
  },
  test:{
    width: 250,
  }
})
