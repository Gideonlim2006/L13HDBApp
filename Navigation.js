import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from "./Home.js";
import HDBInfo from "./HDBInfo";

const Stack = createNativeStackNavigator();

const Navigation = () => {
    return(
        <NavigationContainer >
            <Stack.Navigator screenOptions={{headerShown:false}}>
                <Stack.Screen name='Home' component={Home} />
                <Stack.Screen name='HDBInfo' component={HDBInfo} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Navigation;
