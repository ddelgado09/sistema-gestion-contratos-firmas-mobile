import { View, Text, StyleSheet, ScrollView, FlatList, ActivityIndicator, ToastAndroid, Linking, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { API_URL } from '@env';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Link } from '@react-navigation/native';

export default function SigningClientScreen({ navigation, route }) {
    const [contracts, setContracts] = useState([]);
    const { auth } = useAuth();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function getContracts() {
            const { email } = auth;
            setLoading(true);
            try {
                const response = await fetch(`${API_URL}firmas/email/${email}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const result = await response.json();
                if (result.data) {
                    setContracts(
                        result.data.map(c => {
                            const indexUser = c.id_user.findIndex(val => val === auth.id);
                            return {
                                key: c.id,
                                name: c.contract_name,
                                is_signed: c.is_signed && c.is_signed[indexUser],
                                event: (is_signed) => {
                                    if (is_signed) {
                                        getSignedPdf(c.id);
                                        return;
                                    }

                                    navigation.navigate('SignType', {
                                        id: c.id
                                    })
                                }
                            }
                        })
                    );
                }

            } catch (e) {
                console.log(e);
                ToastAndroid.show('Error al cargar los contratos: ' + e.message);
            } finally {
                setLoading(false);
            }
        }

        if (contracts.length === 0) {
            getContracts();
        }

    }, []);

    const getSignedPdf = async (id) => {
        try {
            const response = await fetch(`${API_URL}firmas/pdf/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const result = await response.json();

            if (!result.data) {
                Alert.alert(result.message);
                return;
            }

            const { url } = result.data;
            if (!Linking.canOpenURL(url)) {
                Alert.alert('No se puede abrir la url');
                return;
            }
            Linking.openURL(url);
        } catch (e) {

        } finally {

        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Seleccione el contrato a firmar:</Text>
            {
                loading ? <ActivityIndicator /> :
                contracts.length === 0 ?
                <Text style={styles.noData}>No hay contratos pendientes por firmar</Text> :
                <FlatList
                    data={contracts}
                    renderItem={
                        ({ item }) => 
                        <View style={styles.item}>
                            <Text style={styles.item_text} onPress={() => item.event(item.is_signed)}>
                                {item.name}
                            </Text>
                            {
                                item.is_signed &&
                                <Icon name="check" color="green" size={24} style={{ right: 0 }} />
                            }
                        </View>
                    }
                />
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        paddingTop: 3,
        backgroundColor: '#fff',
        justifyContent: 'center',
        height: '100%'
    },
    title: {
        fontSize: 25,
        textDecorationLine: 'underline',
        color: 'steelblue',
        marginBottom: 25
    },
    row: {
        height: 40,
        backgroundColor: '#e7e6e1'
    },
    text: {
        textAlign: 'center',
        fontWeight: 100
    },
    header: {
        height: 50,
        backgroundColor: '#537791'
    },
    button: {
        alignItems: 'center',
        width: 70,
        height: 18,
        backgroundColor: '#537791',
        borderRadius: 2,
        fontSize: 8,
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 50,
        textDecorationStyle: 'dotted',
        borderBottomColor: '#333',
        borderBottomWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    noData: {
        fontSize: 16,
        color: '#333',
        textAlign: 'center'
    }
})