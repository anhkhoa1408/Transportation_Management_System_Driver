import React from 'react';
import { COLORS } from '../../styles';
import { SpeedDial } from 'react-native-elements';

export default function _SpeedDial({ open, setOpen, setAbsence, absenceForm }) {
  return (
    <SpeedDial
      isOpen={open}
      icon={{
        name: 'sliders-h',
        color: '#fff',
        type: 'font-awesome-5',
      }}
      openIcon={{
        name: 'close',
        color: '#fff',
      }}
      onOpen={() => setOpen(!open)}
      onClose={() => {
        setOpen(!open);
        setAbsence(false);
      }}
      containerStyle={{
        bottom: 20,
        marginTop: 20,
      }}
      overlayColor="rgba(0,0,0,0.15)"
      iconContainerStyle={{
        backgroundColor: COLORS.primary,
      }}>
      <SpeedDial.Action
        icon={{
          name: 'snooze',
          color: '#fff',
          type: 'material',
        }}
        iconContainerStyle={{
          backgroundColor: COLORS.primary,
        }}
        title="Nghỉ phép"
        onPress={() => setAbsence(!absenceForm)}
      />
    </SpeedDial>
  );
}
