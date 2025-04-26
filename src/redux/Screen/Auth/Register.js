import {
  BackHandler,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Text, useTheme, IconButton} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {useDispatch, useSelector} from 'react-redux';
import PrimaryBtn from '../../../Component/Btn/PrimaryBtn';
import InputField from '../../../Component/Input/InputField';
import {clearLoginError, RegisterUser} from '../../slices/userSlice';
import Ionicon from 'react-native-vector-icons/Ionicons';
import {Activity_Opacity, handleNavigate} from '../../../../utils/global';

export default function Register() {
  const {colors} = useTheme();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const {isLogining, isloginError} = useSelector(state => state.user);

  const RegisterScheme = Yup.object().shape({
    email: Yup.string()
      .email('Enter a valid email')
      .required('Email is required'),
    password: Yup.string().min(4, 'Too short').required('Password is required'),
  });

  const onSubmit = async values => {
    console.log(values);
    // Your login dispatch here
    dispatch(RegisterUser(values));
  };

  return (
    <>
      <SafeAreaView
        style={{flex: 1, backgroundColor: colors.background_default}}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={{flex: 1}}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View className="flex-1 justify-center px-5">
              <View className="items-center justify-center py-4">
                <Image
                  source={require('../../../../assets/image/logo.png')}
                  className="h-20 w-20 rounded-full shadow-2xl"
                  style={{
                    shadowColor: colors.primary_main,
                  }}
                />
              </View>

              <View className="mb-10 items-center">
                <Text
                  className="text-2xl font-semi  "
                  style={{color: colors.text_primary}}>
                  Sign Up to CodeSnap
                </Text>
              </View>

              <Formik
                initialValues={{email: '', password: ''}}
                validationSchema={RegisterScheme}
                onSubmit={onSubmit}>
                {({
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  values,
                  errors,
                  touched,
                }) => (
                  <>
                    <View className="absolute top-12 left-5">
                      <Ionicon
                        onPress={() => navigation.goBack()}
                        name="chevron-back-outline"
                        size={29}
                        color={colors.text_secondary}
                      />
                    </View>
                    <InputField
                      placeholder="Enter email"
                      value={values.email}
                      label="Email"
                      onChangeText={text => {
                        if (isloginError) dispatch(clearLoginError());
                        handleChange('email')(text);
                      }}
                      onBlur={handleBlur('email')}
                      error={errors.email}
                      touched={touched.email}
                      leftIcon="email"
                    />

                    <InputField
                      placeholder="Enter password"
                      value={values.password}
                      label="Password"
                      onChangeText={text => {
                        if (isloginError) dispatch(clearLoginError());
                        handleChange('password')(text);
                      }}
                      onBlur={handleBlur('password')}
                      error={errors.password}
                      touched={touched.password}
                      secureTextEntry={!showPassword}
                      leftIcon="lock"
                      rightIcon={
                        <IconButton
                          icon={showPassword ? 'eye-off' : 'eye'}
                          onPress={() => setShowPassword(prev => !prev)}
                        />
                      }
                    />

                    <View style={{marginTop: 24}}>
                      <PrimaryBtn
                        disabled={isLogining}
                        onSubmit={handleSubmit}
                        label={isLogining ? 'Loading...' : 'Register'}
                      />
                    </View>
                    <TouchableOpacity
                      onPress={() => navigation.goBack()}
                      activeOpacity={Activity_Opacity}
                      className="mt-4 items-center">
                      <Text
                        className="text-md font-semi underline "
                        style={{color: colors.primary_light}}>
                        I Already Have An Account
                      </Text>
                    </TouchableOpacity>
                  </>
                )}
              </Formik>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
}
