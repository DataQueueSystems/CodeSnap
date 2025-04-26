import React from 'react';
import {View} from 'react-native';
import {Text, useTheme} from 'react-native-paper';
import PrimaryBtn from '../../../Component/Btn/PrimaryBtn';
import OnboardingAnim from '../../../Component/Anim/OnboardingAnim';
import {useNavigation} from '@react-navigation/native';
import {handleNavigate} from '../../../../utils/global';

export default function Onboarding() {
  let {colors} = useTheme();
  let navigation = useNavigation();

  return (
    <View
      className="flex-1 px-6  justify-center items-center"
      style={{
        backgroundColor: colors.background_default,
      }}>
      <View className="">
        <OnboardingAnim />
        <Text className="text-2xl font-semi text-center mb-4">
          Welcome to CodeSnap!
        </Text>
        <Text className="font-regular  text-center text-md  px-1.5">
          An AI-powered platform to debug, learn, and collaborate on code. Post
          your snippets, earn badges, and grow with the community.
        </Text>
      </View>
      <View className="mt-10 w-full">
        <PrimaryBtn
          label={'Get started '}
          onSubmit={() => handleNavigate(navigation, 'Login')}
        />
      </View>
    </View>
  );
}
