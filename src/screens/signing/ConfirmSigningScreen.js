import { View, Text, Image, StyleSheet, Button, TouchableOpacity, ToastAndroid, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { API_URL } from '@env';

export default function ConfirmSigningScreen({ navigation, route }) {
    const { id, sign } = route.params;
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        console.log(id, sign.substr(0, 30));
    }, []);

    const goBack = () => {
        navigation.goBack();
    }

    const saveSign = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${API_URL}firmas/firmar_contrato/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    sign: sign
                })
            });
            const result = await response.json();
            console.log(result, response.status);
        } catch (e) {
            console.log(e);
            ToastAndroid.show('Error al enviar la firma', ToastAndroid.SHORT);
        } finally {
            setLoading(false);
        }
    }

    return (
        <View style={styles.container}>
            {
                loading ?
                <ActivityIndicator size='large' style={{ marginTop: 150 }} /> :
                <View>
                    <Text style={styles.title}>Confirmar firmado</Text>
                    <Image
                        style={{ width: '100%', height: 250, borderWidth: 1, borderColor: '#ccc' }}
                        source={{ uri: sign }}
                    />

                    <Text>¿Está seguro de que desea usar esta firma?</Text>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={goBack} style={styles.button}>
                            <Text style={styles.buttonText}>Firmar Nuevamente</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={saveSign} style={styles.button}>
                            <Text style={styles.buttonText}>Confirmar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        padding: 25
    },
    title: {
        fontSize: 25,
        textAlign: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20
    },
    button: {
        backgroundColor: 'steelblue',
        padding: 12,
        borderRadius: 8
    },
    buttonText: {
        color: 'white'
    }
})