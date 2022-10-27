import { View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, Button, ScrollView, ToastAndroid, ActivityIndicator } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import { Picker } from '@react-native-picker/picker';
import { API_URL } from '@env';
import _, { update } from 'lodash';
import { useFormik } from 'formik';
import * as yup from 'yup';
import * as DocumentPicker from 'expo-document-picker';
// import Alert from '../../utils/Alert';

export default function CreateContractTemplateScreen({ navigation }) {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [filename, setFilename] = useState('');

    useEffect(() => {

        async function getContractTypes() {
            fetch(`${API_URL}plantillas/tipos`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(data => data.json())
            .then(data => {
                setData(
                    data.data.map(v => {
                        return {
                            label: v.name,
                            value: v.name
                        }
                    })
                );
            })
            .catch(error => {
                ToastAndroid.show('Error al cargar los tipos de contrato: ' + ToastAndroid.SHORT);
                console.log(error);
            });
        }

        if (data.length === 0) {
            getContractTypes();
        }
    }, []);

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: validationHandler(data.map(v => v.value)),
        validateOnChange: false,
        onSubmit: async (values) => {
            setLoading(true);
            try {
                const form = new FormData();
                form.append('nombre', values.name);
                form.append('descripcion', values.description);
                form.append('tipo', values.type);
                form.append('archivo', values.fileroute);
                form.append('etiquetas', values.tags);

                const response = await fetch(`${API_URL}plantillas`, {
                    method: 'POST',
                    body: form,
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });

                const result = await response.json();

                if (!result.data) {
                    ToastAndroid.show('Error: ' + result.message, ToastAndroid.SHORT);
                    return;
                }
                ToastAndroid.show('Se ha creado la plantilla correctamente', ToastAndroid.LONG);
                navigation.goBack();
                
            } catch (e) {
                console.log(e);
            } finally {
                setLoading(false);
            }
        }
    });

    const loadTemplate = async () => {
        try {
            const { name, mimeType, uri } = await DocumentPicker.getDocumentAsync({
                copyToCacheDirectory: false,
                type: 'application/pdf'
            });

            formik.setFieldValue('fileroute', {
                uri: uri,
                type: mimeType,
                name: name
            });
            setFilename(name);
        } catch (e) {
            console.log(e);
            ToastAndroid.show('Error al cargar los tipos de plantillas', ToastAndroid.SHORT);
            navigation.goBack();
        }

    }

    return (
        <ScrollView keyboardShouldPersistTaps='handled' style={styles.container}>

            {
                loading ?
                <ActivityIndicator size="large" style={{ marginTop: 150 }} /> :
                <View>
                    <TextInput
                        placeholder='Nombre'
                        style={styles.input}
                        autoCapitalize='none'
                        value={formik.values.name}
                        onChangeText={(value) => formik.setFieldValue('name', value)}
                    />
                    {
                        formik.errors.name &&
                        <Text style={styles.error}>{formik.errors.name}</Text>
                    }

                    <TextInput
                        placeholder='Descripción'
                        style={{ ...styles.input, height: 100, alignItems: 'flex-start' }}
                        value={formik.values.description}
                        onChangeText={(value) => formik.setFieldValue('description', value)}
                    />
                    {
                        formik.errors.description &&
                        <Text style={styles.error}>{formik.errors.description}</Text>
                    }

                    <Picker
                        selectedValue={formik.values.type}
                        onValueChange={(value) => formik.setFieldValue('type', value)}
                        style={styles.input}
                    >
                        <Picker.Item label="Seleccione..." value={0} />
                        {
                            data.map((item, index) => (
                                <Picker.Item key={index} label={_.upperFirst(item.label)} value={item.value} />
                            ))
                        }
                    </Picker>
                    {
                        formik.errors.type &&
                        <Text style={styles.error}>{formik.errors.type}</Text>
                    }

                    <TextInput
                        placeholder='Etiquetas'
                        style={styles.input}
                        autoCapitalize='none'
                        value={formik.values.tags}
                        onChangeText={(value) => formik.setFieldValue('tags', value)}
                    />
                    {
                        formik.errors.tags &&
                        <Text style={styles.error}>{formik.errors.tags}</Text>
                    }

                    <View style={styles.button_view}>
                        <Button
                            title="Cargar Archivo"
                            onPress={loadTemplate}
                        />
                    </View>
                    {
                        filename &&
                        <Text style={{ fontWeight: 'bold', fontStyle: 'italic' }}>
                            {filename}
                        </Text>
                    }

                    <Button
                        title="Crear"
                        onPress={formik.handleSubmit}
                    />
                </View>
            }

        </ScrollView>
    )
}

function initialValues() {
    return {
        name: '',
        description: '',
        type: 0,
        fileroute: '',
        tags: ''
    }
}

function validationHandler(types) {
    return yup.object({
        name: yup.string().matches(/[a-zA-Z]{4,}/, 'Solo se permiten letras del alfabeto').min(4, 'El nombre es demasiado corto').required('El nombre es requerido'),
        description: yup.string().min(10, 'La descripción es demasiado corta').required('La descripción es requerida'),
        type: yup.string().oneOf(types, 'No es un tipo de plantilla válido').required('El tipo de plantilla es requerido'),
        tags: yup.string().matches(/([a-zA-Z]+;)+[a-zA-Z]+$/, 'Las etiquetas deben estar separadas por (;) y solo deben ser caracteres alfabéticos').required('Debe ingresar al menos una etiqueta')
    })
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
        marginBottom: 5
    },
    error: {
        color: 'red',
        marginBottom: 20,
        fontWeight: 'bold'
    },
    button_view: {
        padding: 15,
        color: '#333'
    },
    button: {
        backgroundColor: '#8B93A5',
        padding: 10,
        borderRadius: 6,
        marginTop: 50,
    }
});