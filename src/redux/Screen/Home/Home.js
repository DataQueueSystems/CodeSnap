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
import {handleNavigate, hexToRgba} from '../../../../utils/global';
import UserCard from './UserCard';
import RecentChat from './RecentChat';
import HomeAnim from '../../../Component/Anim/HomeAnim';
import SmallBtn from '../../../Component/Btn/SmallBtn';
import {useNavigation} from '@react-navigation/native';
import InCompleteProfile from '../Profile/InCompleteProfile';
import { useSelector } from 'react-redux';

export default function Home() {
  let {colors} = useTheme();
  let navigation = useNavigation();
  const {user}=useSelector(state=>state?.user);
  let isProfileUpdated = user?.location && user?.info;
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

            {/* Incomplete Profile */}
            {!isProfileUpdated&&(
              <InCompleteProfile />
            )}

            
            {/* Divider */}
            <View className="flex-1 my-3">
              <Divider
                className="shadow-sm "
                style={{
                  backgroundColor: hexToRgba(colors.text_disabled, 0.1),
                  height: 4, // Ensures a thin line
                  shadowColor: colors.primary_main,
                }}
              />
            </View>

            <View className="flex absoulte">
              <Text className="text-xl font-p_medium capitalize text-start px-3">
                Build faster with AI
              </Text>
              <Text
                className="text-sm font-regular capitalize text-start px-3"
                style={{
                  color: colors.text_disabled,
                }}>
                Write cleaner code, fix bugs quicker, and bring ideas to life
                faster.
              </Text>
              <View className="flex-row top-20 left-2 absolute">
                <SmallBtn
                  label={'Start Chat'}
                  onPress={() => handleNavigate(navigation, 'Chat')}
                />
              </View>
              <HomeAnim />
            </View>

            {/* User card showing top user  */}
            <View className="bottom-20">
              <UserCard />
            </View>

            <View className="bottom-20">
              <RecentChat />
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({});
