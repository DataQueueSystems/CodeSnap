import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useTheme, Text} from 'react-native-paper';
import Ionicon from 'react-native-vector-icons/Ionicons';
import Home from '../Home/Home';
import {isPlatformIOS} from '../../../../utils/global';

const Tab = createBottomTabNavigator();

const TabIcon = ({name, focused, theme}) => {
  let iconName = '';
  if (name === 'Home') {
    iconName = 'home-outline';
  } else if (name === 'People') {
    iconName = 'people-outline';
  } else if (name === 'People') {
    iconName = 'people-outline';
  } else if (name === 'Settings') {
    iconName = 'cog-outline';
  } else if (name === 'Chat') {
    iconName = 'chatbubbles-outline';
  }

  return (
    <Ionicon
      name={iconName}
      size={25}
      color={focused ? theme.colors.primary_main : theme.colors.iconGray}
    />
  );
};

const TabLabel = ({label, focused, theme}) => (
  <Text
    className="font-semi"
    style={{
      fontSize: 12,
      color: focused ? theme.colors.primary_main : theme.colors.iconGray,
    }}>
    {label}
  </Text>
);

export default function BottomNavigation() {
  const theme = useTheme();

  return (
    <View style={{flex: 1, backgroundColor: theme.colors.background_default}}>
      <Tab.Navigator
        screenOptions={({route}) => ({
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <TabIcon name={route.name} focused={focused} theme={theme} />
          ),
          tabBarLabel: ({focused}) => (
            <TabLabel label={route.name} focused={focused} theme={theme} />
          ),
          tabBarButton: props => (
            <TouchableOpacity {...props} activeOpacity={0.6} />
          ),
          tabBarHideOnKeyboard: true,
          tabBarStyle: {
            backgroundColor: theme.colors.background_default,
            borderTopWidth: 0,
            elevation: 5,
            height: isPlatformIOS ? 95 : 90,
            paddingTop: 8,
            shadowOpacity: 2,
            shadowRadius: 5,
            overflow: 'hidden',
          },
        })}>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="People" component={Home} />
        <Tab.Screen name="Chat" component={Home} />
        <Tab.Screen name="Settings" component={Home} />
      </Tab.Navigator>
    </View>
  );
}
