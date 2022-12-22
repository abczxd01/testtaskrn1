import { useEffect, useState } from 'react';
import { ActivityIndicator, View, StyleSheet, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNetInfo } from '@react-native-community/netinfo';
import { isDevice } from 'expo-device';
import { getCarrierNameAsync } from 'expo-cellular';
import AsyncStorage from '@react-native-async-storage/async-storage';
import remoteConfig from '@react-native-firebase/remote-config';

import { News } from './app/screens/News';
import { NewsDetail } from './app/screens/NewsDetail';
import { NoInternet } from './app/screens/NoInternet';
import { RootStackParamList } from './app/types';
import { WebViewScreen } from './app/screens/WebViewScreen';
import { Button } from './app/components/Button';

const RootStack = createNativeStackNavigator<RootStackParamList>();

const WrappedActivityIndicator = () => (
  <View style={{ flex: 1, justifyContent: 'center' }}>
    <ActivityIndicator size={'large'} />
  </View>
);

export default function App() {
  const { isConnected } = useNetInfo();
  const [isOpenedWebView, setIsOpenedWebView] = useState(false);
  const [error, setError] = useState<unknown>(null);
  const [loading, setLoading] = useState(true);

  const checkShowOrNoWebView = async () => {
    try {
      await remoteConfig().fetchAndActivate();
      const carrier = await getCarrierNameAsync();
      const url = remoteConfig().getString('url');

      if ((carrier && carrier !== 'T-Mobile') || isDevice || url) {
        AsyncStorage.setItem('url', url);
        setLoading(false);
        setIsOpenedWebView(true);
      }
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    checkShowOrNoWebView();
  }, [error]);

  const onPress = () => {
    setError(null);
    setLoading(true);
  };

  const renderErrorMessage = () => {
    const errorMessage =
      error instanceof Object && 'message' in error
        ? (error.message as string)
        : 'Unknown error';

    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{errorMessage}</Text>
        <Button onPress={onPress} />
        <View style={{ height: 30 }} />
      </View>
    );
  };

  const renderNewsScreens = () => (
    <>
      <RootStack.Screen name="News" component={News} />
      <RootStack.Screen
        name="NewsDetail"
        component={NewsDetail}
        options={{ title: 'Detail' }}
      />
    </>
  );

  const renderScreens = () => {
    if (!isConnected) {
      return (
        <RootStack.Screen
          name="NoInternet"
          component={NoInternet}
          options={{ headerShown: false }}
        />
      );
    }
    if (isOpenedWebView) {
      return (
        <RootStack.Screen
          name="WebViewScreen"
          component={WebViewScreen}
          options={{ headerShown: false }}
        />
      );
    }

    return renderNewsScreens();
  };

  const renderContent = () => {
    if (loading || isConnected === null) {
      return <WrappedActivityIndicator />;
    }
    if (error) {
      return renderErrorMessage();
    }

    return <RootStack.Navigator>{renderScreens()}</RootStack.Navigator>;
  };

  return (
    <NavigationContainer>
      <View style={styles.container}>{renderContent()}</View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  errorText: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 40,
    textAlign: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
