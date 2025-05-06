import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import React, {useRef, useState, useEffect} from 'react';
import AppHeader from '../../../Component/AppHeader/Header';
import {useTheme, Text} from 'react-native-paper';
import Ionicon from 'react-native-vector-icons/Ionicons';
import {getCodeExplanation} from '../../slices/normalSlice';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';
import {showToast} from '../../../../utils/Toast';
import {useDispatch, useSelector} from 'react-redux';
import {getAllChatsForUser} from '../../slices/userSlice';

export default function SingleChat({route}) {
  let {data} = route.params || {};
  const {colors} = useTheme();
  let dispatch = useDispatch();
  const navigation = useNavigation();
  const [message, setMessage] = useState('');
  const {user, allUserChat} = useSelector(state => state.user);
  let userId = user?.id;

  useEffect(() => {
    if (data) {
      dispatch(getAllChatsForUser(data)); // data = uniqId
    }
  }, [data]);

  const [chatList, setChatList] = useState([
    {
      id: '1',
      type: 'received',
      content: 'Hello! Paste your code and I’ll explain it.',
    },
  ]);
  const [loading, setLoading] = useState(false);
  const flatListRef = useRef(null);

  // Get the matching chat based on the uniqId
  const currentChat = allUserChat?.find(chat => chat.key === `chat${data}`);

  useEffect(() => {
    if (currentChat?.messages) {
      setChatList(currentChat.messages);
      scrollToEnd();
    }
  }, [allUserChat, data]);

  const scrollToEnd = () => {
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({animated: true});
    }, 100); // slight delay to allow list update
  };

  const handleExplain = async userMessage => {
    const userMsg = {
      id: Date.now().toString(),
      type: 'sent',
      content: userMessage,
    };
    setChatList(prev => [...prev, userMsg]);
    scrollToEnd();
    setLoading(true);

    try {
      const result = await getCodeExplanation(userMessage);

      const botResponse = {
        id: (Date.now() + 1).toString(),
        type: 'received',
        content: result,
      };

      setChatList(prev => [...prev, botResponse]);
    } catch (err) {
      setChatList(prev => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          type: 'received',
          content: '❌ Something went wrong. Please try again later.',
        },
      ]);
    } finally {
      setLoading(false);
      scrollToEnd();
    }
  };

  const handleSend = () => {
    if (message.trim() === '') return;
    handleExplain(message.trim());
    setMessage('');
  };

  const pushChatHistory = async () => {
    const timestamp = Date.now();
    const isUpdating = !!data; // if data exists, we're updating
    const uniqId = isUpdating ? data : timestamp.toString();
    const chatKey = `chat${uniqId}`;

    const chatData = chatList.map(chat => ({
      uniqId: uniqId,
      type: chat.type,
      content: chat.content,
      timestamp: new Date().toISOString(),
    }));

    const label = chatList[2]?.content?.substring(0, 100) || 'Untitled Chat';

    try {
      // 1. Update or create chat messages
      await firestore()
        .collection('chats')
        .doc(userId)
        .set(
          {
            [chatKey]: {
              label: label,
              messages: chatData,
            },
          },
          {merge: true},
        );

      // 2. Only set label if creating a new chat
      if (!isUpdating) {
        await firestore()
          .collection('chatLabels')
          .doc(userId)
          .set(
            {
              [chatKey]: {
                label: label,
                uniqId: uniqId,
              },
            },
            {merge: true},
          );
      }
      showToast('Chat saved', 'success');
    } catch (error) {
      console.error('Error saving chat history or label: ', error);
    }
  };

  // const RenderIcon = () => (
  //   <TouchableOpacity onPress={() => setChatList([])}>
  //     <Ionicon name="trash-outline" size={24} color={colors.error} />
  //   </TouchableOpacity>
  // );

  const RenderChatBubble = ({item}) => {
    const isSent = item.type === 'sent';
    return (
      <View
        className={`flex-row my-2 ${isSent ? 'justify-end' : 'justify-start'}`}>
        <View
          style={{
            backgroundColor: isSent ? colors.primary : colors.background_paper,
            maxWidth: '85%',
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

  // Use this effect to trigger pushing chat history when navigating away
  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', () => {
      if (chatList.length > 2) {
        pushChatHistory(); // Only save if there is meaningful chat
      }
    });
    return unsubscribe;
  }, [navigation, chatList]);

  return (
    <SafeAreaView
      className="flex-1"
      style={{backgroundColor: colors.background_default}}>
      <View className="flex-1 px-3 pb-2">
        {/* Header */}
        <AppHeader
          screenName="AI Code Chat"
          // RenderIcon={RenderIcon}
        />
        {/* Chat List */}
        <FlatList
          ref={flatListRef}
          data={chatList}
          keyExtractor={item => item.id}
          renderItem={({item}) => <RenderChatBubble item={item} />}
          contentContainerStyle={{paddingVertical: 10}}
          showsVerticalScrollIndicator={false}
        />

        {/* Typing indicator */}
        {loading && (
          <View className="items-start mb-2 ml-1">
            <View
              style={{backgroundColor: colors.background_paper}}
              className="px-3 py-2 rounded-2xl rounded-tl-none flex-row space-x-2">
              <ActivityIndicator size="small" color={colors.primary} />
              <Text
                className="text-sm font-regular"
                style={{color: colors.text_disabled}}>
                Generating
              </Text>
            </View>
          </View>
        )}

        {/* Message Input */}
        <View
          className="flex-row items-center px-3 py-2 rounded-2xl mb-6"
          style={{
            backgroundColor: colors.background_paper,
          }}>
          <TextInput
            placeholder="Paste code here..."
            value={message}
            onChangeText={setMessage}
            placeholderTextColor={colors.text_disabled}
            className="flex-1 text-sm font-regular top-1"
            style={{color: colors.text_primary}}
            multiline
            returnKeyType="send"
            onSubmitEditing={handleSend}
            blurOnSubmit={true}
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
  );
}

const styles = StyleSheet.create({});
