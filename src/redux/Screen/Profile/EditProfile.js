import {
  Keyboard,
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  ScrollView,
  Alert,
} from 'react-native';
import React, {useRef} from 'react';
import {HelperText, useTheme} from 'react-native-paper';
import AppHeader from '../../../Component/AppHeader/Header';
import {isPlatformIOS} from '../../../../utils/global';
import {Formik} from 'formik';
import * as Yup from 'yup';
import InputField from '../../../Component/Input/InputField';
import {useDispatch, useSelector} from 'react-redux';
import PrimaryBtn from '../../../Component/Btn/PrimaryBtn';
import SmallBtn from '../../../Component/Btn/SmallBtn';
import {UpdateUser} from '../../slices/userSlice';
import { useNavigation } from '@react-navigation/native';

export default function EditProfile() {
  const {colors} = useTheme();
  let navigation=useNavigation();
  const dispatch = useDispatch();
  const [skillInput, setSkillInput] = React.useState('');
  const [languageInput, setLanguageInput] = React.useState('');
  const formikRef = useRef(null); // Create a ref for Formik instance
  const {user,isUpdateError} = useSelector(state => state?.user);
  


  const ProfileSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    email: Yup.string()
      .email('Enter a valid email')
      .required('Email is required'),
    password: Yup.string().required('Password is required'),
    skills: Yup.array().min(1, 'Add at least one skill'),
    languagesKnown: Yup.array().min(1, 'Add at least one language'),
    designation: Yup.string().required('Designation is required'),
    contact: Yup.string()
      .required('Contact is required')
      .matches(/^[0-9]{10}$/, 'Contact must be exactly 10 digits'),
    githubLink: Yup.string()
      .url('Enter a valid GitHub URL')
      .required('GitHub link is required'),
    websiteLink: Yup.string()
      .url('Enter a valid website URL')
      .required('Website link is required'),
    contribution: Yup.string().required('Contribution is required'),
    isAvailable: Yup.boolean()
      .required('Availability status is required')
      .typeError('Availability must be true or false'),
  });

  const handleAddSkill = (setFieldValue, values) => {
    if (skillInput.trim() !== '') {
      setFieldValue('skills', [...values.skills, skillInput.trim()]);
      setSkillInput('');
    }
  };

  const handleAddLanguage = (setFieldValue, values) => {
    if (languageInput.trim() !== '') {
      setFieldValue('languagesKnown', [
        ...values.languagesKnown,
        languageInput.trim(),
      ]);
      setLanguageInput('');
    }
  };

  const onSubmit = async values => {
   let result=await dispatch(UpdateUser(values));
   if(result?.success){
    navigation.goBack();
   }else{
    Alert.alert("something went wrong !..")
   }
  };

  return (
    <>
      <SafeAreaView
        style={{flex: 1, backgroundColor: colors.background_default}}>
        <AppHeader screenName="Edit Profile" />
        <KeyboardAvoidingView
          behavior={isPlatformIOS ? 'padding' : undefined}
          style={{flex: 1}}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View className="flex-1 ">
              <ScrollView
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{flexGrow: 1}}
                keyboardShouldPersistTaps="handled">
                <View className="flex-1 px-5 pt-5">
                  <Formik
                    innerRef={formikRef} // Assign ref to Formik
                    initialValues={user}
                    validationSchema={ProfileSchema}
                    onSubmit={onSubmit}>
                    {({
                      handleChange,
                      handleBlur,
                      handleSubmit,
                      values,
                      errors,
                      touched,
                      setFieldValue,
                    }) => (
                      <>
                        {/* Username */}
                        <InputField
                          placeholder="Enter Username"
                          value={values.username}
                          label="Username"
                          onChangeText={handleChange('username')}
                          onBlur={handleBlur('username')}
                          error={errors.username}
                          touched={touched.username}
                        />

                        {/* Email */}
                        <InputField
                          placeholder="Enter Email"
                          value={values.email}
                          label="Email"
                          onChangeText={handleChange('email')}
                          onBlur={handleBlur('email')}
                          error={errors.email}
                          touched={touched.email}
                        />

                        {/* Password */}
                        <InputField
                          placeholder="Enter Password"
                          value={values.password}
                          label="Password"
                          onChangeText={handleChange('password')}
                          onBlur={handleBlur('password')}
                          error={errors.password}
                          touched={touched.password}
                          secureTextEntry
                        />

                        {/* Skills Input */}
                        <View className="flex-1 flex-row space-x-3">
                          <View className="flex-1">
                            <InputField
                              placeholder="Add a skill"
                              value={skillInput}
                              label="Skills"
                              onChangeText={setSkillInput}
                            />
                          </View>
                          <View className="self-center">
                            <Text></Text>
                            <SmallBtn
                              label="Add Skill"
                              onPress={() =>
                                handleAddSkill(setFieldValue, values)
                              }
                            />
                          </View>
                        </View>

                        {/* Display added skills */}
                        {values.skills.length > 0 && (
                          <View className="my-4 py-1 gap-2 flex-row flex-wrap">
                            {values.skills.map((skill, index) => (
                              <View
                                key={index}
                                className="mx-1.5 p-1.5 min-w-[48px] rounded-lg"
                                style={{
                                  backgroundColor: colors.background_neutral,
                                }}>
                                <Text
                                  className="font-regular text-md text-center"
                                  style={{color: colors.text_secondary}}>
                                  {skill}
                                </Text>
                              </View>
                            ))}
                          </View>
                        )}

                        {/* Languages Known Input */}
                        <View className="flex-1 flex-row space-x-3">
                          <View className="flex-1">
                            <InputField
                              placeholder="Add a language"
                              value={languageInput}
                              label="Languages Known"
                              onChangeText={setLanguageInput}
                            />
                          </View>
                          <View className="self-center">
                            <Text></Text>
                            <SmallBtn
                              label="Add Language"
                              onPress={() =>
                                handleAddLanguage(setFieldValue, values)
                              }
                            />
                          </View>
                        </View>

                        {/* Display added languages */}
                        {values.languagesKnown.length > 0 && (
                          <View className="my-4 py-1 gap-2 flex-row flex-wrap">
                            {values.languagesKnown.map((lang, index) => (
                              <View
                                key={index}
                                className="mx-1.5 p-1.5 min-w-[48px] rounded-lg"
                                style={{
                                  backgroundColor: colors.background_neutral,
                                }}>
                                <Text
                                  className="font-regular text-md text-center"
                                  style={{color: colors.text_secondary}}>
                                  {lang}
                                </Text>
                              </View>
                            ))}
                          </View>
                        )}

                        {/* Designation */}
                        <InputField
                          placeholder="Designation"
                          value={values.designation}
                          label="Designation"
                          onChangeText={handleChange('designation')}
                          onBlur={handleBlur('designation')}
                          error={errors.designation}
                          touched={touched.designation}
                        />

                        {/* Contact */}
                        <InputField
                          placeholder="Contact Number"
                          value={values.contact}
                          label="Contact"
                          onChangeText={handleChange('contact')}
                          onBlur={handleBlur('contact')}
                          error={errors.contact}
                          touched={touched.contact}
                          keyboardType="phone-pad"
                        />

                        {/* GitHub Link */}
                        <InputField
                          placeholder="GitHub Profile Link"
                          value={values.githubLink}
                          label="GitHub Link"
                          onChangeText={handleChange('githubLink')}
                          onBlur={handleBlur('githubLink')}
                          error={errors.githubLink}
                          touched={touched.githubLink}
                        />

                        {/* Website Link */}
                        <InputField
                          placeholder="Website Link"
                          value={values.websiteLink}
                          label="Website Link"
                          onChangeText={handleChange('websiteLink')}
                          onBlur={handleBlur('websiteLink')}
                          error={errors.websiteLink}
                          touched={touched.websiteLink}
                        />

                        {/* Contributions */}
                        <InputField
                          placeholder="Your Contributions"
                          value={values.contribution}
                          label="Contributions"
                          onChangeText={handleChange('contribution')}
                          onBlur={handleBlur('contribution')}
                          error={errors.contribution}
                          touched={touched.contribution}
                        />

                        {/* Location */}
                        <InputField
                          placeholder="Location"
                          value={values.location}
                          label="Location"
                          onChangeText={handleChange('Location')}
                          onBlur={handleBlur('Location')}
                          error={errors.location}
                          touched={touched.location}
                        />

                        {/* Info */}
                        <InputField
                          placeholder="Info"
                          value={values.info}
                          label="Info"
                          onChangeText={handleChange('info')}
                          onBlur={handleBlur('info')}
                          error={errors.info}
                          touched={touched.info}
                        />
                      </>
                    )}
                  </Formik>
                </View>
              </ScrollView>
              {/* Submit Button */}
              <View className="mx-2 mb-4">
                <HelperText
                  className="font-regular text-center"
                  style={{color: colors.error}}>
                  {isUpdateError}
                </HelperText>

                <PrimaryBtn
                  label="Update your Profile"
                  onSubmit={() => formikRef.current?.handleSubmit()}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
}
