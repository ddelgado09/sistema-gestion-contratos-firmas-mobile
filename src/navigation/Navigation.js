import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import OptionsScreen from '../screens/options/OptionsScreen';
import ContractTemplateNavigation from './ContractTemplateNavigation';
import UsersNavigation from './UsersNavigation';
import SigningNavigation from './SigningNavigation';
import useAuth from '../hooks/useAuth';
import LoginScreen from '../screens/login/LoginScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const Color = "#ccc";
const Size = 24

export default function Navigation() {
    const { auth } = useAuth();
    return (
        !auth ?
        <Stack.Navigator>
            <Stack.Screen name='Login' component={LoginScreen} options={{ headerShown: false }} />
        </Stack.Navigator> :
        <Tab.Navigator screenOptions={{ unmountOnBlur: true }}>
            <Tab.Screen
                name='Templates'
                component={ContractTemplateNavigation}
                options={{ headerShown: false, tabBarLabel: 'Plantillas', tabBarIcon: ({ color }) => <Icon name="file-signature" color={color} size={Size} /> }}
            />
            {
                auth.role === 'admin' ?
                <Tab.Screen
                    name='Users'
                    component={UsersNavigation}
                    options={{ headerShown: false, title: 'Usuarios', tabBarIcon: ({ color }) => <Icon name="user-tie" color={color} size={Size} /> }}
                /> :
                null
            }
            <Tab.Screen
                name='Signing'
                component={SigningNavigation}
                options={{ title: 'Firmado', tabBarIcon: ({ color }) => <Icon name="pen" color={color} size={Size} /> }}
            />
            <Tab.Screen
                name='Options'
                component={OptionsScreen}
                options={{ title: 'Opciones', tabBarIcon: ({ color }) => <Icon name="cog" color={color} size={Size} /> }}
            />
        </Tab.Navigator>
    )
}