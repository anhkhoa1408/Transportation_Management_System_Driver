import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { Icon, CheckBox } from "react-native-elements";
import { COLORS, FONTS } from "../../styles";
import shipmentApi from "../../api/shipmentAPI";

export default function OrderScreen() {
  const [data, setData] = useState([]);
  const [check, setCheck] = useState([]);

  useEffect(() => {
    shipmentApi
      .shipment()
      .then((resData) => {
        setData(resData);
        setCheck(data.map((item) => "arrived_time" in item));
      })
      .catch((err) => {
        setData([]);
        setCheck(data.map((item) => "arrived_time" in item));
      });
  }, []);

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
          <Text>{check[index] === false ? "Đang vận chuyển" : "Đã nhận"}</Text>
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
            Loading data...
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
