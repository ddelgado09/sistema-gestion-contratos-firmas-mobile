import { View, Text, StyleSheet, TextInput, Button, ActivityIndicator, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import { useFormik } from 'formik';
import * as yup from 'yup';
import { API_URL } from '@env';
import useAuth from '../../hooks/useAuth'
import { decode } from 'js-base64';

export default function LoginScreen() {
    const [loading, setLoading] = useState(false);
    const { auth, login } = useAuth();
 
    const formik = useFormik({
        initialValues: getInitialValues(),
        validationSchema: getValidationSchema(),
        validateOnChange: false,
        onSubmit: async ({ username, password }) => {
            ToastAndroid.show(`${API_URL}login`);
            setLoading(true);
            try {
                const response = await fetch(`${API_URL}login`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: username,
                        password: password
                    })
                });
                const result = await response.json();
                if (result.error) {
                    ToastAndroid.show(result.message, ToastAndroid.SHORT);
                    return;
                }

                const { token } = result.data;
                const data = token.split('.');

                login(JSON.parse(decode(data[1])));
            } catch (e) {
                console.log(e);
                ToastAndroid('Error en el inicio de sesión: ' + e.message, ToastAndroid.SHORT);
            } finally {
                setLoading(false);
            }
        }
    })
    return (
        <View style={styles.container}>
            {
                loading ?
                <ActivityIndicator size='large' style={styles.loading} /> :
                <View>
                    <Text style={styles.title}>Inicio de Sesión</Text>
                    <TextInput
                        style={styles.input}
                        value={formik.values.username}
                        onChangeText={(value) => formik.setFieldValue('username', value)}
                        placeholder='Usuario'
                        autoCapitalize={false}
                    />
                    {
                        formik.errors.username &&
                        <Text style={styles.error}>{formik.errors.username}</Text>
                    }
                    <TextInput
                        style={styles.input}
                        value={formik.values.password}
                        onChangeText={(value) => formik.setFieldValue('password', value)}
                        placeholder='Contraseña'
                        secureTextEntry={true}
                        autoCapitalize={false}
                    />
                    {
                        formik.errors.password &&
                        <Text style={styles.error}>{formik.errors.password}</Text>
                    }
                    <View style={styles.btnLogin}>
                        <Button
                            onPress={formik.handleSubmit}
                            title='Iniciar Sesión'
                        />
                    </View>
                </View>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        paddingTop: 3,
        backgroundColor: '#fff',
        justifyContent: 'center',
        height: '100%'
    },
    title: {
        textAlign: 'center',
        fontSize: 28,
        fontWeight: 'bold',
        marginTop: 50,
        marginBottom: 15
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
        fontWeight: 'bold'
    },
    btnLogin: {
        marginTop: 20,
        marginHorizontal: 30,
        borderRadius: 10
    },
    loading: {
        color: 'orange',
    }
});

function getInitialValues() {
    return {
        username: '',
        password: ''
    }
}

function getValidationSchema() {
    return yup.object({
        username: yup.string().email('No es un email válido').required('El correo es requerido'),
        password: yup.string().required('La contraseña es requerida')
    });
}