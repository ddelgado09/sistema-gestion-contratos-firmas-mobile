import { View, Text, StyleSheet, ToastAndroid, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import TableComponent from '../../components/Table/Table';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { API_URL } from '@env';

export default function UserScreen({ navigation }) {
    const [head, setHead] = useState([
        'Id',
        'Nombre',
        'E-Mail',
        'Rol'
    ]);
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState([]);

    useEffect(() => {
        async function loadUsers() {
            try {
                const response = await fetch(`${API_URL}usuarios`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const result = await response.json();
                
                if (result.data?.length === 0) {
                    return;
                }

                setUsers(
                    result.data.map(u => {
                        return {
                            id: u.id,
                            name: u.name,
                            email: u.email,
                            role: u.role_name
                        }
                    })
                );
                setFilter(
                    result.data.map(u => {
                        return {
                            id: u.id,
                            name: u.name,
                            email: u.email,
                            role: u.role_name
                        }
                    })
                );

            } catch (e) {
                console.log(e);
                ToastAndroid.show('Error al cargar los usuarios: ' + e.message);
            }
        }

        if (users.length === 0) {
            loadUsers();
        }

    }, []);

    const userForm = () => {
        navigation.navigate('CreateUser');
    }

    const editUser = (id) => {
        navigation.navigate('CreateUser', {
            id: id
        })
    }

    const filterData = (input) => {
        const newData = users.filter(value => {
            const result = value.id.toString().trim().toLowerCase().includes(input) ||
                value.name.trim().toLowerCase().includes(input) ||
                value.email.trim().toLowerCase().includes(input) ||
                value.role.trim().toLowerCase().includes(input);

            return result;
        });

        setFilter(newData);
    }

    const deleteUser = async (id) => {
        try {
            const response = await fetch(`${API_URL}usuarios/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const result = await response.json();

            if (!result) {

            }
            ToastAndroid.show(result.message, ToastAndroid.LONG);

            setUsers([]);

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
                widthHeader={[50, 150, 100, 100, 120]}
                head={head}
                data={filter}
                canEdit
                canDelete
                editEvent={editUser}
                deleteEvent={deleteUser}
            />
            <View>
                <Icon name="plus" color='green' size={48} onPress={userForm} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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