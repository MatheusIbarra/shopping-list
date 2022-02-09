import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';

import AppProvider from './src/hooks';
import Routes from './src/routes';

export default function App() {

    return (
            <AppProvider>
                <NavigationContainer>
                    <Routes />
                </NavigationContainer>
            </AppProvider>
    );
}

