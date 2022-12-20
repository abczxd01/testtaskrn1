import { ActivityIndicator, View } from 'react-native';

import { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNetInfo } from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { News } from './app/screens/News';
import { NewsDetail } from './app/screens/NewsDetail';
import { NoInternet } from './app/screens/NoInternet';
import { RootStackParamList } from './app/types';
import { WebViewScreen } from './app/screens/WebViewScreen';

export const RootStack = createNativeStackNavigator<RootStackParamList>();

const WrappedActivityIndicator = () => (
  <View style={{ flex: 1, justifyContent: 'center', backgroundColor: '#fff' }}>
    <ActivityIndicator size={'large'} />
  </View>
);

export default function App() {
  const { isConnected } = useNetInfo();

  useEffect(() => {
    AsyncStorage.setItem('url', 'https://reactnative.dev/');
  }, []);

  const renderScreens = () => {
    if (isConnected === null) {
      return (
        <RootStack.Screen
          name="ActivityIndicator"
          component={WrappedActivityIndicator}
          options={{ headerShown: false }}
        />
      );
    }
    return !isConnected ? (
      <RootStack.Screen
        name="NoInternet"
        component={NoInternet}
        options={{ headerShown: false }}
      />
    ) : (
      <>
        <RootStack.Screen name="News" component={News} />
        <RootStack.Screen
          name="NewsDetail"
          component={NewsDetail}
          options={{ title: 'Detail' }}
        />
        <RootStack.Screen
          name="WebViewScreen"
          component={WebViewScreen}
          options={{ headerShown: false }}
        />
      </>
    );
  };

  return (
    <NavigationContainer>
      <RootStack.Navigator>{renderScreens()}</RootStack.Navigator>
    </NavigationContainer>
  );
}
