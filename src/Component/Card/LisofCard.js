import {View, Text} from 'react-native';
import React from 'react';
import {useTheme} from 'react-native-paper';

export default function ListOfCard({data}) {
  let {colors} = useTheme();

  return (
    <View className="flex-row flex-wrap gap-2 px-2">
      {data?.map((skill, index) => (
        <View
          key={index + 1}
          className="px-4 py-2 rounded-xl "
          style={{backgroundColor: colors.background_paper}}>
          <Text
            className="text-sm  font-regular"
            style={{color: colors.blueText}}>
            {skill}
          </Text>
        </View>
      ))}
    </View>
  );
}
