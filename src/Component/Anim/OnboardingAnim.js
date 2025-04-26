import React from 'react';
import LottieView from 'lottie-react-native';
import {View} from 'react-native';
import {Text, useTheme} from 'react-native-paper';

export default function OnboardingAnim({width = 400, height = 400}) {
  let {colors} = useTheme();
  return (
    <View className="flex-column items-center justify-center ">
      <LottieView
        source={require('../../../assets/lottiefile/Onboarding.json')}
        style={{width, height}} // ✅ Use style instead of className
        autoPlay
        loop
      />
    </View>
  );
}
