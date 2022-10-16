import { View, Text, StyleSheet, Button, TextInput, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { API_URL } from '@env';

export default function FillDataScreen({ navigation, route }) {
    const { idTemplate } = route.params;
    const [tags, setTags] = useState([]);
    const [tagValue, setTagValue] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        async function getTemplates() {
            setLoading(true);
            try {
                const response = await fetch(`${API_URL}plantillas/${idTemplate}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const result = await response.json();

                if (result.data) {
                    setTags(result.data.tags);
                }
            } catch (e) {
                console.log(e);
            } finally {
                setLoading(false);
            }
        }

        if (tags.length === 0) {
            getTemplates();
        }

    }, []);

    const add = () => {
        navigation.navigate('SelectUsers', {
            idTemplate: idTemplate,
            tags: tagValue
        });
    }

    const cancel = () => {
        navigation.popToTop();
    }

    const setTagVal = (value, tag) => {
        let tmpVal = tagValue;
        tmpVal[tag] = value;
        setTagValue(tmpVal);
    }

    return (
        <View style={styles.container}>
            {
                loading ?
                <ActivityIndicator size='large' style={{ marginTop: 150 }} /> :
                <View>
                    {
                        tags.map((t, i) => (
                            <View key={i} style={styles.input_container}>
                                <Text style={{ marginRight: 20 }}>
                                    {t}:
                                </Text>
                                <TextInput style={styles.input} onChangeText={(value) => setTagVal(value, t)} />
                            </View>
                        ))
                    }
                    <View style={styles.button_container}>
                        <View style={styles.button}>
                            <Button title="Cancelar" onPress={cancel} />
                        </View>
                        <View style={styles.button}>
                            <Button title="Agregar datos" onPress={add} />
                        </View>
                    </View>
                </View>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        paddingTop: 30,
        backgroundColor: '#fff'
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        width: '80%',
        height: 50,
        padding: 10,
        marginBottom: 4
    },
    button_container: {
        flexDirection: 'row'
    },
    button: {
        flex: 1,
        margin: 10
    },
    input_container: {
        flexDirection: 'row',
        marginBottom: 10
    }
});