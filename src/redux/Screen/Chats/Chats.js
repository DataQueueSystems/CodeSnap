import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {useTheme} from 'react-native-paper';
import AppHeader from '../../../Component/AppHeader/Header';
import SearchInput from '../../../Component/Input/SearchInput';
import Ionicon from 'react-native-vector-icons/Ionicons';
import ListofChats from '../../../Component/Chat/ListofChats';
import {handleNavigate} from '../../../../utils/global';
import {useNavigation} from '@react-navigation/native';

export default function Chats() {
  let {colors} = useTheme();
  let navigation = useNavigation();

  const RenderIcon = () => {
    let path = 'Single Chat';
    return (
      <>
        <TouchableOpacity onPress={() => handleNavigate(navigation, path)}>
          <Ionicon name="add-circle-outline" size={36} color={colors.primary} />
        </TouchableOpacity>
      </>
    );
  };

  return (
    <>
      <SafeAreaView
        className="flex-1"
        style={{backgroundColor: colors.background_default}}>
        <View className="flex-1 px-3">
          <AppHeader
            backIcon={false}
            screenName="Chats"
            RenderIcon={RenderIcon}
          />
          <View className="my-3">
            <SearchInput
              // onChangeText={handleSearchChange}
              placeholder="Search here"
              onPress={() => {}}
            />
          </View>
          <ListofChats />
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({});
