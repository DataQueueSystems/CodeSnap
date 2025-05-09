import {StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import ListofUser from '../../../Component/User/ListofUser';
import {Divider, Text, useTheme} from 'react-native-paper';
import CategoryHeader from '../../../Component/AppHeader/CategoryHeader';
import {handleNavigate, hexToRgba} from '../../../../utils/global';
import {useDispatch, useSelector} from 'react-redux';
import SmallBtn from '../../../Component/Btn/SmallBtn';
import {useNavigation} from '@react-navigation/native';
import {getAllCollaborationsByLoggedInUser} from '../../slices/userSlice';

export default function UserCard() {
  let {colors} = useTheme();
  const dispatch = useDispatch();
  let navigation = useNavigation();
  const {user, allCollaborations, alluser} = useSelector(state => state.user);

  const loggedInUserId = user?.id;

  const [collaboratedUsers, setCollaboratedUsers] = useState([]);
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

    const allCollaborated = allCollaborations
      .filter(
        item =>
          (item.from === loggedInUserId || item.to === loggedInUserId) &&
          item.status !== 'rejected' && // Exclude rejected collaborations
          item.status !== 'pending', // Exclude pending collaborations
      )
      .map(item => {
        const otherUserId = item.from === loggedInUserId ? item.to : item.from;
        const userProfile = alluser.find(u => u.id === otherUserId);

        return userProfile
          ? {
              ...userProfile,
              collaborationMeta: item,
              sentByMe: item.from === loggedInUserId, // ✅ Add flag to know if collaboration was sent by the logged-in user
            }
          : null;
      })
      .filter(Boolean); // Remove null values from the final list

    setCollaboratedUsers(allCollaborated);
  }, [allCollaborations, alluser, loggedInUserId]);

  return (
    <>
      {collaboratedUsers?.length === 0 ? (
        <View className="flex-column space-y-3 items-center justify-center px-3 py-5">
          <Text className="text-xl font-p_medium capitalize text-center">
            Start Your Collaboration
          </Text>
          <SmallBtn
            label="Collaboration"
            onPress={() => handleNavigate(navigation, 'People')}
          />
        </View>
      ) : (
        <View
          className="mx-3 my-5 rounded-2xl shadow-2xl"
          style={{backgroundColor: colors.background_paper}}>
          <View className="px-3 mt-3">
            <CategoryHeader
              category="Collaborated Users"
              navigationPath="People"
            />
            <Divider
              style={{
                backgroundColor: hexToRgba(colors.text_disabled, 0.1),
                height: 1,
              }}
            />
          </View>
          <View className="px-3 py-3">
            {/* Displaying all collaborated users, or limit to 4 */}
            <ListofUser userData={collaboratedUsers?.slice(0, 4)} />
          </View>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({});
