import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useTheme} from 'react-native-paper';

export default function Loader() {
  let {colors} = useTheme();
  return (
    <>
      <View
        className="flex-1 justify-center items-center"
        style={{backgroundColor: colors.background_default}}>
        <ActivityIndicator size={'small'} color={colors.primary_main} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({});
