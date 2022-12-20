import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type Article = {
  author: String;
  title: String;
  description: String;
  url: String;
  urlToImage: String;
  content: String;
};

export type Articles = Article[];

export type RootStackParamList = {
  News: undefined;
  NoInternet: undefined;
  WebViewScreen: undefined;
  ActivityIndicator: undefined;
  NewsDetail: { article: Article };
};

export type NewsProps = NativeStackScreenProps<RootStackParamList, 'News'>;
export type NewsDetailProps = NativeStackScreenProps<
  RootStackParamList,
  'NewsDetail'
>;
export type WebViewScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'WebViewScreen'
>;
export type NoInternetProps = NativeStackScreenProps<
  RootStackParamList,
  'NoInternet'
>;
