import React from 'react';
import {
  FlatList,
  View,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import Loader from '../Loader/Loader';
import {useTheme, Text, Divider} from 'react-native-paper';
import {
  Activity_Opacity,
  handleNavigate,
  hexToRgba,
} from '../../../utils/global';

import Ionicon from 'react-native-vector-icons/Ionicons';
import SmallBtn from '../Btn/SmallBtn';

export default function ListofUser({
  userData,
  notification,
  handleCollaborate,
}) {
  const navigation = useNavigation();
  const {colors} = useTheme();
  const recentpaymentloading = false;

  const RenderItem = ({user, index}) => {
    const isLastItem = index === userData.length - 1;
    const {username, designation, createdAt, sentByMe} = user;

    return (
      <React.Fragment key={user?.id}>
        <TouchableOpacity
          onPress={() => handleNavigate(navigation, 'Single User', user)}
          activeOpacity={Activity_Opacity}
          className="flex-row items-center my-3.5 rounded-xl space-x-3">
          <View
            className="w-10 h-10 rounded-full flex-row items-center justify-center shadow-2xl"
            style={{backgroundColor: colors.text_disabled}}>
            <Text className="text-xl uppercase text-white font-p_medium">
              {username?.charAt(0)?.toUpperCase()}
            </Text>
          </View>
          <View className="flex-1 space-y-0.5">
            <Text className="text-md font-p_medium">{username}</Text>
            {designation && (
              <Text className="text-xs font-p_light">{designation}</Text>
            )}
            <Text
              className="text-xs font-p_light"
              style={{color: colors.text_secondary}}>
              Joined on {moment(createdAt).format('MMM D, YYYY [at] h:mm A')}
            </Text>
          </View>

          {notification ? (
            !sentByMe ? (
              <View className="flex-row">
                <SmallBtn
                  label={'Accept'}
                  onPress={() =>
                    handleCollaborate(user.collaborationMeta.id, 'accepted')
                  }
                />
                <SmallBtn
                  label={'Reject'}
                  onPress={() =>
                    handleCollaborate(user.collaborationMeta.id, 'rejected')
                  }
                />
              </View>
            ) : (
              <View
                className="px-3 py-1 rounded-full"
                style={{backgroundColor: colors.primary}}>
                <Text
                  className="text-sm font-p_medium"
                  style={{color: colors.text_primary}}>
                  Pending
                </Text>
              </View>
            )
          ) : (
            <View
              className="p-2 rounded-full"
              style={{backgroundColor: colors.category}}>
              <Ionicon
                name="arrow-forward-outline"
                size={22}
                color={colors.text_secondary}
              />
            </View>
          )}
        </TouchableOpacity>

        {!isLastItem && (
          <Divider
            style={{
              backgroundColor: hexToRgba(colors.text_secondary, 0.1),
              height: 1,
            }}
          />
        )}
      </React.Fragment>
    );
  };

  return (
    <>
      {recentpaymentloading ? (
        <Loader />
      ) : userData?.length === 0 ? (
        <View className="flex-1 justify-center items-center mt-12">
          <Text className="text-gray-500 font-regular text-lg">
            {notification ? 'No pending requests' : 'No users found'}
          </Text>
        </View>
      ) : (
        <FlatList
          data={userData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => (
            <RenderItem user={item} index={index} />
          )}
          contentContainerStyle={{paddingHorizontal: 2, paddingVertical: 2}}
          showsVerticalScrollIndicator={false}
        />
      )}
    </>
  );
}
