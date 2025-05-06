import {Text, View, FlatList, Dimensions, TouchableOpacity} from 'react-native';
import React from 'react';
import {useTheme} from 'react-native-paper';
import {Activity_Opacity, hexToRgba} from '../../../utils/global';

export default function LisfofFilterCategory({
  categoryData,
  handlecategory,
  selectCategory,
}) {
  let {colors} = useTheme();
  const renderItem = ({item}) => {
    let isSelectedCategory = item?.value == selectCategory ? true : false;
    return (
      <TouchableOpacity
        onPress={() => handlecategory(item)}
        key={item?.id}
        activeOpacity={Activity_Opacity}>
        <View
          className={`rounded-lg p-1   ${
            isSelectedCategory ? 'shadow-sm' : ''
          } mx-1  my-1 `}
          style={{
            backgroundColor: isSelectedCategory
              ? colors.background_paper
              : hexToRgba(colors.background_paper, 0),
          }}>
          <Text
            className={'text-md px-2 font-regular'}
            style={{
              color: colors.text_primary,
            }}>
            {item?.name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View className="">
      <FlatList
        data={categoryData}
        horizontal
        keyExtractor={item => item.id}
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
        style={{marginVertical: 2}}
        contentContainerStyle={{paddingHorizontal: 5}}
      />
    </View>
  );
}
