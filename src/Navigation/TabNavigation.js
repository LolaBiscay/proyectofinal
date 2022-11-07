import {View, Text } from 'react-native'
import React from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons'; 
import Home from '../screens/Home/Home'
import Perfil from '../screens/Perfil/Perfil';
import Posts from '../screens/Posts/Posts'


const Tab = createBottomTabNavigator()

export default function TabNavigation (){
    return(
        <Tab.Navigator>
            <Tab.Screen 
            name = 'Home' 
            component={Home}
            options={{
                tabBarIcon: () => <FontAwesome name="home" size={24} color="black" /> // callback que devuelve el componente de fontawseonme 

            }}
            />
        <Tab.Screen 
            name = 'Perfil' 
            component={Perfil}
            options={{
                tabBarIcon: () => <FontAwesome name="user" size={24} color="black" /> 

            }}
            />
        <Tab.Screen 
            name = 'Posts' 
            component={Posts}
            options={{
                tabBarIcon: () => <AntDesign name="plus" size={24} color="black" /> 

            }}
            />
        

        </Tab.Navigator>
    )
}

