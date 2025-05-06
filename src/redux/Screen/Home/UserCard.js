import {StyleSheet, View} from 'react-native';
import React from 'react';
import ListofUser from '../../../Component/User/ListofUser';
import {Divider, Text, useTheme} from 'react-native-paper';
import CategoryHeader from '../../../Component/AppHeader/CategoryHeader';
import {handleNavigate, hexToRgba} from '../../../../utils/global';
import {useSelector} from 'react-redux';
import SmallBtn from '../../../Component/Btn/SmallBtn';
import {useNavigation} from '@react-navigation/native';

export default function UserCard() {
  let {colors} = useTheme();
  let navigation = useNavigation();
  const {user, alluser} = useSelector(state => state.user);

  // Filter the collaborated users
  let collaboratedUser = alluser?.filter(userItem =>
    userItem?.collaborateList?.some(
      collaborator => collaborator?.userId === user?.id && collaborator?.status!=="revoke",
    ),
  );

  return (
    <>
      {collaboratedUser?.length == 0 ? (
        <>
          <View className="flex-column space-y-3">
            <Text className="text-xl font-p_medium capitalize text-center px-3">
              Start Your Collaboration
            </Text>
            <View className="flex-row justify-center">
              <SmallBtn
                label={'Collaboration'}
                onPress={() => handleNavigate(navigation, 'People')}
              />
            </View>
          </View>
        </>
      ) : (
        <View
          className="bg-red-300 mx-3 rounded-2xl shadow-2xl my-5"
          style={{
            backgroundColor: colors.background_paper,
          }}>
          <View className="px-2 mt-3">
            <CategoryHeader
              category="Collaborated User"
              navigationPath={'People'}
            />
            <Divider
              style={{
                backgroundColor: hexToRgba(colors.text_disabled, 0.1),
                height: 1,
              }}
            />
          </View>
          <View className="px-3">
            {/* Displaying the filtered collaborated users, or limit to 4 */}
            <ListofUser userData={collaboratedUser?.slice(0, 4)} />
          </View>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({});
