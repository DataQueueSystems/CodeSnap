import React from 'react';
import LottieView from 'lottie-react-native';
import {View} from 'react-native';
export default function HomeAnim({width = 160, height = 160}) {
  return (
    <View className="flex-column items-end justify-center postion-relative bottom-16">
      <LottieView
        source={require('../../../assets/lottiefile/HomeChat.json')}
        style={{width, height}} // ✅ Use style instead of className
        autoPlay
        loop
      />
    </View>
  );
}
