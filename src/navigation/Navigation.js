import { View, Text } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DashboardScreen from '../screens/DashboardScreen';
import UserScreen from '../screens/users/UserScreen';
import SigningScreen from '../screens/signing/SigningScreen';

const Tab = createBottomTabNavigator();

export default function Navigation() {
    return (
        <Tab.Navigator>
            <Tab.Screen name='Dashboard' component={DashboardScreen} />
            <Tab.Screen name='Users' component={UserScreen} />
            <Tab.Screen name='Signing' component={SigningScreen} />
        </Tab.Navigator>
    );
}