import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './screens/Home';
import List from './screens/List';

const Stack = createStackNavigator();
const Routes: React.FC = () => {

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
            initialRouteName='Home'
        >
            <Stack.Screen name="Home" component={Home}/>
            <Stack.Screen name="List" component={List}/>
        </Stack.Navigator>
    );
}

export default Routes;
