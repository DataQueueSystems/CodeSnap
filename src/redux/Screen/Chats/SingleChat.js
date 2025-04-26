import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';
import React, {useState} from 'react';
import AppHeader from '../../../Component/AppHeader/Header';
import {useTheme, Text} from 'react-native-paper';
import Ionicon from 'react-native-vector-icons/Ionicons';

export default function SingleChat() {
  const {colors} = useTheme();
  const [message, setMessage] = useState('');
  const [chatList, setChatList] = useState([
    {id: '1', type: 'received', content: 'Hello! How can I help you today?'},
    {id: '2', type: 'sent', content: 'I need help with my app deployment.'},
    {
      id: '3',
      type: 'received',
      content: 'Sure! Are you facing any specific errors?',
    },
  ]);

  const handleSend = () => {
    if (message.trim() === '') return;
    const newMessage = {
      id: Date.now().toString(),
      type: 'sent',
      content: message,
    };
    setChatList(prev => [...prev, newMessage]);
    setMessage('');
  };

  const RenderIcon = () => {
    let path = 'Single Chat';
    return (
      <TouchableOpacity onPress={() => {}}>
        <Ionicon name="trash-outline" size={24} color={colors.error} />
      </TouchableOpacity>
    );
  };

  const RenderChatBubble = ({item}) => {
    const isSent = item.type === 'sent';
    return (
      <View
        className={`flex-row my-2 ${isSent ? 'justify-end' : 'justify-start'}`}>
        <View
          style={{
            backgroundColor: isSent ? colors.primary : colors.background_paper,
            maxWidth: '75%',
          }}
          className={`p-3 rounded-2xl ${
            isSent ? 'rounded-tr-none' : 'rounded-tl-none'
          }`}>
          <Text
            style={{
              color: isSent ? colors.onPrimary : colors.text_primary,
            }}
            className="text-sm font-regular">
            {item.content}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <>
      <SafeAreaView
        className="flex-1"
        style={{backgroundColor: colors.background_default}}>
        <View className="flex-1 px-3 pb-2">
          {/* Header */}
          <AppHeader screenName="AI chat" RenderIcon={RenderIcon} />

          {/* Chat List */}
          <FlatList
            data={chatList}
            keyExtractor={item => item.id}
            renderItem={({item}) => <RenderChatBubble item={item} />}
            contentContainerStyle={{paddingVertical: 10}}
            showsVerticalScrollIndicator={false}
          />

          {/* Message Input */}
          <View
            className="flex-row items-center px-3 py-2 rounded-2xl mb-6"
            style={{
              backgroundColor: colors.background_paper,
            }}>
            <TextInput
              placeholder="Type your message..."
              value={message}
              onChangeText={setMessage}
              placeholderTextColor={colors.text_disabled}
              className="flex-1 text-sm font-regular top-1"
              style={{color: colors.text_primary}}
            />
            <TouchableOpacity
              onPress={handleSend}
              className="ml-2 p-2 rounded-full"
              style={{
                backgroundColor: colors.primary,
              }}>
              <Ionicon name="send" size={19} color={colors.onPrimary} />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({});
