import React from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons'; 
import HomeNavigation from './HomeNavigation';
import Perfil from '../screens/Perfil/Perfil';
import Posts from '../screens/Posts/Posts'
import Search from '../screens/Search/Search'


const Tab = createBottomTabNavigator()

export default function TabNavigation (){
    return(
        <Tab.Navigator screenOptions={{tabBarShowLabel: false}}>
            <Tab.Screen 
            name = 'HomeNavigation' 
            component={HomeNavigation}
            options={{
                tabBarIcon: () => <FontAwesome name="home" size={24} color='#44166a' />, 
                 // callback que devuelve el componente de fontawseonme 
                 headerShown: false

            }}
            />
        <Tab.Screen 
            name = 'Perfil' 
            component={Perfil}
            options={{
                tabBarIcon: () => <FontAwesome name="user" size={24} color='#44166a'/> 

            }}
            />
        <Tab.Screen 
            name = 'Posts' 
            component={Posts}
            options={{
                tabBarIcon: () => <AntDesign name="plus" size={24} color='#44166a' /> 

            }}
            />
        <Tab.Screen 
        name='Search' 
        component={Search}
        options={{
          tabBarIcon: () => <FontAwesome name="search" size={35} color='#44166a'/>,
          headerShown:false
        }} 
        />

        

        </Tab.Navigator>
    )
}

