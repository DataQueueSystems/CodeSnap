import React, {use} from 'react';
import {FlatList, Image, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import Loader from '../Loader/Loader';
import {useTheme, Text, Divider} from 'react-native-paper';
import {Activity_Opacity, hexToRgba} from '../../../utils/global';

import Ionicon from 'react-native-vector-icons/Ionicons';

export default function ListofChats({}) {
  const navigation = useNavigation();
  let {colors} = useTheme();
  const recentpaymentloading = false;

  const chatData = [
    {
      id: '1',
      label: 'Help Needed',
      content:
        'Hello! I’m stuck with my React Native navigation setup. Can you help me?',
      time: '2:43 PM',
    },
    {
      id: '2',
      label: 'Navigation Issue',
      content: 'Sure! Are you using React Navigation or a different library?',
      time: '2:44 PM',
    },
    {
      id: '3',
      label: 'Library Info',
      content: 'I’m using React Navigation v6.',
      time: '2:45 PM',
    },
    {
      id: '4',
      label: 'Version Support',
      content:
        'Perfect, v6 has great support! What specific problem are you facing?',
      time: '2:46 PM',
    },
    {
      id: '5',
      label: 'Problem Detail',
      content:
        'The stack navigation is not rendering the second screen on button press.',
      time: '2:47 PM',
    },
    {
      id: '6',
      label: 'Solution Tip',
      content:
        'Make sure you have correctly registered the second screen in your stack navigator.',
      time: '2:48 PM',
    },
  ];

  const RenderItem = ({chat, index}) => {
    const isLastItem = index === chatData.length - 1;

    return (
      <React.Fragment key={chat?.name}>
        <TouchableOpacity
          activeOpacity={Activity_Opacity}
          className="flex-row items-center  my-3.5 rounded-xl space-x-3 ">
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
            <Text className="text-md font-p_medium">{chat.label}</Text>
            <Text
              className="text-xs font-p_light"
              style={{color: colors.text_secondary}}>
              {chat?.content}
            </Text>
          </View>
          <Text className="text-xs font-p_light">{chat.time}</Text>
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
          <Text className="text-gray-500">No chats found</Text>
        </View>
      ) : (
        <FlatList
          data={chatData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => (
            <RenderItem chat={item} index={index} />
          )}
          contentContainerStyle={{paddingHorizontal: 2, paddingVertical: 2}}
          showsVerticalScrollIndicator={false}
        />
      )}
    </>
  );
}
