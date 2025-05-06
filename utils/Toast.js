import {StyleSheet, View} from 'react-native';
import Toast from 'react-native-toast-message';
import {isPlatformIOS, Wwidth} from './global';
import {Text} from 'react-native-paper';

// ✅ Show Toast Function
const showToast = (message, type = 'success') => {
  const toastParams = {
    type,
    text1: message,
    visibilityTime: 2000,
    autoHide: true,
    topOffset: isPlatformIOS ? 60 : 20,
    bottomOffset: 20,
  };
  Toast.show(toastParams);
};

// ✅ Toast UI Config (No LinearGradient)
const toastConfig = {
  success: ({text1}) => (
    <View style={[styles.toastContainer, {backgroundColor: '#063BA7'}]}>
      <Text
        numberOfLines={1}
        ellipsizeMode="tail"
        className="text-md font-regular"
        style={{color: '#fff', fontFamily: 'Poppins-Regular'}}>
        {text1}
      </Text>
    </View>
  ),
  error: ({text1}) => (
    <View style={[styles.toastContainer, {backgroundColor: '#063BA7'}]}>
      <Text
        numberOfLines={1}
        ellipsizeMode="tail"
        className="text-md font-regular"
        style={{color: '#fff', fontFamily: 'Poppins-Regular'}}>
        {text1}
      </Text>
    </View>
  ),
};

// ✅ Toast Container Styles
const styles = StyleSheet.create({
  toastContainer: {
    padding: isPlatformIOS ? 0 : 12,
    marginTop: 24,
    height: 50,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    width: Wwidth - 35,
  },
});

export {showToast, toastConfig};
