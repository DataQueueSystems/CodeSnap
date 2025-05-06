import { StyleSheet,  View } from 'react-native'
import React from 'react'
import { useTheme,Text, } from 'react-native-paper'
import SmallBtn from '../Btn/SmallBtn';
import moment from 'moment';

export default function UserProfile({user}) {
    let {colors}=useTheme();
  return (
   <>

     {/* Profile Header */}
     <View className="flex-row space-x-3 items-center my-2">
          <View
            className="w-16 h-16 rounded-full items-center justify-center"
            style={{backgroundColor: colors.primary_main}}>
            <Text className="text-4xl uppercase text-white font-regular">
              {user?.username?.charAt(0) || ''}
            </Text>
          </View>
          <View className="flex-1">
            <Text className="text-lg font-regular">{user?.username}</Text>
            {!!user?.designation && (
              <Text
                className="text-md font-regular"
                style={{color: colors.text_secondary}}>
                {user?.designation}
              </Text>
            )}
          </View>
        </View>

        {/* Collaboration & Joined Date */}
        <View className="flex-row items-center justify-between my-2">
          {!!user?.collaboration && (
            <SmallBtn label={`Collaboration: ${user?.collaboration}`} />
          )}
          <Text
            className="text-xs font-p_light"
            style={{color: colors.text_disabled}}>
            Joined on {moment(user?.createdAt).format('MMM D, YYYY')}
          </Text>
        </View>

        {/* Contribution */}
        {!!user?.contribution && (
          <View className="px-1 my-2">
            <Text className="text-sm font-regular">{user?.contribution}</Text>
          </View>
        )}

   
   </>
  )
}

const styles = StyleSheet.create({})