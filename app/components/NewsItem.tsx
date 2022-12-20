import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ImageSourcePropType,
} from 'react-native';

type Props = {
  title: String;
  urlToImage: String;
  onPress: () => void;
};

export const NewsItem = ({ title, urlToImage, onPress }: Props) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.touchableOpacity} onPress={onPress}>
        <Text style={styles.title} numberOfLines={3}>
          {title}
        </Text>
        <Image
          source={{ uri: urlToImage } as ImageSourcePropType}
          style={styles.image}
          resizeMode={'contain'}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 30,
  },
  touchableOpacity: {
    width: '94%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
    flex: 1,
  },
  image: {
    width: 246.3,
    height: 70,
  },
});
