import React from 'react';
import {SafeAreaView, TouchableOpacity, View} from 'react-native';
import {useTheme, Text} from 'react-native-paper';
import Ionicon from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import AppHeader from '../../../Component/AppHeader/Header';
import ProfileSection from './ProfileSelection';
import InCompleteProfile from './InCompleteProfile';
import {logout} from '../../slices/normalSlice';
import UserProfile from '../../../Component/User/UserProfile';
import InfoRow from '../../../Component/User/InfoRow';


export default function Profile() {
  const {colors} = useTheme();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {user} = useSelector(state => state?.user);
  const isProfileUpdated = user?.location && user?.info;

  const handleLogout = () => {
    dispatch(logout());
    navigation.navigate('Login');
  };

  const RenderIcon = () => (
    <View className="flex-row space-x-3">
      <TouchableOpacity onPress={() => navigation.navigate('EditProfile')}>
        <Ionicon name="create-outline" size={26} color={colors.primary} />
      </TouchableOpacity>
      <TouchableOpacity onPress={handleLogout}>
        <Ionicon name="log-out-outline" size={26} color={colors.primary} />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView
      className="flex-1"
      style={{backgroundColor: colors.background_default}}>
      <View className="flex-1 px-3">
        <AppHeader
          screenName="Profile"
          backIcon={false}
          RenderIcon={RenderIcon}
        />

        <UserProfile user={user} />

        
        {/* Profile Details or Incomplete Message */}
        {isProfileUpdated ? (
          <View
            className="px-1 my-2 rounded-2xl shadow-2xl"
            style={{backgroundColor: colors.background_paper}}>
            <View className="my-1.5 px-2">
              <InfoRow
                iconName="information-circle-outline"
                text={user?.info}
                content
              />
              <InfoRow
                iconName="location-outline"
                text={user?.location}
                content
              />
              <InfoRow iconName="link-outline" text={user?.websiteLink} />
              <InfoRow iconName="logo-github" text={user?.githubLink} />
            </View>
          </View>
        ) : (
          <InCompleteProfile />
        )}

        {/* Skills and Languages */}
        {!!user?.skills && <ProfileSection title="Skills" data={user.skills} />}
        {!!user?.languagesKnown && (
          <ProfileSection title="Lang Known" data={user.languagesKnown} />
        )}
      </View>
    </SafeAreaView>
  );
}
