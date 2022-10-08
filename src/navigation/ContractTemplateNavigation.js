import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ContractTemplateScreen from '../screens/contract_template/ContractTemplateScreen';
import CreateContractTemplateScreen from '../screens/contract_template/CreateContractTemplateScreen';

const Stack = createNativeStackNavigator();

export default function ContractTemplateNavigation() {
    return (
        <Stack.Navigator>
            <Stack.Screen name='Index' component={ContractTemplateScreen} options={{ title: 'Listado de Plantillas' }} />
            <Stack.Screen name='CreateTemplate' component={CreateContractTemplateScreen} options={{ title: 'Crear Nueva Plantilla' }} />
        </Stack.Navigator>
    );
}
