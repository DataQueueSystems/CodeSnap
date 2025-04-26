import React from 'react';
import {Appbar, useTheme} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import Ionicon from 'react-native-vector-icons/Ionicons';

export default function AppHeader({
  screenName,
  backIcon,
  RenderIcon,
  absolute,
  RenderMenu,
}) {
  const {colors} = useTheme();
  const navigation = useNavigation();

  const handleBackPress = () => {
    navigation.goBack();
  };

  const absoluteStyle = absolute
    ? {
        position: 'absolute',
        top: 0,
        zIndex: 10,
        left: 0,
        right: 0,
        backgroundColor: 'transparent',
      }
    : {backgroundColor: colors.background_default, height: 50};

  return (
    <Appbar.Header style={[absoluteStyle]}>
      {backIcon !== false && (
        <Appbar.Action
          animated={false}
          icon={() => (
            <Ionicon
              name="chevron-back-outline"
              size={22}
              color={colors.text_secondary}
              style={{alignSelf: 'center'}}
            />
          )}
          onPress={handleBackPress}
          style={{
            backgroundColor: colors.background_default,
          }}
        />
      )}
      <Appbar.Content
        title={screenName}
        titleStyle={{
          fontSize: 17,
          textAlign: 'center',
          fontFamily: 'Poppins-Medium',
          color: colors.text_primary,
          left: !backIcon ? 0 : 0,
        }}
      />
      {RenderIcon && <RenderIcon />}
      {RenderMenu && <RenderMenu />}
    </Appbar.Header>
  );
}
