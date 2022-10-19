import { View, Text, Button, StyleSheet, ScrollView, Alert, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react';
import TableComponent from '../../components/Table/Table';
import { API_URL } from '@env';
import useAuth from '../../hooks/useAuth';

export default function SigningScreen({ navigation }) {
    const [contracts, setContracts] = useState([])
    const { auth } = useAuth();

    useEffect(() => {
        async function getContracts() {
            try {
                const response = await fetch(`${API_URL}firmas`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const result = await response.json();
                if (result.data) {
                    setContracts(
                        result.data.map(c => {
                            return {
                                id: c.id,
                                contract_name: c.contract_name,
                                user_name: c.user_name,
                                is_signed: c.is_signed ? 'Si' : 'No'
                            }
                        })
                    );
                }
            } catch (e) {
                console.log(e);
            }
        }

        if (contracts.length === 0) {
            getContracts();
        }
    }, [contracts]);

    const deleteContract = async (id) => {
        try {
            const response = await fetch(`${API_URL}firmas/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const result = await response.json();
            console.log(result);

            ToastAndroid.show('Se ha borrado el contrato correctamente', ToastAndroid.LONG);
            setContracts([]);
        } catch (e) {
            console.log(e);
            Alert.alert('Error', 'No se pudo cancelar el proceso');
        }
    }

    return (
        <View style={styles.container}>
            <TableComponent
                head={['Id', 'Nombre', 'Firmante', '¿Firmado?']}
                data={contracts}
                canEdit={false}
                widthHeader={[100, 100, 100, 100]}
                deleteEvent={deleteContract}
            />
            <Button
                title='Crear contrato'
                onPress={() =>  navigation.navigate('SelectTemplate')}
            />
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        height: 250,
        padding: 10,
    },
    canvas: {
        borderColor: 'black',
        borderWidth: 2,
        marginTop: 20,
        height: 'inherit'
    }
})