import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {TextInput, useTheme} from 'react-native-paper';
import {hexToRgba} from '../../../utils/global';
import Ionicon from 'react-native-vector-icons/Ionicons';

export default function SearchInput({placeholder, onPress, onChangeText}) {
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
            outline: hexToRgba(colors.primary_main, 0.4), // Border color when not focused
          },
        }}
        contentStyle={{fontFamily: 'Poppins-Regular', top: 2, right: 10}}
        left={
          <TextInput.Icon
            disabled
            icon={() => (
              <Ionicon
                name="search-outline"
                size={22}
                color={colors.text_secondary}
              />
            )}
          />
        }
      />
    </>
  );
}

const styles = StyleSheet.create({});
