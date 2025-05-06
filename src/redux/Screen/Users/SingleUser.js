import {
  Alert,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
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
import SmallBtn from '../../../Component/Btn/SmallBtn';

export default function SingleUser({route}) {
  let {data} = route.params || {};
  const {user: loginedUser} = useSelector(state => state.user);
  const isCollated = data?.collaborateList?.find(
    collaborator => collaborator?.userId === loginedUser?.id,
  );
  const {colors} = useTheme();
  let navigation = useNavigation();

  let user = data || {};
  let dispatch = useDispatch();
  const [visible2, setVisible2] = useState(false);

  const handleCollaborate = async status => {
    await setVisible2(false);
    const result = await dispatch(updateCollaborate(data?.id, status));
    if (result?.success) {
      showToast(`Collaboration ${status}ed successfully!`, 'success');
      setTimeout(() => {
        navigation.goBack();
      }, 100); // give UI time to update
    } else {
      showToast(result?.error || 'Something went wrong.', 'error');
    }
  };

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
          onPress: () => handleCollaborate('pending'),
        },
      ],
    );
  };

  const RenderIcon = () => (
    <View className="flex-row space-x-3 items-center">
      {isCollated && isCollated?.status != 'revoke' ? (
        <>
          <Text className="text-sm font-regular capitalize">
            {isCollated?.status}
          </Text>
          {isCollated?.status != 'revoke' &&
            isCollated?.status != 'pending' && (
              <View className="left-2">
                <SmallBtn
                  label={'Revoke Access'}
                  onPress={() => handleCollaborate('revoke')}
                />
              </View>
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

{user?.info?(

<>
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
</>
):(
<>
<View className="my-4 items-center">
    <Text className="text-base font-p_medium text-center">
      This user hasn’t updated their profile information yet.
    </Text>
  </View>

</>
)}

       
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({});
