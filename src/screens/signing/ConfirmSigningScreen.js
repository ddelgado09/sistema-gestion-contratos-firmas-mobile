import { View, Text, Image, StyleSheet, Button, TouchableOpacity, ToastAndroid } from 'react-native';
import React, { useEffect } from 'react';

export default function ConfirmSigningScreen({ navigation, route }) {
    const { id, sign } = route.params;

    useEffect(() => {
        console.log(id, sign.substr(0, 30));
    }, []);

    const goBack = () => {
        navigation.goBack();
    }

    const saveSign = async () => {
        try {

        } catch (e) {
            console.log(e);
            ToastAndroid.show('Error al enviar la firma', ToastAndroid.SHORT);
        }
    }

    return (
        <View style={styles.container}>
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