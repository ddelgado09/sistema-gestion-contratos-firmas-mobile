import { View, Text, Button, StyleSheet, ToastAndroid } from 'react-native';
import React, { useEffect, useState } from 'react';
import { API_URL } from '@env';
import { Picker } from '@react-native-picker/picker';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import { identity } from 'lodash';

export default function SelectTemplateScreen({ navigation }) {
    const [currentTemplate, setCurrentTemplate] =  useState(0);
    const [templates, setTemplates] = useState([]);

    useEffect(() => {
        async function getTemplates() {
            try {
                const response = await fetch(`${API_URL}plantillas`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const result = await response.json();

                if (result.data) {
                    setTemplates(
                        result.data.map(t => {
                            return {
                                value: t.id,
                                label: t.name
                            }
                        })
                    );
                }
            } catch (e) {
                console.log(e);
            }
        }

        if (templates.length === 0) {
            getTemplates();
        }
    }, []);

    const addTemplate = () => {
        if (!currentTemplate) {
            ToastAndroid.show('Debe seleccionar una plantilla', ToastAndroid.LONG);
            return;
        }

        navigation.navigate('FillData', {
            idTemplate: currentTemplate,
        });
    }

    const cancel = () => {
        navigation.popToTop();
    }

    return (
        <View style={styles.container}>
            <Picker
                selectedValue={currentTemplate}
                onValueChange={value => setCurrentTemplate(value)}
                style={styles.input}
            >
                <Picker.Item label='Seleccione...' value="" />
                {
                    templates.map((t, i) => (
                        <Picker.Item
                            key={i}
                            label={t.label}
                            value={t.value}
                        />
                    ))
                }
            </Picker>
            <View style={styles.button_container}>
                <View style={styles.button}>
                    <Button title="Cancelar" onPress={cancel} />
                </View>
                <View style={styles.button}>
                    <Button title="Agregar plantilla" onPress={addTemplate} />
                </View>
            </View>
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
    }
})