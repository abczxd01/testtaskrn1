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
  NewsDetail: { article: Article };
};

export type NewsProps = NativeStackScreenProps<RootStackParamList, 'News'>;
export type NewsDetailProps = NativeStackScreenProps<
  RootStackParamList,
  'NewsDetail'
>;
