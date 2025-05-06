import {StyleSheet, View} from 'react-native';
import React from 'react';
import ListofUser from '../../../Component/User/ListofUser';
import {Divider, useTheme} from 'react-native-paper';
import CategoryHeader from '../../../Component/AppHeader/CategoryHeader';
import {hexToRgba} from '../../../../utils/global';
import {useSelector} from 'react-redux';

export default function UserCard() {
  let {colors} = useTheme();
  const {user, alluser} = useSelector(state => state.user);

  // Filter the collaborated users
  let collaboratedUser = alluser?.filter(userItem =>
    userItem?.collaborateList?.some(
      collaborator => collaborator?.userId === user?.id,
    ),
  );

  return (
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
  );
}

const styles = StyleSheet.create({});
