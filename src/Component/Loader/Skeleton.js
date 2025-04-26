import React from 'react';
import {View} from 'react-native';
import ContentLoader, {Rect, Circle} from 'react-content-loader/native';
import {useTheme} from 'react-native-paper';
import {Wwidth} from '../../../utils/global';

const SkeletonLoader = ({count = 3, recentPayment, participant, card}) => {
  let {colors} = useTheme();

  return (
    <>
      {recentPayment == true ? (
        <>
          {Array.from({length: count}).map((_, index) => (
            <View key={index} className="w-full rounded-3xl px-1 ">
              <ContentLoader
                speed={1.5}
                width={Wwidth}
                height={55}
                backgroundColor={colors?.background_paper || '#E0E0E0'}
                foregroundColor={colors?.background_neutral || '#F5F5F5'}>
                {/* Name */}
                <Rect x="2" y="12" rx="4" ry="4" width="120" height="15" />
                {/* Email */}
                <Rect x="2" y="32" rx="4" ry="4" width="180" height="10" />
                {/* Created Date (Right Side) */}
                <Rect
                  x={Wwidth - 110}
                  y="12"
                  rx="4"
                  ry="4"
                  width="70"
                  height="10"
                />
              </ContentLoader>
            </View>
          ))}
        </>
      ) : participant == true ? (
        <>
          {Array.from({length: 6}).map((_, index) => (
            <View key={index} className="w-full rounded-3xl px-1 ">
              <ContentLoader
                speed={1.5}
                width={Wwidth}
                height={70}
                backgroundColor={colors?.background_paper || '#E0E0E0'}
                foregroundColor={colors?.background_neutral || '#F5F5F5'}>
                {/* Profile Picture */}
                <Circle cx="30" cy="40" r="27" />
                {/* Name */}
                <Rect x="70" y="25" rx="4" ry="4" width="120" height="15" />
                {/* Email */}
                <Rect x="70" y="45" rx="4" ry="4" width="180" height="10" />
                {/* Created Date (Right Side) */}
                <Rect
                  x={Wwidth - 110}
                  y="25"
                  rx="4"
                  ry="4"
                  width="70"
                  height="10"
                />
              </ContentLoader>
            </View>
          ))}
        </>
      ) : card == true ? (
        <>
          {Array.from({length: 3}).map((_, index) => (
            <View className="w-full h-30 rounded-2xl self-center my-2">
              <ContentLoader
                speed={1.5}
                width="100%"
                height={120}
                backgroundColor={colors?.background_paper || '#E0E0E0'}
                foregroundColor={colors?.background_neutral || '#F5F5F5'}>
                <Rect x="0" y="0" rx="12" ry="12" width="100%" height="100%" />
              </ContentLoader>
            </View>
          ))}
        </>
      ) : (
        <>
          {Array.from({length: count}).map((_, index) => (
            <View key={index} className="w-full rounded-3xl px-1">
              <ContentLoader
                speed={1.5}
                width={Wwidth - 40}
                height={70}
                backgroundColor={colors?.background_paper || '#E0E0E0'}
                foregroundColor={colors?.background_neutral || '#F5F5F5'}>
                {/* Profile Picture */}
                <Circle cx="35" cy="40" r="27" />
                {/* Name */}
                <Rect x="70" y="25" rx="4" ry="4" width="120" height="15" />
                {/* Email */}
                <Rect x="70" y="45" rx="4" ry="4" width="180" height="10" />
                {/* Created Date (Right Side) */}
                <Rect
                  x={Wwidth - 110}
                  y="35"
                  rx="4"
                  ry="4"
                  width="70"
                  height="10"
                />
              </ContentLoader>
            </View>
          ))}
        </>
      )}
    </>
  );
};

export default SkeletonLoader;
