import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useTheme, Text} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {Activity_Opacity} from '../../../utils/global';

export default function CategoryHeader({category, navigationPath}) {
  let {colors} = useTheme();
  let navigation = useNavigation();
  const handleNavigate = () => {
    navigation.navigate(navigationPath);
  };
  return (
    <>
      <View className="flex-row items-center justify-between px-2.5 mb-1">
        <Text className={'text-[17px] font-p_medium'}>{category}</Text>
        {navigationPath && (
          <TouchableOpacity
            activeOpacity={Activity_Opacity}
            onPress={handleNavigate}>
            <Text
              style={{
                color: colors.primary_main,
              }}
              className={'text-xs font-p_medium '}>
              View All
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({});
