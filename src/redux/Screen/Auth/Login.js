import {
  Alert,
  BackHandler,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
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
import {clearLoginError} from '../../slices/userSlice';
import {handleNavigate, isPlatformIOS} from '../../../../utils/global';
import Ionicon from 'react-native-vector-icons/Ionicons';

export default function Login() {
  const {colors} = useTheme();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const {isLogining, isloginError} = useSelector(state => state.user);
  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email('Enter a valid email')
      .required('Email is required'),
    password: Yup.string().min(4, 'Too short').required('Password is required'),
  });

  const onSubmit = async values => {
    console.log(values);
    navigation.navigate("Parent")
    // Your login dispatch here
  };

  return (
    <>
      <SafeAreaView
        style={{flex: 1, backgroundColor: colors.background_default}}>
        <KeyboardAvoidingView
          behavior={isPlatformIOS === 'ios' ? 'padding' : undefined}
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
                  Sign In to CodeSnap
                </Text>
              </View>

              <Formik
                initialValues={{email: '', password: ''}}
                // validationSchema={LoginSchema}
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
                        label={isLogining ? 'Loading...' : 'Login'}
                      />
                      <PrimaryBtn
                        disabled={true}
                        onSubmit={() => handleNavigate(navigation, 'Register')}
                        label={isLogining ? 'Loading...' : 'Create New Account'}
                      />
                    </View>
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
