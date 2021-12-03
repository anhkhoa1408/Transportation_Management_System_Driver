import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Icon, CheckBox } from "react-native-elements";
import { COLORS, FONTS } from "../../styles";

export default function OrderScreen() {
  const tempData = [
    {
      quantity: 133,
      weight: 1,
      state: 0,
      _id: "61a983c312c1a70016415259",
      package_type: {
        package_type: "normal",
      },
      code: "784544",
      current_address: null,
      order: {
        state: 0,
        _id: "61a982b712c1a7001641524f",
        sender_phone: "0946853324",
        fee: 2000,
        remain_fee: 2000,
        sender_name: "Duong Tran",
        receiver_name: "Tran Duong",
        receiver_phone: "0986657442",
        from_address: {
          street: "123 Ly Thuong Kiet",
          ward: "Thanh Thanh",
          province: "Quan 3",
          city: "Ho Chi Minh",
        },
        to_address: {
          street: "02 Tran Hung Dao",
          ward: "Phuong 3",
          province: "An Ba",
          city: "An Giang",
        },
        id: "61a982b712c1a7001641524f",
      },
      size: {
        len: 5,
        width: 20,
        height: 10,
      },
      imports: [],
      exports: [],
      shipments: [],
      id: "61a983c312c1a70016415259",
    },
    {
      quantity: 20,
      weight: 3,
      state: 0,
      package_type: {
        package_type: "normal",
      },
      code: "16516518791",
      current_address: null,
      order: {
        state: 0,
        sender_phone: "0946853324",
        fee: 2000,
        remain_fee: 2000,
        sender_name: "Duong Tran",
        receiver_name: "Tran Duong",
        receiver_phone: "0986657442",
        from_address: {
          street: "123 Ly Thuong Kiet",
          ward: "Thanh Thanh",
          province: "Quan 3",
          city: "Ho Chi Minh",
        },
        to_address: {
          street: "02 Tran Hung Dao",
          ward: "Phuong 3",
          province: "An Ba",
          city: "An Giang",
        },
        id: "61a982b712c1a7001641524f",
      },
      size: {
        len: 101,
        width: 20,
        height: 30,
      },
      id: "61a9840512c1a7001641525c",
    },
  ];
  const [data, setData] = useState(tempData);

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
          <Text style={{ ...styles.bigText }}>ID: {item.id}</Text>
          <Text style={{ ...styles.smolText }}>Số lượng: {item.quantity}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1, alignItems: "stretch" }}>
      {data.length > 0 && (
        <View style={{ flex: 1 }}>
          <View
            style={{
              ...styles.row,
              paddingHorizontal: 20,
              paddingVertical: 10,
              ...styles.borderBottom,
            }}
          >
            <Icon
              name={"dashboard"}
              size={50}
              color={COLORS.black}
              type="material"
            />
            <View style={{ flex: 1 }}>
              <View style={{ ...styles.column, flex: 1, marginLeft: 20 }}>
                <Text>{data[0].order.sender_name}</Text>
                <Text>SĐT: {data[0].order.sender_phone}</Text>
              </View>
            </View>
            <Icon
              name={"dashboard"}
              size={50}
              color={COLORS.black}
              type="material"
            />
          </View>
          <View style={{ ...styles.borderBottom, padding: 20 }}>
            <View style={{ ...styles.row }}>
              <View
                style={{
                  ...styles.column,
                  flex: 1,
                  marginRight: 20,
                }}
              >
                <Text>Địa chỉ</Text>
              </View>
              <View style={{ ...styles.column, flex: 1 }}>
                <Text>Cần vận chuyển</Text>
              </View>
            </View>
            <View style={{ ...styles.row }}>
              <View
                style={{
                  ...styles.column,
                  flex: 1,
                  alignItems: "flex-start",
                  marginRight: 20,
                }}
              >
                <Text>
                  {data[0].current_address === null
                    ? data[0].order.from_address.street +
                      ", " +
                      data[0].order.from_address.ward +
                      ", " +
                      data[0].order.from_address.province +
                      ", " +
                      data[0].order.from_address.city
                    : data[0].current_address}
                </Text>
              </View>
              <View
                style={{ ...styles.column, flex: 1, alignItems: "flex-start" }}
              >
                <Text>
                  {data.reduce(
                    (previous, current) =>
                      previous + current.weight * current.quantity,
                    0
                  )}{" "}
                  Kg
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{ flex: 1, alignItems: "stretch", ...styles.borderBottom }}
          >
            <FlatList
              data={data}
              renderItem={renderItem}
              keyExtractor={(item) => `${item.id}`}
            />
          </View>
          <TouchableOpacity style={styles.button}>
            <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>
              ChBaụp ảnh
            </Text>
          </TouchableOpacity>
        </View>
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
  },
  column: {
    flexWrap: "nowrap",
    flexDirection: "column",
    justifyContent: "center",
  },
  smolText: {
    fontSize: 12,
  },
  bigText: {
    fontSize: 16,
    marginBottom: 5,
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.primary,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    width: "60%",
    backgroundColor: "#3B3DBF",
    borderRadius: 8,
    paddingVertical: 10,
    alignSelf: "center",
    marginBottom: 20,
    marginTop: 10,
  },
});
