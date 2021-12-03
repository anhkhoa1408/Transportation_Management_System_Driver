import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { Icon, CheckBox } from "react-native-elements";
import { COLORS, FONTS } from "../../styles";

export default function OrderScreen() {
  const tempData = [
    {
      id: "06465467984134",
      arrived_time: "2021-12-03T10:05:16.908Z",
      to_address: {
        street: "123 Pham Van Dong",
        ward: "Phuong 2",
        province: "Thu Duc",
        city: "Ho Chi Minh",
      },
    },
    {
      id: "06465467984135",
      to_address: {
        street: "123 Pham Van Dong",
        ward: "Phuong 2",
        province: "Thu Duc",
        city: "Ho Chi Minh",
      },
      driver: {
        type: "Driver",
        name: "Khoa 2",
        phone: "0123897456",
        username: "khoa2",
        email: "khoa2@gmail.com",
        birthday: "2021-12-03",
        role: "61a842ecb5b96f16502854cb",
        car: "61a997b081140f0016764a28",
        id: "61a98d4c8358540016fbb60f",
      },
    },
  ];
  const [data, setData] = useState(tempData);
  const [check, setCheck] = useState([]);

  useEffect(() => {
    setCheck(data.map((item) => "driver" in item));
  }, []);

  useEffect(() => {
    setCheck(data.map((item) => "driver" in item));
  }, [data]);

  const renderItem = ({ item, index }) => (
    <View
      style={{
        padding: 15,
        marginHorizontal: 20,
        marginTop: 15,
        borderRadius: 12,
        backgroundColor: COLORS.white,
        ...styles.shadow,
      }}
    >
      <View style={{ ...styles.row }}>
        <Icon
          name={"dashboard"}
          size={50}
          color={COLORS.black}
          type="material"
        />
        <View
          style={{
            ...styles.column,
            flex: 1,
            marginLeft: 10,
            alignItems: "flex-start",
          }}
        >
          <Text style={{}}>ID: {item.id}</Text>
          <Text>A</Text>
        </View>
        <CheckBox
          checked={check[index]}
          onIconPress={() => {
            setCheck(
              check.map((item, key) => {
                return key === index ? !item : item;
              })
            );
          }}
        />
      </View>
      <View style={{}}>
        <Text>Đến</Text>
        <Text>
          {item.to_address.street}, {item.to_address.ward},{" "}
          {item.to_address.province}, {item.to_address.city}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1, alignItems: "stretch" }}>
      {data.length > 0 && (
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => `${item.id}`}
        />
      )}

      {data.length == 0 && (
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            height: 200,
          }}
        >
          <Text style={{ color: COLORS.primary, ...FONTS.header }}>
            No Record
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
  },
  row: {
    flexWrap: "nowrap",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  column: {
    flexWrap: "nowrap",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
});
