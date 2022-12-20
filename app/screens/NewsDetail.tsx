import { NewsDetailProps } from '../types';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageSourcePropType,
} from 'react-native';
Text;
export const NewsDetail = ({ route }: NewsDetailProps) => {
  const { article } = route.params;
  const { title, urlToImage, description } = article;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Image
        source={{ uri: urlToImage } as ImageSourcePropType}
        style={styles.image}
      />
      <Text style={styles.description}>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginTop: 10,
    textAlign: 'center',
  },
  image: {
    marginVertical: 30,
    width: '100%',
    height: 230,
  },
  description: {
    fontSize: 18,
  },
});
