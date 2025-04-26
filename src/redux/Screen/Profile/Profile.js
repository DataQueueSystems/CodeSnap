import React from 'react';
import {SafeAreaView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {useTheme, Text, Divider} from 'react-native-paper';
import AppHeader from '../../../Component/AppHeader/Header';
import SmallBtn from '../../../Component/Btn/SmallBtn';
import Ionicon from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import ProfileSection from './ProfileSelection';

// Reusable InfoRow component
const InfoRow = ({iconName, text, content}) => {
  const {colors} = useTheme();
  return (
    <View className="flex-row space-x-2 items-start my-1.5">
      <Ionicon
        name={iconName}
        size={24}
        color={content ? colors.text_primary : colors.primary}
      />
      <Text
        className={`text-sm font-regular`}
        style={{color: content ? colors.text_primary : colors.text_secondary}}>
        {text}
      </Text>
    </View>
  );
};

export default function Profile() {
  const {colors} = useTheme();

  const RenderIcon = () => {
    let path = 'Single Chat';
    return (
      <>
        <TouchableOpacity onPress={() => handleNavigate(navigation, path)}>
          <Ionicon name="create-outline" size={24} color={colors.primary} />
        </TouchableOpacity>
      </>
    );
  };

  return (
    <SafeAreaView
      className="flex-1"
      style={{backgroundColor: colors.background_default}}>
      <View className="flex-1 px-3">
        <AppHeader
          backIcon={false}
          screenName="Profile"
          RenderIcon={RenderIcon}
        />

        {/* Profile Header */}
        <View className="flex-row space-x-3 items-center my-2">
          <View
            className="w-16 h-16 rounded-full flex-row items-center justify-center"
            style={{backgroundColor: colors.primary_main}}>
            <Text className="text-4xl uppercase text-white font-regular">
              A
            </Text>
          </View>

          <View className="flex-1">
            <Text className="text-lg font-regular">Mahammad Murshid</Text>
            <Text
              className="text-md font-regular"
              style={{color: colors.text_secondary}}>
              Student
            </Text>
          </View>
        </View>

        {/* Profile Stats */}
        <View
          className="bg-red-300 px-1 rounded-2xl shadow-2xl my-2"
          style={{
            backgroundColor: colors.background_paper,
          }}>
          <View className="flex-row items-center justify-between my-2 px-2">
            <SmallBtn lable="Collaboration: 20" />
            <Text
              className="text-sm font-p_light"
              style={{color: colors.text_disabled}}>
              Joined on {moment().format('MMM D, YYYY')}
            </Text>
          </View>

          {/* About Section */}
          <View className="my-1.5 px-2 ">
            <InfoRow
              iconName="location-outline"
              text="Toronto, Canada"
              content={true}
            />
            <InfoRow
              iconName="information-circle-outline"
              text="Passionate about scalable architectures and clean APIs."
            />
            <InfoRow
              iconName="link-outline"
              text="https://github.com/emmawilliams"
              isLink
            />
            <InfoRow
              iconName="logo-github"
              text="https://github.com/emmawilliams"
              isLink
            />
          </View>
        </View>

        <ProfileSection
          title="Skills"
          data={['React', 'Next.js', 'React Native']}
        />
        <ProfileSection title="Lang Known" data={['English', 'French']} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
