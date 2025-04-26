import React from 'react';
import {Text, TextInput, useTheme} from 'react-native-paper';
import {hexToRgba} from '../../../utils/global';
import {View} from 'react-native';
const InputField = ({
  label,
  placeholder,
  value,
  onChangeText,
  keyboardType = 'default',
  secureTextEntry = false,
  onBlur,
  error,
  touched,
  limit,
}) => {
  let {colors} = useTheme();
  return (
    <>
      <View className="flex-column  ">
        {label && (
          <Text
            className="font-semi"
            style={{
              color: colors.text_secondary,
            }}>
            {label}
          </Text>
        )}

        <TextInput
          maxLength={limit}
          value={value}
          onChangeText={onChangeText}
          style={{
            backgroundColor: 'transparent',
            height: 49,
          }}
          className="rounded-2xl h-12 text-md px-1 my-1"
          mode="outlined"
          placeholder={placeholder}
          placeholderTextColor={colors.gray}
          onBlur={onBlur}
          error={error}
          theme={{
            colors: {
              primary: colors.primary_light,
              outline: hexToRgba(colors.primary_main, 0.3), // Border color when not focused
              error: hexToRgba(colors.error_main, 0.3), // Border color when not focused
            },
          }}
          contentStyle={{
            fontFamily: 'Poppins-Regular',
            fontSize: 14,
            top: 2,
          }}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry}
        />

        {/* Error Message */}
        {error && touched && (
          <Text
            className={'text-xs mb-1.5 font-regular'}
            style={{
              color: colors.error_main,
            }}>
            {error}
          </Text>
        )}
      </View>
    </>
  );
};

export default InputField;
