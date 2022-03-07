import React, { useState, useRef } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import { COLORS } from './../../styles';

const CustomInput = ({
  disabled,
  error,
  errorMessage,
  onBlur,
  onChangeText,
  title,
  value,
  ...props
}) => {
  const [focus, setFocus] = useState(false);

  const handleFocus = () => {
    setFocus(true);
  };

  const handleBlur = () => {
    setFocus(false);
    onBlur && onBlur();
  };

  return (
    <>
      <View style={{ marginBottom: 15 }}>
        {title && <Text style={style.title}>{title}</Text>}
        <TextInput
          style={[
            style.container,
            {
              borderColor: error
                ? COLORS.danger
                : focus
                ? COLORS.primary
                : COLORS.gray,
            },
            disabled && style.disabled,
          ]}
          maxLength={400}
          numberOfLines={5}
          value={value}
          onChangeText={onChangeText}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...props}
        />
      </View>
      {error ? (
        <Text
          style={{
            color: COLORS.danger,
            fontWeight: 'bold',
          }}>
          {errorMessage}
        </Text>
      ) : null}
    </>
  );
};

const style = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 8,
    margin: 0,
    marginVertical: 15,
    borderWidth: 0,
    backgroundColor: '#F3F3FA',
    borderWidth: 2,
    paddingHorizontal: 25,
    paddingVertical: 10,
    height: 100,
    fontSize: 17,
    color: '#000',
  },
  title: {
    fontSize: 20,
    color: '#000000',
  },
  disabled: {
    color: 'rgba(0, 0, 0, 0.5)',
  },
});

export default CustomInput;
