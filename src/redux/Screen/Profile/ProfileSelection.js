import {View} from 'react-native';
import CategoryHeader from '../../../Component/AppHeader/CategoryHeader';
import {Divider, useTheme} from 'react-native-paper';
import {hexToRgba} from '../../../../utils/global';
import ListOfCard from '../../../Component/Card/LisofCard';

const ProfileSection = ({title, data}) => {
  const {colors} = useTheme();
  return (
    <View className="rounded-2xl  my-2 ">
      {/* Header */}
      <View className="mb-3">
        <CategoryHeader category={title} />
        <Divider
          style={{
            backgroundColor: hexToRgba(colors.text_disabled, 0.1),
            height: 1,
          }}
        />
      </View>
      {/* List */}
      <ListOfCard data={data} />
    </View>
  );
};
export default ProfileSection;
