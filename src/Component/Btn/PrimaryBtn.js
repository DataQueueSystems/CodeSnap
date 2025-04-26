import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {TouchableRipple, useTheme} from 'react-native-paper';
import {hexToRgba, isPlatformIOS, rippleColor} from '../../../utils/global';
import Loader from '../Loader/Loader';

export default function PrimaryBtn({onSubmit, label, disabled}) {
  let {colors} = useTheme();
  let textColor = disabled ? colors.text_primary : 'white';
  let borderColor = disabled ? colors.primary_main : '';
  let borderStyle = {
    borderColor: disabled ? hexToRgba(colors.primary_main, 0.3) : '',
    borderWidth: disabled ? 1 : 0,
  };
  return (
    <>
      <TouchableRipple
        borderless
        rippleColor={rippleColor}
        onPress={onSubmit}
        className={`p-2.5 my-2 rounded-xl flex justify-center items-center`}
        style={[
          {
            backgroundColor: disabled ? colors.gray : colors.primary_main,
          },
          borderStyle,
        ]}>
        {label == 'loader' ? (
          <Loader />
        ) : (
          <Text
            className={'text-base text-white text-md font-semi'}
            style={{
              color: textColor,
            }}>
            {label}
          </Text>
        )}
      </TouchableRipple>
    </>
  );
}

const styles = StyleSheet.create({});
