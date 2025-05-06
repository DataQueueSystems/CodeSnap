import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useState, useMemo} from 'react';
import {useTheme} from 'react-native-paper';
import AppHeader from '../../../Component/AppHeader/Header';
import ListofUser from '../../../Component/User/ListofUser';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {showToast} from '../../../../utils/Toast';
import {updateCollaborate} from '../../slices/normalSlice';
import {setAllUser} from '../../slices/userSlice';

export default function Notification() {
  const {colors} = useTheme();
  let navigation = useNavigation();
  let dispatch = useDispatch();
  const {alluser, user} = useSelector(state => state.user); // Extracting user and alluser from Redux state
  const loggedInUserId = user?.id; // Get the logged-in user ID
  const filteredUsers = useMemo(() => {
    let filtered = alluser;
    // Always apply collaborator filter first (default behavior)
    filtered = filtered.filter(u =>
      u?.collaborateList?.some(
        collaborator =>
          collaborator?.userId === loggedInUserId &&
          collaborator?.status == 'pending',
      ),
    );

    return filtered;
  }, [alluser, loggedInUserId]);

  const handleCollaborate = async (id, status) => {
    const result = await dispatch(updateCollaborate(id, status));
    if (result?.success) {
      alluser.map(user => {
        if (user.id === id) {
          const updatedCollaborateList = user.collaborateList?.map(item => {
            if (item.userId === result.userId) {
              return {
                ...item,
                status: status, // Update the status
              };
            }
            return item;
          });

          return {
            ...user,
            collaborateList: updatedCollaborateList,
          };
        }
        return user;
      });
      //   dispatch(setAllUser(updatedUsers));
      showToast(`Collaboration ${status}ed successfully!`, 'success');
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
          userData={filteredUsers}
          notification={true}
          handleCollaborate={handleCollaborate}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
