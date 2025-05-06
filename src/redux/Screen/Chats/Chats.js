import React, {useState, useMemo} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';
import {useTheme} from 'react-native-paper';
import AppHeader from '../../../Component/AppHeader/Header';
import SearchInput from '../../../Component/Input/SearchInput';
import Ionicon from 'react-native-vector-icons/Ionicons';
import ListofChats from '../../../Component/Chat/ListofChats';
import {handleNavigate} from '../../../../utils/global';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';

export default function Chats() {
  const {colors} = useTheme();
  const navigation = useNavigation();
  const {chatLabels} = useSelector(state => state.user);
  const [searchText, setSearchText] = useState('');

  // Filter chatLabels by label text
  const filteredChats = useMemo(() => {
    if (!searchText) return chatLabels;
    return chatLabels.filter(chat =>
      chat.label?.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [searchText, chatLabels]);

  const RenderIcon = () => {
    const path = 'Single Chat';
    return (
      <TouchableOpacity onPress={() => handleNavigate(navigation, path)}>
        <Ionicon name="add-circle-outline" size={36} color={colors.primary} />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.background_default}}>
      <View style={{flex: 1, paddingHorizontal: 12}}>
        <AppHeader
          backIcon={false}
          screenName="Chats"
          RenderIcon={RenderIcon}
        />
        <View style={{marginVertical: 12}}>
          <SearchInput
            placeholder="Search chat"
            value={searchText}
            onChangeText={text => setSearchText(text)}
          />
        </View>
        <ListofChats chatData={filteredChats} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
