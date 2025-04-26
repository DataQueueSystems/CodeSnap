import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import React from 'react';
import HomeHeader from '../../../Component/AppHeader/HomeHeader';
import {Divider, Text, useTheme} from 'react-native-paper';
import {hexToRgba} from '../../../../utils/global';

export default function Home() {
  let {colors} = useTheme();
  return (
    <>
      <SafeAreaView
        className="flex-1"
        style={{backgroundColor: colors.background_default}}>
        <View className="flex-1 ">
          <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}>
            <HomeHeader />

            {/* Divider */}
            <View className="flex-1 my-3">
              <Divider
                className="shadow-sm "
                style={{
                  backgroundColor: hexToRgba(colors.text_disabled, 0.1),
                  height: 6, // Ensures a thin line
                  shadowColor: colors.primary_main,
                }}
              />
            </View>

            <Text className="text-3xl font-p_medium text-center px-3">
              CodeSnap: Share code, debug fast, and grow with AI.
            </Text>
          </ScrollView>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({});
