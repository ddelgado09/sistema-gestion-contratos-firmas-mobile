import { View, Text, StyleSheet, Dimensions, ToastAndroid } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { API_URL } from '@env';
import * as Linking from 'expo-linking';

export default function ShowPdfScreen({ navigation, route }) {
    const { id } = route.params;
    const [source, setSource] = useState(null);
    const ref = useRef();

    useEffect(() => {
        async function getPdf() {
            try {
                const response = await fetch(`${API_URL}firmas/pdf/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const result = await response.json();
                
                if (result.data) {
                    Linking.openURL(result.data.url);
                } else {
                    ToastAndroid.show(result.message, ToastAndroid.SHORT);
                }

                navigation.goBack();
            } catch (e) {
                console.log(e);
            }
        }

        if (!source) {
            getPdf();
        }
    }, []);

    return (
        <View>
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