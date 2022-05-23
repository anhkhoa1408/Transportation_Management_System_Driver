import {
  StyleSheet,
  View,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import React, { useState } from 'react';
import Carousel from 'react-native-snap-carousel';
import { Image, Tile, Text, Icon } from 'react-native-elements';
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
      <Tile
        disabled
        imageSrc={{ uri: item.url }}
        imageProps={{
          resizeMode: 'stretch',
        }}
        titleStyle={{ height: 0 }}
        width={width / 1.7}
        height={width / 1.7}
        imageContainerStyle={{
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
          paddingBottom: 0,
        }}
        containerStyle={styles.imageContainer}>
        <View style={styles.imageInfo}>
          <Text style={{lineHeight: 20, fontSize: 14}}>{`Thời gian xác nhận ${'\n'} ${moment(
            item.updatedAt.toString(),
          ).format('DD-MM-YYYY HH:mm')}`}</Text>
          <Icon name="check-circle" color={COLORS.success} />
        </View>
      </Tile>
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
    borderRadius: 8,
    backgroundColor: '#FFF',
    borderColor: 'rgba(0, 0, 0, 0.1)',
    borderWidth: 1,
  },
  imageInfo: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8
  },
});
