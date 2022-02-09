import { SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';

import AppProvider from './src/hooks';
import Routes from './src/routes';

export default function App() {
  return (
        <AppProvider>
            <SafeAreaView style={{ flex: 1, flexDirection: 'row', marginTop: 20 }}>
                <NavigationContainer>
                    <Routes />
                </NavigationContainer>
            </SafeAreaView>
        </AppProvider>
  );
}

