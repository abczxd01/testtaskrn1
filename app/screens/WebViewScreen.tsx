import { useEffect, useState, useRef, RefObject } from 'react';
import { SafeAreaView, StyleSheet, BackHandler, Platform } from 'react-native';
import WebView from 'react-native-webview';

import { WebViewScreenProps } from '../types';
import { getUrl } from '../utils';

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
