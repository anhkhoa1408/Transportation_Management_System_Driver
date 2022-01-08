import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Image } from 'react-native';

export default function TextField(props) {
  return (
    <View>
      <Text style={styles.texttitle}>{props.title}</Text>
      <View style={styles.inputView}>
        <TextInput
          style={{ ...styles.fsize, flex: 1 }}
          {...props}
        />
        {'afterText' in props && (
          <Text
            style={{ ...styles.fsize, marginRight: 10, textAlign: 'right' }}>
            {props.afterText}
          </Text>
        )}
        {'afterImage' in props && props.afterImage}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
  },
  texttitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
  },
  inputView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  fsize: {
    fontSize: 17,
    color: '#000',
    paddingLeft: 20,
    paddingVertical: 8,
  },
});
