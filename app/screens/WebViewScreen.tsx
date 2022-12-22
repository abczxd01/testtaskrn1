import { useEffect, useState, useRef } from 'react';
import { SafeAreaView, StyleSheet, BackHandler, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import WebView from 'react-native-webview';

import { WebViewScreenProps } from '../types';

export const getUrl = async () => {
  const url = await AsyncStorage.getItem('url');
  return url !== '' ? url : false;
};

export const WebViewScreen: React.FC<WebViewScreenProps> = () => {
  const [url, setUrl] = useState<null | string>(null);
  const webViewRef = useRef(null);

  const onAndroidBackPress = () => {
    if (webViewRef.current) {
      //@ts-ignore
      webViewRef.current.goBack();
      return true;
    }
    return false;
  };

  useEffect(() => {
    getUrl().then((res) => res && setUrl(res));
    if (Platform.OS === 'android') {
      BackHandler.addEventListener('hardwareBackPress', onAndroidBackPress);
      return () => {
        BackHandler.removeEventListener(
          'hardwareBackPress',
          onAndroidBackPress
        );
      };
    }
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <WebView ref={webViewRef} source={{ uri: url as string }} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
