import { View, Text, Button, StyleSheet, ScrollView, Alert, ToastAndroid, TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react';
import TableComponent from '../../components/Table/Table';
import { API_URL } from '@env';
import useAuth from '../../hooks/useAuth';

export default function SigningScreen({ navigation }) {
    const { auth } = useAuth();
    const [contracts, setContracts] = useState([]);
    const [filter, setFilter] = useState([]);

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
                    setFilter(
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
                ToastAndroid.show('Error al cargar los contratos: ' + e.message);
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

    const filterData = (input) => {
        const newData = contracts.filter(value => {
            const result = value.id.toString().trim().toLowerCase().includes(input) ||
                value.contract_name.trim().toLowerCase().includes(input) ||
                value.user_name.trim().toLowerCase().includes(input) ||
                value.is_signed.trim().toLowerCase().includes(input);

            return result;
        });

        setFilter(newData);
    }

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder='Buscar...'
                onChangeText={(value) => filterData(value)}
            />
            <TableComponent
                head={['Id', 'Nombre', 'Firmante', '¿Firmado?']}
                data={filter}
                canEdit={false}
                widthHeader={[50, 200, 150, 50]}
                deleteEvent={deleteContract}
            />
            <TouchableOpacity
                style={styles.button}
                onPress={() =>  navigation.navigate('SelectTemplate')}
            >
                <Text style={styles.buttonText}>Crear Contrato</Text>
            </TouchableOpacity>
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        height: '100%',
        padding: 10,
        backgroundColor: '#fff'
    },
    input: {
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 25,
        borderRadius: 8,
        color: '#33dieg',
        padding: 10,
        fontSize: 16
    },
    button: {
        marginBottom: 35,
        borderWidth: 1,
        borderColor: '#ccc',
        paddingVertical: 10,
        paddingHorizontal: 25,
        borderRadius: 10,
        shadowColor: '#ccc',
        shadowRadius: 5,
        shadowOffset: 10,
        width: '60%',
        alignSelf: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: '#333',
        fontSize: 25,
    }
})