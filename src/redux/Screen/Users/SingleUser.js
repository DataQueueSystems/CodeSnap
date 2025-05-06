import {
  Alert,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useTheme, Text, Menu, Divider} from 'react-native-paper';
import AppHeader from '../../../Component/AppHeader/Header';
import Ionicon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import UserProfile from '../../../Component/User/UserProfile';
import InfoRow from '../../../Component/User/InfoRow';
import ProfileSection from '../Profile/ProfileSelection';
import {Activity_Opacity, hexToRgba} from '../../../../utils/global';
import {useDispatch, useSelector} from 'react-redux';
import {updateCollaborate} from '../../slices/normalSlice';
import {showToast} from '../../../../utils/Toast';
import {
  fetchSingleUserDetails,
  getSingleUserDetails,
} from '../../slices/userSlice';

export default function SingleUser({route}) {
  // Assume this is inside your component
  const {data} = route.params || {}; // Here, data = userId like "DVzYqNpJ45YGs0Y8u1S2"
  const {user: loginedUser} = useSelector(state => state.user);

  const [user, setUser] = useState(null);
  const [isCollated, setIsCollated] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (data) {
          const userData = await fetchSingleUserDetails(data);
          setUser(userData);
          // Check if logged-in user is in collaborateList
          const collab = userData?.collaborateList?.find(
            item => item?.userId === loginedUser?.id,
          );
          setIsCollated(collab || null);
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, [data, loginedUser?.id]);

  const {colors} = useTheme();
  let navigation = useNavigation();
  let dispatch = useDispatch();

  const handleCollaborate = async status => {
    const result = await dispatch(updateCollaborate(data, status));
    if (result?.success) {
      showToast(`Collaboration ${status}ed successfully!`, 'success');
    } else {
      showToast(result?.error || 'Something went wrong.', 'error');
    }
  };

  const [visible2, setVisible2] = useState(false);

  const handlePress = () => {
    // Show an alert with Cancel and Send options
    Alert.alert(
      'Collaboration Invitation',
      `Do you want to send an invite to collaborate with: ${user?.name}?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
          onPress: () => console.log('Collaboration canceled'),
        },
        {
          text: 'Send',
          onPress: handleCollaborate,
        },
      ],
    );
  };

  const RenderIcon = () => (
    <View className="flex-row space-x-3 items-center">
      {isCollated ? (
        <>
          <Text className="text-sm font-regular capitalize">
            {isCollated?.status}
          </Text>

          {isCollated?.status && (
            <Menu
              visible={visible2}
              onDismiss={() => setVisible2(false)}
              contentStyle={{
                top: 80,
                backgroundColor: colors.background_paper,
                borderColor: hexToRgba(colors.primary_main, 0.2),
                borderWidth: 1,
                maxHeight: 300,
              }}
              anchor={
                <TouchableOpacity
                  onPress={() => setVisible2(!visible2)}
                  activeOpacity={Activity_Opacity}>
                  <Ionicon
                    name="chevron-down-outline"
                    size={22}
                    color={colors.text_secondary}
                  />
                </TouchableOpacity>
              }>
              {/* Show Accept if not already accepted */}
              {isCollated.status !== 'accepted' && (
                <>
                  <Menu.Item
                    title="Approve Collaboration"
                    titleStyle={{
                      fontFamily: 'Poppins-Regular',
                      textAlign: 'center',
                      fontSize: 13,
                    }}
                    onPress={() => handleCollaborate('accepted')}
                  />
                  {isCollated.status !== 'rejected' && (
                    <Divider
                      style={{
                        backgroundColor: hexToRgba(colors.primary_main, 0.3),
                      }}
                    />
                  )}
                </>
              )}

              {/* Show Reject if not already rejected */}
              {isCollated.status !== 'rejected' && (
                <Menu.Item
                  title="Reject Collaboration"
                  titleStyle={{
                    fontFamily: 'Poppins-Regular',
                    textAlign: 'center',
                    fontSize: 13,
                  }}
                  onPress={() => handleCollaborate('rejected')}
                />
              )}
            </Menu>
          )}
        </>
      ) : (
        <TouchableOpacity
          activeOpacity={Activity_Opacity}
          onPress={handlePress}>
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
    <>
      <SafeAreaView
        className="flex-1"
        style={{backgroundColor: colors.background_default}}>
        <View className="flex-1 px-3">
          <AppHeader screenName="..." RenderIcon={RenderIcon} />
          {/* Profile data  */}
          <UserProfile user={user} />

          <View className="my-2 rounded-2xl shadow-2xl">
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

          {/* Skills and Languages */}
          {!!user?.skills && (
            <ProfileSection title="Skills" data={user.skills} />
          )}
          {!!user?.languagesKnown && (
            <ProfileSection title="Lang Known" data={user.languagesKnown} />
          )}
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({});
