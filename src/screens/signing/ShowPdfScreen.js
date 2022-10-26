import { View, Text, StyleSheet, Dimensions } from 'react-native';
import React, { useEffect, useState } from 'react';
import Pdf from 'react-native-pdf';
import { API_URL } from '@env';

export default function ShowPdfScreen({ navigation, route }) {
    const { id } = route.params;
    const [source, setSource] = useState({});

    useEffect(() => {
        async function getPdf() {
            try {
                const response = await fetch(`${API_URL}firmas/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const result = await response.json();
                console.log(result);
            } catch (e) {
                console.log(e);
            }
        }

        if (!source.uri) {
            getPdf();
        }
    }, []);

    return (
        <View style={styles.container}>
            <Pdf
                source={source}
                style={styles.pdf}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        height: '100%',
        padding: 10,
        backgroundColor: '#fff'
    },
    pdf: {
        flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    }
})