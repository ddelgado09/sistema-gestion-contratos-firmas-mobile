import { View, Text, StyleSheet, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome5';
import TableComponent from '../../components/Table/Table';
import Loading from '../../utils/Loading';
import { API_URL } from '@env';

export default function ContractTemplateScreen({ navigation }) {
    const [head, setHead] = useState([
        'Id',
        'Nombre',
        'Descripción',
        'Etiquetas',
    ]);
    const [body, setBody] = useState([]);

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
            })
            .catch(e => {
                console.log(e);
            });
        }

        if (body.length === 0) {
            getTemplates();
        }
    }, [body]);

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
            <TableComponent
                widthHeader={[50, 250, 100, 100]}
                head={head}
                data={body}
                canEdit={false}
                deleteEvent={deleteTemplate}
            />
            <View>
                <Icon name="plus" color={'green'} size={48} onPress={templateForm} />
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
    }
});