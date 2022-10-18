import { View, Text, StyleSheet, Button, ActivityIndicator, SectionList, SafeAreaView, ToastAndroid } from 'react-native';
import React, { useEffect, useState } from 'react';
import { API_URL } from '@env';

export default function ConfirmContractScreen({ navigation, route }) {
    const { idTemplate, tags, users } = route.params;
    const [template, setTemplate] = useState('');
    const [usuarios, setUsuarios] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function getTemplate() {
            try {
                const response = await fetch(`${API_URL}plantillas/${idTemplate}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const result = await response.json();
                if (result.data) {
                    setTemplate(result.data.name);
                }
            } catch (e) {
                console.log(e);
            }
        }

        async function getUsers(id) {
            try {
                const response = await fetch(`${API_URL}usuarios/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const result = await response.json();

                if (result.data) {
                    const tmp = usuarios;
                    console.log('users', tmp);
                    tmp.push(`${result.data.name} - ${result.data.email}`);
                    setUsuarios(tmp);
                }
            } catch (e) {
                console.log(e);
            }
        }

        setLoading(true);
        if (usuarios.length === 0) {
            users.forEach(v => {
                getUsers(v);
            });
        }
        
        if (!template) {
            getTemplate()
        }
        setLoading(false);

    }, []);

    const confirm = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${API_URL}firmas`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    idPlantilla: idTemplate,
                    etiquetas: tags,
                    idUsuarios: users
                })
            });
            const result = await response.text();
            console.log(result);
            ToastAndroid.show('Se ha guardado el contrato correctamente', ToastAndroid.LONG);
            navigation.popToTop();
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    }

    const cancel = () => {
        navigation.popToTop();
    }

    return (
        <SafeAreaView style={styles.container}>
            {
                loading ?
                <ActivityIndicator size='large' style={{ marginTop: 150 }} /> :
                <View>
                    <SectionList
                        sections={[
                            { title: 'Plantilla', data: [template] },
                            { title: 'Datos', data: Object.entries(tags).map(v => `${v[0]}: ${v[1]}`) },
                            { title: 'Usuarios', data: usuarios }
                        ]}
                        renderItem={({item}) => <Text style={styles.item}>{item}</Text>}
                        renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title}</Text>}
                    />
                    <Text>¿Estos datos son correctos?</Text>
                    <View style={styles.button_container}>
                        <View style={styles.button}>
                            <Button title="Cancelar" onPress={cancel} />
                        </View>
                        <View style={styles.button}>
                            <Button title="Crear contrato" onPress={confirm} />
                        </View>
                    </View>
                </View>
            }
        </SafeAreaView>
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
    },
    sectionHeader: {
        paddingTop: 2,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 2,
        fontSize: 14,
        fontWeight: 'bold',
        backgroundColor: 'rgba(247,247,247,1.0)',
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    }
});