import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {Linking, StatusBar, View} from 'react-native';
import {useTheme} from 'react-native-paper';
import {getStoredcredential, getToken} from '../redux/slices/normalSlice';
import Loader from '../Component/Loader/Loader';
import Onboarding from '../redux/Screen/Auth/Onboarding';
import Login from '../redux/Screen/Auth/Login';
import Register from '../redux/Screen/Auth/Register';
import Parent from './Parent';
import SingleChat from '../redux/Screen/Chats/SingleChat';
import ViewProfile from '../redux/Screen/Profile/ViewProfile';
import EditProfile from '../redux/Screen/Profile/EditProfile';
import SingleUser from '../redux/Screen/Users/SingleUser';
const Stack = createNativeStackNavigator();
export default function AppNavigator() {
  const {token, tokenStatus, isConnected, loading} = useSelector(
    state => state?.normal,
  );
  let theme = useTheme();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getStoredcredential()); // Trigger the getToken action to check for the token
  }, [dispatch]);
  console.log(loading, 'loadingloadingloading');
  if (tokenStatus == 'loading' && loading == true) {
    // If status is loading, show a spinner
    return <Loader />;
  }

  const isDarkTheme = theme.colors.background_default === '#000000';
  let barStyle = isDarkTheme ? 'light-content' : 'dark-content';
  return (
    <>
      <StatusBar
        backgroundColor={theme.colors.background_default}
        barStyle={barStyle}
      />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          {tokenStatus === 'failed' ||
          (!token && tokenStatus === 'succeeded') ? (
            // (token && tokenStatus === 'succeeded') ? (
            // If token status is failed or no token, show onBoarding screen
            <Stack.Screen
              name="FirstScreen"
              component={Onboarding}
              options={{animation: 'fade_from_bottom'}}
            />
          ) : (
            <></>
          )}

          <Stack.Screen
            name="Parent"
            component={Parent}
            options={{animation: 'fade_from_bottom'}}
          />

          <Stack.Screen
            name="Login"
            component={Login}
            options={{animation: 'ios_from_right'}}
          />

          <Stack.Screen
            name="Register"
            component={Register}
            options={{animation: 'ios_from_right'}}
          />

          {/* View Profile */}
          <Stack.Screen
            name="ViewProfile"
            component={ViewProfile}
            options={{animation: 'ios_from_right'}}
          />

          {/* Edit Profile */}
          <Stack.Screen
            name="EditProfile"
            component={EditProfile}
            options={{animation: 'ios_from_right'}}
          />

          {/* single Chat */}
          <Stack.Screen
            name="Single Chat"
            component={SingleChat}
            options={{animation: 'fade_from_bottom'}}
          />
          {/* single user */}
          <Stack.Screen
            name="Single User"
            component={SingleUser}
            options={{animation: 'fade_from_bottom'}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
