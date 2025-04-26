import React, {useEffect} from 'react';
import {PaperProvider} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {Appearance} from 'react-native';
import AppNavigator from './AppNavigator';
import {loadTheme, setTheme} from '../redux/slices/themeSlice';
import {darkTheme, lightTheme} from '../theme/appTheme';
import {subscribeToNetwork} from '../redux/slices/normalSlice';

export default function AppWithTheme() {
  const themes = useSelector(state => state.theme); // Redux state for theme
  const dispatch = useDispatch(); // Dispatch function

  useEffect(() => {
    // Load theme on app start
    dispatch(loadTheme());
    // Subscribe to network changes and clean up on unmount
    const unsubscribeNetwork = subscribeToNetwork(dispatch);
    // Add system appearance listener
    const listener = Appearance.addChangeListener(({colorScheme}) => {
      dispatch(setTheme(colorScheme));
    });
    // Cleanup listeners on unmount
    return () => {
      unsubscribeNetwork(); // Unsubscribe NetInfo
      listener.remove(); // Remove theme listener
    };
  }, [dispatch]);

  const currentTheme = themes.theme == 'dark' ? darkTheme : lightTheme;
  return (
    <>
      {/* Paper Provider for REACT-NATIVE-PAPER */}
      <PaperProvider theme={currentTheme}>
        {/* Theme Provider to provide the theme */}
        <AppNavigator />
        {/* Main App Navigator */}
      </PaperProvider>
    </>
  );
}
