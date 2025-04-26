import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useTheme} from 'react-native-paper';
import AppHeader from '../../../Component/AppHeader/Header';
import ListofUser from '../../../Component/User/ListofUser';
import SearchInput from '../../../Component/Input/SearchInput';

export default function User() {
  let {colors} = useTheme();
  return (
    <>
      <SafeAreaView
        className="flex-1"
        style={{backgroundColor: colors.background_default}}>
        <View className="flex-1 px-3 ">
          <AppHeader backIcon={false} screenName={'Users'} />
          <SearchInput
              // onChangeText={handleSearchChange}
              placeholder="Search here"
              onPress={() => {}}
            />
          <ListofUser />
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({});
