import React, {useEffect} from 'react';
import RNBootSplash from 'react-native-bootsplash';
import {Provider} from 'react-redux';
import store from './src/redux/store/store';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import AppWithTheme from './src/main-navigator/AppwithTheme';
import {ContextProvider} from './src/AuthContext/FuncContext.js';
import { toastConfig } from './utils/Toast.js';
import Toast from 'react-native-toast-message';


export default function App() {
  useEffect(() => {
    // Hide the splash screen with fade effect after a delay
    setTimeout(() => {
      RNBootSplash.hide({fade: true, duration: 500});
    }, 200); // Set the time duration for which the splash screen is visible
    return () => {};
  }, []);
  return (
    <>
      {/* this gesture handler for bottom sheet */}
      <GestureHandlerRootView className="flex-1">
        <Provider store={store}>
        <ContextProvider>
          <AppWithTheme />
          </ContextProvider>
        </Provider>
      </GestureHandlerRootView>


        {/* For Toast Message  */}
        <Toast config={toastConfig} />
    </>
  );
}
