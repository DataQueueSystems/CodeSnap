import {View, Text} from 'react-native';
import React from 'react';
import {useTheme} from 'react-native-paper';

export default function ListOfCard() {
  let {colors} = useTheme();
  const skills = [
    {id: 1, name: 'React'},
    {id: 2, name: 'Next.js'},
    {id: 3, name: 'React Native'},
    {id: 4, name: 'Node.js'},
    {id: 5, name: 'TypeScript'},
  ];

  return (
    <View className="flex-row flex-wrap gap-2 px-2">
      {skills.map(skill => (
        <View
          key={skill.id}
          className="px-4 py-2 rounded-xl "
          style={{backgroundColor: colors.background_paper}}>
          <Text
            className="text-sm  font-regular"
            style={{color: colors.blueText}}>
            {skill.name}
          </Text>
        </View>
      ))}
    </View>
  );
}
