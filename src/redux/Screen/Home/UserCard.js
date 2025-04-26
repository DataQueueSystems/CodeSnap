import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ListofUser from '../../../Component/User/ListofUser';
import {Divider, useTheme} from 'react-native-paper';
import CategoryHeader from '../../../Component/AppHeader/CategoryHeader';
import {hexToRgba} from '../../../../utils/global';

export default function UserCard() {
  let {colors} = useTheme();
  return (
    <View
      className="bg-red-300 mx-3 rounded-2xl shadow-2xl my-5"
      style={{
        backgroundColor: colors.background_paper,
      }}>
      <View className=" px-2 mt-3">
        <CategoryHeader category="Recently Joined" navigationPath="Home" />
        <Divider
          style={{
            backgroundColor: hexToRgba(colors.text_disabled, 0.1),
            height: 1,
          }}
        />
      </View>
      <View className="px-3">
        <ListofUser />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
