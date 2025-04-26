import React, {use} from 'react';
import {FlatList, Image, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import Loader from '../Loader/Loader';
import {useTheme, Text, Divider} from 'react-native-paper';
import {Activity_Opacity, hexToRgba} from '../../../utils/global';

import Ionicon from 'react-native-vector-icons/Ionicons';

export default function ListofUser({}) {
  const navigation = useNavigation();
  let {colors} = useTheme();
  const recentpaymentloading = false;

  const userData = [
    {
      name: 'Alice Johnson',
      createdAt: '2025-04-20T09:00:00Z',
      amount: 900,
      image: 'https://via.placeholder.com/100',
      category: 'Student',
    },
    {
      name: 'Bob Lee',
      createdAt: '2025-04-22T14:30:00Z',
      image: 'https://via.placeholder.com/100',
      category: 'Student',
    },
    {
      name: 'Alice Johnson',
      createdAt: '2025-04-20T09:00:00Z',
      amount: 900,
      image: 'https://via.placeholder.com/100',
      category: 'Software Developer',
    },
    {
      name: 'Bob Lee',
      createdAt: '2025-04-22T14:30:00Z',
      image: 'https://via.placeholder.com/100',
      category: 'Software Engineer',
    },
  ];
  const RenderItem = ({user, index}) => {
    const isLastItem = index === userData.length - 1;

    return (
      <React.Fragment key={user?.name}>
        <TouchableOpacity
          activeOpacity={Activity_Opacity}
          className="flex-row items-center  my-3.5 rounded-xl space-x-3 ">
          <View
            className="w-10 h-10 rounded-full flex-row items-center justify-center shadow-2xl "
            style={{backgroundColor: colors.text_disabled}}>
            <Text
              className="text-xl uppercase text-white font-p_medium"
              style={{}}>
              A
            </Text>
          </View>
          <View className="flex-1 space-y-0.5">
            <Text className="text-md font-p_medium">{user.name}</Text>
            <Text className="text-xs font-p_light">{user?.category}</Text>
            <Text
              className="text-xs font-p_light"
              style={{color: colors.text_secondary}}>
              Joined on {moment().format('MMM D, YYYY')}
            </Text>
          </View>

          <TouchableOpacity
            activeOpacity={Activity_Opacity}
            className="p-2 rounded-full"
            style={{
              backgroundColor: colors.category,
            }}>
            <Ionicon
              name="arrow-forward-outline"
              size={22}
              color={colors.text_secondary}
            />
          </TouchableOpacity>
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
          <Text className="text-gray-500">No users found</Text>
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
