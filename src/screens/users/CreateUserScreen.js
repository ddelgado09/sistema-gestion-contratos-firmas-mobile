import { View, Text, ScrollView, StyleSheet, ActivityIndicator, TextInput, Button, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Picker } from '@react-native-picker/picker';
import { API_URL } from '@env';

export default function CreateUserScreen({ navigation, route }) {
    const id = route.params?.id;
    const [loading, setLoading] = useState(false);
    const [roles, setRoles] = useState([]);

    useEffect(() => {

        async function getUser(id) {
            setLoading(true);
            try {
                console.log(`${API_URL}usuarios/${id}`);
                const response = await fetch(`${API_URL}usuarios/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const result = await response.json();
                if (result.data) {
                    const { name, email, role_name } = result.data;
                    navigation.setOptions({
                        title: 'Editar usuario: ' + name
                    });
                    formik.setFieldValue('name', name);
                    formik.setFieldValue('email', email);
                    formik.setFieldValue('role', role_name);
                    return;
                }

                ToastAndroid.show(result.message, ToastAndroid.SHORT);
                navigation.goBack();
            } catch (e) {
                console.log(e);
                ToastAndroid.show('Error al cargar el usuario: ' + e.message, ToastAndroid.SHORT);
            } finally {
                setLoading(false);
            }
        } 
      
        async function getRoles() {
            try {
                const response = await fetch(`${API_URL}usuarios/roles`);
                const result = await response.json();

                setRoles(result.data.map(v => {
                    return {
                        label: v.name,
                        value: v.name
                    }
                }))
            } catch (e) {
                console.log(e);
            }
        }

        getRoles();

        if (id) {
            getUser(id);
        }
    
    }, [])
    
    const formik = useFormik({
        validateOnChange: false,
        initialValues: getInitialValues(),
        validationSchema: getValidationSchema(),
        onSubmit: async(values) => {
            setLoading(true);
            const { name, email, password, role } = values;
            try {
                let response = null;
                if (id) {
                    response = await fetch(`${API_URL}usuarios/${id}`, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            nombres: name,
                            email: email,
                            password: password,
                            rol: role
                        })
                    })
                } else {
                    response = await fetch(`${API_URL}usuarios`, {
                        method: 'POST',
                        body: JSON.stringify({
                            nombres: name,
                            email: email,
                            password: password,
                            rol: role
                        }),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });
                }
                const result = await response.json();

                if (result) {
                    ToastAndroid.show(result.message, ToastAndroid.LONG);
                    navigation.goBack();
                }
            } catch (e) {
                console.log(e);
            }
            setLoading(false);
        }
    })

    return (
        <ScrollView keyboardShouldPersistTaps='handled' style={styles.container}>
            {
                loading ?
                <ActivityIndicator size='large' style={{ marginTop: 150 }} /> :
                <View>
                    <TextInput
                        placeholder='Nombres'
                        style={styles.input}
                        value={formik.values.name}
                        onChangeText={(value) =>  formik.setFieldValue('name', value)}
                    />
                    {
                        formik.errors.name &&
                        <Text style={styles.error}>
                            {formik.errors.name}
                        </Text>
                    }

                    <TextInput
                        placeholder='Email'
                        style={styles.input}
                        autoCapitalize='none'
                        value={formik.values.email}
                        onChangeText={(value) => formik.setFieldValue('email', value)}
                    />
                    {
                        formik.errors.email &&
                        <Text style={styles.error}>
                            {formik.errors.email}
                        </Text>
                    }

                    <TextInput
                        placeholder='Contraseña'
                        style={styles.input}
                        autoCapitalize='none'
                        value={formik.values.password}
                        secureTextEntry={true}
                        onChangeText={(value) => formik.setFieldValue('password', value)}
                        caretHidden={true}
                    />
                    {
                        formik.errors.password &&
                        <Text style={styles.error}>
                            {formik.errors.password}
                        </Text>
                    }

                    <TextInput
                        placeholder='Repetir contraseña'
                        autoCapitalize='none'
                        style={styles.input}
                        value={formik.values.validate_password}
                        secureTextEntry={true}
                        onChangeText={(value) => formik.setFieldValue('validate_password', value)}
                        caretHidden={true}
                    />
                    {
                        formik.errors.validate_password &&
                        <Text style={styles.error}>
                            {formik.errors.validate_password}
                        </Text>
                    }

                    <Picker
                        selectedValue={formik.values.role}
                        onValueChange={(value) => formik.setFieldValue('role', value)}
                        style={styles.input}
                    >
                        <Picker.Item label='Seleccione' value='' />
                        {
                            roles.map((item, index) => (
                                <Picker.Item
                                    key={index}
                                    label={item.label}
                                    value={item.value}
                                />
                            ))
                        }
                    </Picker>
                    {
                        formik.errors.role &&
                        <Text style={styles.error}>
                            {formik.errors.role}
                        </Text>
                    }

                    <Button
                        title="Crear"
                        onPress={formik.handleSubmit}
                    />
                </View>
            }
        </ScrollView>
    );
}

function getInitialValues() {
    return {
        name: '',
        email: '',
        password: '',
        validate_password: '',
        role: ''
    }
}

function getValidationSchema() {
    return yup.object({
        name: yup.string().min(5, 'El nombre es demasiado corto').required('Debe ingresar el nombre'),
        email: yup.string().email('No es un email válido').required('Debe ingresar el email'),
        password: yup.string().required('Debe ingresar la contraseña'),
        validate_password: yup.string().oneOf([yup.ref('password'), null], 'Las contraseñas no coinciden').required('Debe ingresar la validación de la contraseña'),
        role: yup.string().oneOf(['client', 'admin'], 'No es un rol válido').required('Debe ingresar el rol')
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
        marginBottom: 4
    },
    error: {
        color: 'red',
        marginBottom: 20,
        fontWeight: 'bold'
    }
});