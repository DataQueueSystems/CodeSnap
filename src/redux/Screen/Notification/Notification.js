import {Alert, SafeAreaView, StyleSheet, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useTheme} from 'react-native-paper';
import AppHeader from '../../../Component/AppHeader/Header';
import ListofUser from '../../../Component/User/ListofUser';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {showToast} from '../../../../utils/Toast';
import {updateCollaborate} from '../../slices/normalSlice';
import {getAllCollaborationsByLoggedInUser} from '../../slices/userSlice';

export default function Notification() {
  const {colors} = useTheme();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const {user, allCollaborations, alluser} = useSelector(state => state.user);
  
  const loggedInUserId = user?.id;

  const [pendingCollaborators, setPendingCollaborators] = useState([]);

  // Fetch all collaborations on mount
  useEffect(() => {
    if (loggedInUserId) {
      dispatch(getAllCollaborationsByLoggedInUser());
    }
  }, [dispatch, loggedInUserId]);

  useEffect(() => {
    if (
      !Array.isArray(allCollaborations) ||
      !Array.isArray(alluser) ||
      !loggedInUserId
    ) {
      return;
    }

    const pending = allCollaborations
      .filter(
        item =>
          item.status === 'pending' &&
          (item.from === loggedInUserId || item.to === loggedInUserId),
      )
      .map(item => {
        const otherUserId =
          item.from === loggedInUserId ? item.to : item.from;
        const userProfile = alluser.find(u => u.id === otherUserId);

        return userProfile
          ? {
              ...userProfile,
              collaborationMeta: item,
              sentByMe: item.from === loggedInUserId, // ✅ Add flag
            }
          : null;
      })
      .filter(Boolean);

    setPendingCollaborators(pending);
  }, [allCollaborations, alluser, loggedInUserId]);

  // Accept or reject collaboration
  const handleCollaborate = async (collabId, status) => {
    const result = await dispatch(updateCollaborate(collabId, status));
    if (result?.success) {
      showToast(`Collaboration ${status}ed successfully!`, 'success');
      setPendingCollaborators(prev =>
        prev.filter(user => user.collaborationMeta.id !== collabId),
      );
    } else {
      showToast(result?.error || 'Something went wrong.', 'error');
    }
  };

  return (
    <SafeAreaView
      className="flex-1"
      style={{backgroundColor: colors.background_default}}>
      <View className="flex-1 px-3">
        <AppHeader screenName={'Notification'} />
        <ListofUser
          userData={pendingCollaborators}
          notification={true}
          handleCollaborate={handleCollaborate}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
