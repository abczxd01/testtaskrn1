import { StyleSheet, Text, View } from 'react-native';
import { useNetInfo } from '@react-native-community/netinfo';

import { NoInternetProps } from '../types';
import { Button } from '../components/Button';

export const NoInternet: React.FC<NoInternetProps> = ({ navigation }) => {
  const { isConnected } = useNetInfo();
  const onPress = () => isConnected && navigation.navigate('WebViewScreen');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{'No internet connection'}</Text>
      <Text style={styles.subtitle}>{'Enable your internet'}</Text>
      <Button onPress={onPress} />
      <View style={{ height: 40 }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    justifyContent: 'center',
    textAlign: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 22,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 30,
  },
});
