import {View, Text} from 'react-native'
import React from 'react'

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from '../screens/Login/LoginScreen'
import Register from "../screens/Register/Register";

const Stack = createNativeStackNavigator()

function MainNavigation (){
    return(
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen 
                name="Login" 
                component={LoginScreen} 
                options={{
                    headerShown: false
                    //es un booleano 
                }}
                />
                <Stack.Screen 
                name="Register" 
                component={Register} 
                options={{
                    headerShown: false 
                }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default MainNavigation 