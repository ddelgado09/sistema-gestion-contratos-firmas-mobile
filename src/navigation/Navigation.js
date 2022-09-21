import { View, Text } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DashboardScreen from '../screens/DashboardScreen';
import UserScreen from '../screens/users/UserScreen';
import SigningScreen from '../screens/signing/SigningScreen';
import OptionsScreen from '../screens/options/OptionsScreen';
import ContractTemplateScreen from '../screens/contract_template/ContractTemplateScreen';

const Tab = createBottomTabNavigator();
const Color = "#ccc";
const Size = 24

export default function Navigation() {
    return (
        <Tab.Navigator>
            <Tab.Screen
                name='Dashboard'
                component={DashboardScreen}
                options={{ title: 'Inicio', tabBarIcon: ({ color }) => <Icon name="home" color={color} size={Size} /> }}
            />
            <Tab.Screen
                name='Templates'
                component={ContractTemplateScreen}
                options={{ title: 'Plantillas', tabBarIcon: ({ color }) => <Icon name="file-signature" color={color} size={Size} /> }}
            />
            <Tab.Screen
                name='Users'
                component={UserScreen}
                options={{ title: 'Usuarios', tabBarIcon: ({ color }) => <Icon name="user-tie" color={color} size={Size} /> }}
            />
            <Tab.Screen
                name='Signing'
                component={SigningScreen}
                options={{ title: 'Firmado', tabBarIcon: ({ color }) => <Icon name="pen" color={color} size={Size} /> }}
            />
            <Tab.Screen
                name='Options'
                component={OptionsScreen}
                options={{ title: 'Opciones', tabBarIcon: ({ color }) => <Icon name="cog" color={color} size={Size} /> }}
            />
        </Tab.Navigator>
    );
}