import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './screens/Home';
import { SafeAreaView, View } from 'react-native';
import { useTheme } from 'styled-components/native';
import List from './screens/List';

const Stack = createStackNavigator();

const Routes: React.FC = () => {

    return (
        <SafeAreaView style={{ flex: 1, flexDirection: 'row', marginTop: 20 }}>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false
                }}
                initialRouteName='Home'
            >
                <Stack.Screen name="Home" component={Home}/>
                <Stack.Screen name="List" component={List}/>
            </Stack.Navigator>
        </SafeAreaView>
    );
}

export default Routes;
