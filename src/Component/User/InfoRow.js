import {StyleSheet, View} from 'react-native';
import React from 'react';
import {useTheme, Text} from 'react-native-paper';
import Ionicon from 'react-native-vector-icons/Ionicons';


// Reusable component for info rows
export default function InfoRow({iconName, text, content}) {
  if (!text) return null;
  let {colors} = useTheme();
  return (
    <>
      <View className="flex-row space-x-2 items-start my-1.5">
        <Ionicon
          name={iconName}
          size={24}
          color={content ? colors.text_primary : colors.primary}
        />
        <Text
          className="text-sm font-regular"
          style={{
            color: content ? colors.text_primary : colors.text_secondary,
          }}>
          {text}
        </Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({});
