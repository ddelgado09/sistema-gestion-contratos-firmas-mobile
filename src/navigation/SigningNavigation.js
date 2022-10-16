import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SigningScreen from '../screens/signing/SigningScreen';
import SelectTemplateScreen from '../screens/signing/SelectTemplateScreen';
import SelectUsersScreen from '../screens/signing/SelectUsersScreen';
import ConfirmContractScreen from '../screens/signing/ConfirmContractScreen';
import FillDataScreen from '../screens/signing/FillDataScreen';

const Stack = createNativeStackNavigator();

export default function SigningNavigation() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Index" component={SigningScreen} options={{ headerShown: false }} />
            <Stack.Screen name="SelectTemplate" component={SelectTemplateScreen} options={{ headerShown: false }} />
            <Stack.Screen name="FillData" component={FillDataScreen} options={{ headerShown: false }} />
            <Stack.Screen name="SelectUsers" component={SelectUsersScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Confirm" component={ConfirmContractScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}