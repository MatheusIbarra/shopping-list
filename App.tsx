import { NavigationContainer } from '@react-navigation/native';
import { KeyboardAvoidingView, Platform } from 'react-native';
import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';

import AppProvider from './src/hooks';
import Routes from './src/routes';

export default function App() {

    return (<>

        <AppProvider>
            <StatusBar style='auto' />
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1, marginTop: 20, backgroundColor: 'black'}}
            >
                <NavigationContainer>
                    <Routes />
                </NavigationContainer>
            </KeyboardAvoidingView>
        </AppProvider></>
    );
}

