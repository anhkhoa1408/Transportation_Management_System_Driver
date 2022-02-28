import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import React, { useState } from 'react';
import Carousel from 'react-native-snap-carousel';
import { Image, Tile } from 'react-native-elements';
import { MAIN_URL } from './../../../api/config';
import { useRef } from 'react';
import { COLORS, FONTS, STYLES } from '../../../styles';
import { Pressable } from 'react-native';
import moment from 'moment';
const { height, width } = Dimensions.get('window');

const PackageImage = props => {
  const ref = useRef(null);
  const [imageList, setList] = useState(props.images);
  const [activeIndex, setActiveIndex] = useState(0);

  const _renderItem = ({ item, index }) => (
    <Pressable onPress={() => _onPressCarousel(index)}>
      {console.log(item)}
      <Tile
        disabled
        imageSrc={{ uri: MAIN_URL + item.url }}
        imageProps={{
          resizeMode: 'stretch',
        }}
        title={`Thời gian xác nhận ${'\n'} ${moment(
          item.updatedAt.toString(),
        ).format('DD-MM-YYYY HH:mm:ss')}`}
        titleStyle={{ fontSize: 16 }}
        width={width / 1.7}
        height={width / 1.7}
        imageContainerStyle={{
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
          paddingBottom: 0,
        }}
        containerStyle={styles.imageContainer}
      />
    </Pressable>
  );

  const _onPressCarousel = index => {
    ref.current.snapToItem(index);
  };

  return (
    <View
      style={[{ flex: 1, flexDirection: 'column', justifyContent: 'center' }]}>
      <Carousel
        ref={ref}
        layout={'default'}
        data={imageList}
        sliderWidth={width}
        itemWidth={width / 1.7}
        renderItem={_renderItem}
        firstItem={0}
        onSnapToItem={index => setActiveIndex(index)}
      />
    </View>
  );
};

export default PackageImage;

const styles = StyleSheet.create({
  imageContainer: {
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 15,
    backgroundColor: '#FFF',
    borderColor: 'rgba(0, 0, 0, 0.1)',
    borderWidth: 1,
  },
});
