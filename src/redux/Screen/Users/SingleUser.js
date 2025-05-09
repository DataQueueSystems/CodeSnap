import {
  Alert,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {useTheme, Text} from 'react-native-paper';
import AppHeader from '../../../Component/AppHeader/Header';
import Ionicon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import UserProfile from '../../../Component/User/UserProfile';
import InfoRow from '../../../Component/User/InfoRow';
import ProfileSection from '../Profile/ProfileSelection';
import {Activity_Opacity} from '../../../../utils/global';
import {useDispatch, useSelector} from 'react-redux';
import {updateCollaborate} from '../../slices/normalSlice';
import {showToast} from '../../../../utils/Toast';
import SmallBtn from '../../../Component/Btn/SmallBtn';

export default function SingleUser({route}) {
  const {data} = route.params || {};
  const {user: loggedInUser, allCollaborations} = useSelector(
    state => state.user,
  );
  const {colors} = useTheme();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  // Check collaboration status from 'allCollaborations' in Redux store
  const isCollaborated = allCollaborations?.find(
    collaboration =>
      (collaboration?.from === loggedInUser?.id &&
        collaboration?.to === data?.id) ||
      (collaboration?.from === data?.id &&
        collaboration?.to === loggedInUser?.id),
  );

  // Function to handle collaboration
  const handleCollaborate = async status => {
    const result = await dispatch(updateCollaborate(data?.id, 'pending')); // Pass 'status' here
    if (result?.success) {
      showToast(`Collaboration ${status}ed successfully!`, 'success');
      setTimeout(() => navigation.goBack(), 100);
    } else {
      showToast(result?.error || 'Something went wrong.', 'error');
    }
  };

  // Function to send collaboration request
  const handleSendRequest = () => {
    Alert.alert(
      'Collaboration Invitation',
      `Do you want to send an invite to collaborate with ${data?.name}?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Send',
          onPress: () => handleCollaborate('pending'),
        },
      ],
    );
  };

  // Render collaboration icon and status
  const RenderIcon = () => (
    <View className="flex-row space-x-3 items-center">
      {isCollaborated ? (
        <>
          <Text className="text-sm font-regular capitalize">
            {isCollaborated?.status}
          </Text>
          {/* {isCollaborated?.status !== 'pending' && (
            <View className="left-2">
              <SmallBtn
                label="Revoke Access"
                onPress={() => handleCollaborate('revoke')}
              />
            </View>
          )} */}
        </>
      ) : (
        <TouchableOpacity
          activeOpacity={Activity_Opacity}
          onPress={handleSendRequest}>
          <Ionicon
            name="git-pull-request-outline"
            size={26}
            color={colors.primary}
          />
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <SafeAreaView
      className="flex-1"
      style={{backgroundColor: colors.background_default}}>
      <View className="flex-1 px-3">
        <AppHeader screenName="User Profile" RenderIcon={RenderIcon} />

        {/* Profile Top Card */}
        <UserProfile user={data} />

        {data?.info ? (
          <>
            {/* Info Rows */}
            <View className="my-2 rounded-2xl shadow-2xl">
              <View className="my-1.5 px-2">
                <InfoRow
                  iconName="information-circle-outline"
                  text={data.info}
                  content
                />
                <InfoRow
                  iconName="location-outline"
                  text={data.location}
                  content
                />
                <InfoRow iconName="link-outline" text={data.websiteLink} />
                <InfoRow iconName="logo-github" text={data.githubLink} />
              </View>
            </View>

            {/* Skills and Languages */}
            {!!data.skills && data.skills.length > 0 && (
              <ProfileSection title="Skills" data={data.skills} />
            )}
            {!!data.languagesKnown && data.languagesKnown.length > 0 && (
              <ProfileSection
                title="Languages Known"
                data={data.languagesKnown}
              />
            )}
          </>
        ) : (
          <View className="my-4 items-center">
            <Text className="text-base font-p_medium text-center">
              This user hasn’t updated their profile information yet.
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
