import {MD3LightTheme, MD3DarkTheme} from 'react-native-paper';

const commonColors = {
  primary_lighter: '#CDE9FD',
  primary_light: '#6BB1F8',
  primary_main: '#0C68E9',
  primary_dark: '#063BA7',
  primary_darker: '#021D6F',

  error_lighter: '#FFE9D5',
  error_light: '#FFAC82',
  error_main: '#EA454C',
  error_dark: '#B71D18',
  error_darker: '#7A0916',

  iconGray: '#676D75',
  iconhigh: '#ABB7C2',

  new: '#676D75',
  reconsidered: '#EA454C',
  ongoing: '#1890ff',
  blue: '#1890ff',
  completed: '#01AB55',

  header: '#141a2114',
  divider: '#1C252F',
  warning: 'rgb(255 192 8)',
};
export const lightTheme = {
  ...MD3LightTheme,
  custom: 'lightTheme',
  colors: {
    ...MD3LightTheme.colors,
    ...commonColors,
    background_paper: '#FFFFFF',
    background_default: '#F4F6F8',
    background_neutral: '#F4F6F8',
    text_primary: '#1C252E',
    text_secondary: '#637381',
    text_disabled: '#919EAB',
    category: 'rgb(244 246 248)',

    // Primary overrides for Paper components
    primary: commonColors.primary_main,
    onPrimary: '#FFFFFF',
    blueText: '#063BA7',
    
  },
  roundness: 14,
};
export const darkTheme = {
  ...MD3DarkTheme,
  custom: 'darkTheme',
  colors: {
    ...MD3DarkTheme.colors,
    ...commonColors,
    background_paper: '#1C252E',
    background_default: '#000000',
    background_neutral: '#28323D',
    text_primary: '#FFFFFF',
    text_secondary: '#919EAB',
    text_disabled: '#637381',
    category: 'rgb(51 61 73)',

    // Primary overrides for Paper components
    primary: commonColors.primary_main,
    onPrimary: '#FFFFFF',
    blueText:"#bfdbfe"
  },
  roundness: 14,
};
