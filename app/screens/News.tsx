import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  View,
  Text,
} from 'react-native';
import axios from 'axios';

import { NewsItem } from '../components/NewsItem';
import { Articles, Article, NewsProps } from '../types';

const url =
  'https://newsapi.org/v2/everything?q=bitcoin&apiKey=1fbdd250ba2e4eaabd5d9f2967545676&language=en&pageSize=10';

export const News = ({ navigation }: NewsProps) => {
  const [news, setNews] = useState<Articles | null>(null);
  const [newsStatus, setNewsStatus] = useState({
    loading: false,
    error: false,
  });

  useEffect(() => {
    setNewsStatus({ loading: true, error: false });
    axios
      .get(url)
      .then((res) => {
        if (res.status === 200) {
          setNewsStatus({ loading: false, error: false });
          return setNews(res.data.articles);
        }
        setNewsStatus({ loading: false, error: true });
      })
      .catch(() => setNewsStatus({ loading: false, error: true }));
  }, []);

  const onPressDetail = (article: Article) =>
    navigation.navigate('NewsDetail', { article });

  const renderNews = () => {
    if (newsStatus.loading) {
      return <ActivityIndicator size={'large'} />;
    } else if (!newsStatus.error) {
      return (
        <FlatList
          style={styles.news}
          data={news}
          renderItem={({ item }) => (
            <NewsItem
              title={item.title}
              urlToImage={item.urlToImage}
              onPress={() => onPressDetail(item)}
            />
          )}
        />
      );
    }
    return <Text style={styles.errorText}>{'Something went wrong :('}</Text>;
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      {renderNews()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  news: {
    paddingHorizontal: 10,
    marginTop: 10,
  },
  errorText: {
    fontSize: 18,
    fontWeight: '500',
  },
});
