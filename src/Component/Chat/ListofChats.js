import React, {use} from 'react';
import {FlatList, Image, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import Loader from '../Loader/Loader';
import {useTheme, Text, Divider} from 'react-native-paper';
import {
  Activity_Opacity,
  cleanLabel,
  handleNavigate,
  hexToRgba,
} from '../../../utils/global';

import Ionicon from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';

export default function ListofChats({chatData}) {
  let {colors} = useTheme();
  let navigation = useNavigation();
  const recentpaymentloading = false;
  const RenderItem = ({chat, index}) => {
    const isLastItem = index === chatData.length - 1;
    // Format the uniqId (which is a timestamp in ms)
    const formattedTime = moment(Number(chat?.uniqId)).format(
      'DD MMM, hh:mm A',
    );

    return (
      <React.Fragment key={chat?.uniqId}>
        <TouchableOpacity
          onPress={() =>
            handleNavigate(navigation, 'Single Chat', chat?.uniqId)
          }
          activeOpacity={Activity_Opacity}
          className="flex-row items-center  my-2 rounded-xl space-x-3 ">
          <TouchableOpacity
            activeOpacity={Activity_Opacity}
            className="p-2 rounded-full"
            style={{
              backgroundColor: colors.category,
            }}>
            <Ionicon
              name="chatbubbles-outline"
              size={22}
              color={colors.text_secondary}
            />
          </TouchableOpacity>
          <View className="flex-1">
            <Text className="text-xs font-p_light pb-1">{formattedTime}</Text>
            {/* Cleaned label */}
            <Text className="text-md font-p_medium">
              {cleanLabel(chat?.label)}
            </Text>
            <Text
              className="text-xs font-p_light"
              style={{color: colors.text_secondary}}>
              {chat?.content}
            </Text>
          </View>
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
      ) : chatData?.length === 0 ? (
        <View className="flex-1 justify-center items-center mt-12">
          <Text className="text-lg font-regular">No chats found</Text>
        </View>
      ) : (
        <FlatList
          data={chatData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => (
            <RenderItem chat={item} index={index} />
          )}
          contentContainerStyle={{paddingHorizontal: 2, }}
          showsVerticalScrollIndicator={false}
        />
      )}
    </>
  );
}
