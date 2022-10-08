import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UserScreen from '../screens/users/UserScreen';
import CreateUserScreen from '../screens/users/CreateUserScreen';

const Stack = createNativeStackNavigator();

export default function UsersNavigation() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Index" component={UserScreen} options={{ title: "Listado de Usuarios" }} />
            <Stack.Screen name='Create' component={CreateUserScreen} options={{ title: 'Crear usuario' }} />
        </Stack.Navigator>
    );
}