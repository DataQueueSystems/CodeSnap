import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useState, useMemo} from 'react';
import {useTheme} from 'react-native-paper';
import AppHeader from '../../../Component/AppHeader/Header';
import ListofUser from '../../../Component/User/ListofUser';
import SearchInput from '../../../Component/Input/SearchInput';
import {useSelector} from 'react-redux';
import LisfofFilterCategory from '../../../Component/Filter/ListofFilterCategory';

export default function User() {
  const {colors} = useTheme();
  const {alluser, user} = useSelector(state => state.user); // Extracting user and alluser from Redux state

  const [searchText, setSearchText] = useState('');
  const [selectCategory, setselectCategory] = useState('All');

  const loggedInUserId = user?.id; // Get the logged-in user ID

  // Filter users based on username, email, or designation, and selected category
  const filteredUsers = useMemo(() => {
    let filtered = alluser;

    // Filter based on search text
    if (searchText) {
      filtered = filtered.filter(u =>
        [u.username, u.email, u.designation].some(f =>
          f?.toLowerCase().includes(searchText.toLowerCase()),
        ),
      );
    }

    // Filter based on category selection
    if (selectCategory !== 'All') {
      filtered = filtered.filter(u =>
        u?.collaborateList?.some(
          collaborator =>
            collaborator?.userId === loggedInUserId &&
            collaborator?.status !== 'revoke',
        ),
      );
    }

    return filtered;
  }, [searchText, selectCategory, alluser, loggedInUserId]);

  const categoryData = [
    {
      name: 'All',
      value: 'All',
    },
    {
      name: 'Collaborator',
      value: 'Collaborator',
    },
  ];

  const handleCategoryChange = category => {
    setselectCategory(category?.value);
  };

  return (
    <SafeAreaView
      className="flex-1"
      style={{backgroundColor: colors.background_default}}>
      <View className="flex-1 px-3">
        <AppHeader backIcon={false} screenName={'Users'} />
        <SearchInput
          placeholder="Search by name, email, or role"
          onChangeText={text => setSearchText(text)}
        />
        <LisfofFilterCategory
          categoryData={categoryData}
          handlecategory={handleCategoryChange}
          selectCategory={selectCategory}
        />
        <ListofUser userData={filteredUsers} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
