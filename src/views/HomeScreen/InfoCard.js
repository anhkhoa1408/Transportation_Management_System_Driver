import React from 'react';
import { StyleSheet } from 'react-native';
import { Icon, ListItem } from 'react-native-elements';
import { COLORS } from '../../styles';
import { shadowCard } from '../../styles/layoutStyle';

const InfoCard = ({ item }) => {
  return (
    <ListItem style={styles.listItem}>
      <ListItem.Content
        style={{
          borderRadius: 20,
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-evenly',
        }}>
        <ListItem.Title style={styles.titleFont}>{item.name}</ListItem.Title>
        <Icon
          name={item.iconName}
          color={item.color}
          reverse
          containerStyle={{
            marginVertical: 15,
          }}
        />

        <ListItem.Subtitle
          style={{ fontSize: 28, fontWeight: 'bold', color: '#000' }}>
          {item.count}
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
};

const styles = StyleSheet.create({
  listItem: {
    width: 180,
    height: 170,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
    borderColor: '#000',
    paddingVertical: 15,
    marginHorizontal: 12,
    borderRadius: 20,
    elevation: 15,
    shadowColor: COLORS.primary,
  },
  titleFont: {
    fontSize: 16,
    color: '#737373',
  },
});

export default InfoCard;
