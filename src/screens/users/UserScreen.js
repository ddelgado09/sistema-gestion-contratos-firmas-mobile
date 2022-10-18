import { View, Text, StyleSheet, ToastAndroid } from 'react-native'
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
                console.log(users);

            } catch (e) {
                console.log(e);
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
            <TableComponent
                widthHeader={[50, 150, 100, 100, 120]}
                head={head}
                data={users}
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
    }
});