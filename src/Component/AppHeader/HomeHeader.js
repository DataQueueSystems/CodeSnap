import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {Text, useTheme} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {
  Activity_Opacity,
  getGreeting,
  handleNavigate,
} from '../../../utils/global';
import {useSelector} from 'react-redux';

export default function HomeHeader({}) {
  let {colors} = useTheme();
  let navigation = useNavigation();
  const {user} = useSelector(state => state?.user);

  return (
    <>
      <View className="flex-row justify-between items-center px-3 mt-12 ">
        <View className="flex-row items-center justify-center space-x-3">
          <Image
            source={require('../../../assets/image/logo.png')}
            className="h-12 w-12 rounded-full shadow-2xl"
            style={{
              shadowColor: colors.primary_main,
            }}
          />
          <Text
            className={'text-[16px] font-semi'}
            style={{
              color: colors.text_primary,
            }}>
            CodeSnap
          </Text>
        </View>

        {/* Profile Avtar  */}
        <View className="flex-row items-center space-x-3">
          <TouchableOpacity
            onPress={() => handleNavigate(navigation, 'Profile')}
            activeOpacity={Activity_Opacity}>
            <View
              className="w-10 h-10 rounded-full flex-row items-center justify-center"
              style={{backgroundColor: colors.primary_main}}>
              <Text
                className="text-2xl uppercase text-white font-regular"
                style={{}}>
                {user?.username?.charAt(0)?.toUpperCase()}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* greeting */}
      <View className=" flex-column  px-3 mt-5">
        <Text className={'text-md font-regular'}>{getGreeting()},</Text>
        <Text
          className={'text-lg font-p_medium'}
          style={{
            color: colors.text_primary,
          }}>
          {user?.username}
        </Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({});
