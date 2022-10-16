import { View, Text, StyleSheet, Button } from 'react-native';
import React, { useEffect, useState } from 'react';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { API_URL } from '@env';

export default function SelectUsersScreen({ navigation, route }) {
    const { idTemplate, tags } = route.params;
    const [users, setUsers] = useState([]);
    const [currentUsers, setCurrentUsers] = useState([]);

    useEffect(() => {

        async function getUsers() {
            try {
                const response = await fetch(`${API_URL}usuarios`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const result = await response.json();
                
                if (result.data) {
                    setUsers(
                        result.data.map(u => {
                            return {
                                id: u.id,
                                name: u.name,
                                email: u.email
                            }
                        })
                    );
                }
            } catch (e) {
                console.log(e);
            }
        }

        if (users.length === 0) {
            getUsers();
        }

    }, []);

    const addUsers = (id, isChecked) => {
        if (isChecked) {
            setCurrentUsers([...currentUsers, id]);
            return;
        }

        const index = currentUsers.findIndex(e => e === id);
        let tmpCurrUsers = currentUsers;
        tmpCurrUsers.splice(index, 1);
        setCurrentUsers(tmpCurrUsers);
    }

    const add = () => {
        navigation.navigate('Confirm', {
            idTemplate: idTemplate,
            tags: tags,
            users: currentUsers
        })
    }

    const cancel = () => {
        navigation.popToTop();
    }

    return (
        <View style={styles.container}>
            {
                users ?
                users.map((u, i) => (
                    <View key={i} style={styles.button_container}>
                        <BouncyCheckbox onPress={(isChecked) => addUsers(u.id, isChecked)} />
                        <Text>{u.name} - {u.email}</Text>
                    </View>
                )) : <ActivityIndicator size='large' style={{ marginTop: 150 }} />
            }
            <View style={styles.button_container}>
                <View style={styles.button}>
                    <Button title="Cancelar" onPress={cancel} />
                </View>
                <View style={styles.button}>
                    <Button title="Agregar usuarios" onPress={add} />
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
});