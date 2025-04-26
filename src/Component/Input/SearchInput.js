import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {TextInput, useTheme} from 'react-native-paper';
import {hexToRgba} from '../../../utils/global';
import {fonts} from '../CustomText/fonts';
import {Iconify} from 'react-native-iconify';

export default function SearchInput({placeholder, onPress,onChangeText}) {
  let {colors} = useTheme();
  return (
    <>
      <TextInput 
      onChangeText={onChangeText}
        onPress={onPress}
        style={{
          backgroundColor: 'transparent',
        }}
        className="rounded-2xl h-12  text-sm"
        mode="outlined"
        placeholder={placeholder}
        placeholderTextColor={colors.iconhigh}
        theme={{
          colors: {
            primary: colors.primary_light,
            outline: hexToRgba(colors.primary_main, 0.3), // Border color when not focused
          },
        }}
        contentStyle={{fontFamily: fonts.Regular, top: 2, right: 10}}
        left={
          <TextInput.Icon
            disabled
            icon={() => (
              <Iconify
                icon={'bitcoin-icons:search-filled'}
                size={24}
                color={colors.iconhigh}
              />
            )}
          />
        }
      />
    </>
  );
}

const styles = StyleSheet.create({});
