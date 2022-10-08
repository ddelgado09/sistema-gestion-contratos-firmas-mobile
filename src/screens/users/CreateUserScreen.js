import { View, Text, ScrollView, StyleSheet, ActivityIndicator, TextInput, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Picker } from '@react-native-picker/picker';
import { API_URL } from '@env';

export default function CreateUserScreen() {
    const [loading, setLoading] = useState(false);
    const [roles, setRoles] = useState([]);

    useEffect(() => {
      
        async function getRoles() {
            try {
                const response = await fetch(`${API_URL}usuarios/roles`);
                const result = await response.json();

                setRoles(result.data.map(v => {
                    return {
                        label: v.name,
                        value: v.id
                    }
                }))
            } catch (e) {
                console.log(e);
            }
        }

        getRoles();
    
    }, [])
    
    
    const formik = useFormik({
        validateOnChange: false,
        initialValues: getInitialValues(),
        validationSchema: getValidationSchema(),
        onSubmit: (values) => {
            
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
                        onChangeText={(value) => formik.setFieldValue('password', value)}
                        caretHidden={true}
                    />

                    <TextInput
                        placeholder='Repetir contraseña'
                        autoCapitalize='none'
                        style={styles.input}
                        value={formik.values.password}
                        onChangeText={(value) => formik.setFieldValue('password', value)}
                        caretHidden={true}
                    />

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
        role: ''
    }
}

function getValidationSchema() {
    return yup.object({
        name: yup.string().min(5, 'El nombre es demasiado corto').required('Debe ingresar el nombre'),
        email: yup.string().email('No es un email válido').required('Debe ingresar el email'),
        password: yup.string().required('Debe ingresar la contraseña'),
        validate_password: yup.string().required('Debe ingresar la validación de la contraseña'),
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