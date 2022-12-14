import { View, Text, StyleSheet, ToastAndroid, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome5';
import TableComponent from '../../components/Table/Table';
import useAuth from '../../hooks/useAuth';
import { API_URL } from '@env';

export default function ContractTemplateScreen({ navigation }) {
    const { auth } = useAuth();
    const [head, setHead] = useState([
        'Id',
        'Nombre',
        'Descripción',
        'Etiquetas',
    ]);
    const [body, setBody] = useState([]);
    const [filter, setFilter] = useState([]);

    useEffect(() => {
        async function getTemplates() {
            fetch(`${API_URL}plantillas`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(data => data.json())
            .then(data => {
                setBody(data.data.map(v => {
                    return {
                        id: v.id,
                        name: v.name,
                        description: v.description,
                        tags: v.tags.join(', ')
                    }
                }));
                setFilter(data.data.map(v => {
                    return {
                        id: v.id,
                        name: v.name,
                        description: v.description,
                        tags: v.tags.join(', ')
                    }
                }));
            })
            .catch(e => {
                console.log(e);
            });
        }

        if (body.length === 0) {
            getTemplates();
        }
    }, [body]);

    const filterData = (input) => {
        const newData = body.filter(value => {
            const result = value.id.toString().trim().toLowerCase().includes(input) ||
                value.name.trim().toLowerCase().includes(input) ||
                value.description.trim().toLowerCase().includes(input);

            return result;
        });

        setFilter(newData);
    }

    const templateForm = () => {
        navigation.navigate('CreateTemplate');
    }

    const deleteTemplate = async (id) => {
        
        try {

            const response = await fetch(`${API_URL}plantillas/?id=${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            const result = await response.json();

            if (result) {
                ToastAndroid.show(result.message, ToastAndroid.LONG);
                setBody([]);
            }

        } catch (e) {
            console.log(e);
            
        }
    }

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder='Buscar...'
                onChangeText={(value) => filterData(value)}
            />
            <TableComponent
                widthHeader={[50, 250, 100, 100]}
                head={head}
                data={filter}
                canEdit={false}
                canDelete={auth.role === 'admin'}
                deleteEvent={deleteTemplate}
            />
            {
                auth.role === 'admin' &&
                <View>
                    <Icon name="plus" color={'green'} size={48} onPress={templateForm} />
                </View>

            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        padding: 16,
        paddingTop: 30,
        backgroundColor: '#fff'
    },
    input: {
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 25,
        borderRadius: 8,
        color: '#33dieg',
        padding: 10,
        fontSize: 16
    }
});