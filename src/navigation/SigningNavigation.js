import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SigningScreen from '../screens/signing/SigningScreen';
import SelectTemplateScreen from '../screens/signing/SelectTemplateScreen';
import SelectUsersScreen from '../screens/signing/SelectUsersScreen';
import ConfirmContractScreen from '../screens/signing/ConfirmContractScreen';
import FillDataScreen from '../screens/signing/FillDataScreen';
import SigningClientScreen from '../screens/signing/SigningClientScreen';
import SignTypeScreen from '../screens/signing/SignTypeScreen';
import useAuth from '../hooks/useAuth';
import PhotoScreen from '../screens/signing/PhotoScreen';
import CanvasScreen from '../screens/signing/CanvasScreen';
import ConfirmSigningScreen from '../screens/signing/ConfirmSigningScreen';
import ShowPdfScreen from '../screens/signing/ShowPdfScreen';

const Stack = createNativeStackNavigator();

export default function SigningNavigation() {
    const { auth } = useAuth();

    return (
        <>
            {
                auth.role === 'admin' ?
                <Stack.Navigator>
                    <Stack.Screen name="Index" component={SigningScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="ShowPdf" component={ShowPdfScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="SelectTemplate" component={SelectTemplateScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="FillData" component={FillDataScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="SelectUsers" component={SelectUsersScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="Confirm" component={ConfirmContractScreen} options={{ headerShown: false }} />
                </Stack.Navigator> :
                <Stack.Navigator>
                    <Stack.Screen name="Index" component={SigningClientScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="ShowPdf" component={ShowPdfScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="SignType" component={SignTypeScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="Photo" component={PhotoScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="Canvas" component={CanvasScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="ConfirmSigning" component={ConfirmSigningScreen} options={{ headerShown: false }} />
                </Stack.Navigator>
            }
        </>
    );
}