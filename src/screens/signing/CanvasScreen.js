import { View, Text, StyleSheet } from 'react-native';
import React, { useDebugValue, useRef, useState } from 'react';
import Signature from "react-native-signature-canvas";
import 'react-native-get-random-values';

export default function CanvasScreen({ navigation, route }) {
    const { id } = route.params;
    const ref = useRef();
    const [base64Image, setBase64Image] = useState('');

    const handleOk = (data) => {
        setBase64Image(data);
        navigation.navigate('ConfirmSigning', {
            id: id,
            sign: data
        })
    }

    return (
        <View style={styles.container}>
            <Signature
                ref={ref}
                style={styles.canvas}
                onOK={handleOk}
                descriptionText='Firmar aqui'
                confirmText='Confirmar'
                clearText='Limpiar'
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%'
    },
})