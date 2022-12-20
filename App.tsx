import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { News } from './app/screens/News';
import { NewsDetail } from './app/screens/NewsDetail';
import { RootStackParamList } from './app/types';

export const RootStack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <RootStack.Navigator>
        <RootStack.Screen name="News" component={News} />
        <RootStack.Screen name="NewsDetail" component={NewsDetail} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
