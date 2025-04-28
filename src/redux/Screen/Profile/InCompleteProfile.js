import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Text} from 'react-native-paper';
import PrimaryBtn from '../../../Component/Btn/PrimaryBtn';
import {useNavigation} from '@react-navigation/native';
export default function InCompleteProfile() {
  let navigation = useNavigation();

  return (
    <>
      <View className="my-8 mx-3">
        <Text className="font-regular text-center mx-3 text-lg my-3">
          Please update your profile to keep your information up to date.
        </Text>
        <PrimaryBtn
          label={'Update your Profile'}
          onSubmit={() => navigation.navigate('EditProfile')}
        />
      </View>
    </>
  );
}
