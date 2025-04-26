import moment from 'moment';
import {Dimensions as deviceDimension, Platform} from 'react-native';
const Wwidth = deviceDimension.get('window').width;
const Wheight = deviceDimension.get('window').height;
const Activity_Opacity = 0.9;
const Activity_Opacity2 = 0.4;
const rippleColor = 'rgba(145 158 171 / 0.24)';
const isPlatformIOS = Platform.OS == 'ios';

const hexToRgba = (hex, alpha = 1) => {
  let r = parseInt(hex.substring(1, 3), 16);
  let g = parseInt(hex.substring(3, 5), 16);
  let b = parseInt(hex.substring(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};
const handleNavigate = (navigation,path) => {
  navigation.navigate(path);
};

const getGreeting = () => {
  const hour = moment().hour(); // Get the current hour (0-23)
  if (hour >= 5 && hour < 12) {
    return 'Good morning';
  } else if (hour >= 12 && hour < 17) {
    return 'Good afternoon';
  } else if (hour >= 17 && hour < 21) {
    return 'Good evening';
  } else {
    return 'Good night';
  }
};


export {
  Wwidth,
  Wheight,
  Activity_Opacity,
  Activity_Opacity2,
  rippleColor,
  hexToRgba,
  isPlatformIOS,
  handleNavigate,
  getGreeting
};
