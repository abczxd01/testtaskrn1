import { useEffect, useState } from 'react';
import { ActivityIndicator, View, StyleSheet, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {
  NativeStackNavigationOptions,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
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
  <View style={{ flex: 1, justifyContent: 'center', backgroundColor: '#fff' }}>
    <ActivityIndicator size={'large'} />
  </View>
);

const options: NativeStackNavigationOptions = {
  statusBarHidden: false,
  statusBarStyle: 'dark',
  statusBarTranslucent: false,
};

const optionsWithHeaderHidden = {
  ...options,
  headerShown: false,
};

export default function App() {
  const { isConnected } = useNetInfo();
  const [isOpenedWebView, setIsOpenedWebView] = useState(false);
  const [error, setError] = useState<unknown>(null);
  const [loading, setLoading] = useState(true);

  const checkShowOrNoWebView = async () => {
    try {
      await remoteConfig().fetchAndActivate();
      await remoteConfig().fetch(60);

      const carrier = await getCarrierNameAsync();
      const url = remoteConfig().getString('url');

      if ((carrier && carrier !== 'T-Mobile') || isDevice || url) {
        AsyncStorage.setItem('url', url);
        setLoading(false);
        setIsOpenedWebView(true);
      }
    } catch (error) {
      await remoteConfig().reset();
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    checkShowOrNoWebView();
  }, []);

  const onPress = () => {
    setError(null);
    setLoading(true);
    checkShowOrNoWebView();
  };

  const ErrorMessage = () => {
    //@ts-ignore
    const errorMessage = error?.message || 'Unknown error';

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
      <RootStack.Screen name="News" component={News} options={options} />
      <RootStack.Screen
        name="NewsDetail"
        component={NewsDetail}
        options={{ title: 'Detail', ...options }}
      />
    </>
  );

  const renderScreens = () => {
    if (loading || isConnected === null) {
      return (
        <RootStack.Screen
          name="WrappedActivityIndicator"
          component={WrappedActivityIndicator}
          options={optionsWithHeaderHidden}
        />
      );
    }

    if (error) {
      return (
        <RootStack.Screen
          name="ErrorMessage"
          component={ErrorMessage}
          options={optionsWithHeaderHidden}
        />
      );
    }

    if (!isConnected) {
      return (
        <RootStack.Screen
          name="NoInternet"
          component={NoInternet}
          options={optionsWithHeaderHidden}
        />
      );
    }
    if (isOpenedWebView) {
      return (
        <RootStack.Screen
          name="WebViewScreen"
          component={WebViewScreen}
          options={optionsWithHeaderHidden}
        />
      );
    }

    return renderNewsScreens();
  };

  return (
    <NavigationContainer>
      <RootStack.Navigator>{renderScreens()}</RootStack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
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
    backgroundColor: '#fff',
  },
});
