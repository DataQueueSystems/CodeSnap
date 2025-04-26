import React from 'react';
import {Appbar, useTheme} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {Iconify} from 'react-native-iconify';
import CustomText from '../CustomText/CustomText';
import {fonts} from '../CustomText/fonts';

export default function AppHeader({
  screenName,
  backIcon,
  RenderIcon,
  absolute,
  RenderMenu,
}) {
  const theme = useTheme();
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
    : {backgroundColor: theme.colors.background_default, height: 50};

  return (
    <Appbar.Header style={[absoluteStyle]}>
      {backIcon !== false && (
        <Appbar.Action
          animated={false}
          icon={() => (
            <Iconify
              icon="weui:back-filled" // Custom icon name
              size={24}
              color={
                absolute
                  ? theme.colors.text_secondary
                  : theme.colors.text_primary
              }
              style={{alignSelf: 'center'}}
            />
          )}
          onPress={handleBackPress}
          style={{
            backgroundColor: theme.colors.background_default,
          }}
        />
      )}
      <Appbar.Content
        title={screenName}
        titleStyle={{
          fontSize: 17,
          fontFamily: fonts.Medium,
          color: theme.colors.text_primary,
          left: !backIcon ? 0 : 0,
        }}
      />
      {RenderIcon && <RenderIcon />}
      {RenderMenu && <RenderMenu />}
    </Appbar.Header>
  );
}
