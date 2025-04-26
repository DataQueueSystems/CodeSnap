import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useTheme} from 'react-native-paper';
import {fonts} from '../CustomText/fonts';
import CustomText from '../CustomText/CustomText';
import {Activity_Opacity} from '../../../utils/global';

export default function SmallBtn({lable, onPress, success, fail}) {
  let {colors} = useTheme();
  let TextColor = success
    ? colors.primary_main
    : fail
    ? colors.error_main
    : colors.text_primary;
  return (
    <>
      <TouchableOpacity
        activeOpacity={Activity_Opacity}
        onPress={onPress}
        className="p-1.5  rounded-md  mx-1"
        style={{backgroundColor: colors.background_paper}}>
        <CustomText
          style={{
            fontFamily: fonts.Medium,
            color: TextColor,
          }}
          className="text-xs ">
          {lable}
        </CustomText>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({});
