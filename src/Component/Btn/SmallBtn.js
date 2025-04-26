import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useTheme} from 'react-native-paper';
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
        <Text
          style={{
            color: TextColor,
          }}
          className="text-sm font-p_medium ">
          {lable}
        </Text>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({});
