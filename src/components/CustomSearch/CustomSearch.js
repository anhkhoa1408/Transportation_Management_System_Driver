import React from 'react';
import { View, Text } from 'react-native';
import { SearchBar } from 'react-native-elements';

const CustomSearch = () => {
  return (
    <SearchBar
      cancelButtonTitle="Huỷ"
      placeholder="Nhập"
      value=""
      platform="ios"
      inputContainerStyle={{ backgroundColor: '#F0F1F5' }}
    />
  );
};

export default CustomSearch;
