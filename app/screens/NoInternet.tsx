import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNetInfo } from '@react-native-community/netinfo';

import { NoInternetProps } from '../types';

export const NoInternet: React.FC<NoInternetProps> = ({ navigation }) => {
  const { isConnected } = useNetInfo();
  const onPress = () => isConnected && navigation.navigate('WebViewScreen');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{'No internet connection'}</Text>
      <Text style={styles.subtitle}>{'Enable your internet'}</Text>
      <TouchableOpacity onPress={onPress} style={styles.button}>
        <Text style={styles.buttonText}>{'Try again'}</Text>
      </TouchableOpacity>
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
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    borderWidth: 2,
    borderColor: 'rgba(0,0,0,0.7)',
    width: '35%',
    marginTop: 30,
    marginBottom: 80,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '500',
    color: 'rgba(0,0,0,0.7)',
  },
});
