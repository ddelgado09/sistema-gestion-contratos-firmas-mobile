import { View, Text, FlatList, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import useAuth from '../../hooks/useAuth';

export default function OptionsScreen() {
    const [list, setList] = useState([
        {
            key: 'Cerrar Sesión',
            event: () => {
                logout();
            }
        }
    ]);
    const { logout } = useAuth();

    return (
        <View style={styles.container}>
            <FlatList
                data={list}
                renderItem={({item}) => <Text style={styles.item} onPress={item.event}>{item.key}</Text>}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 22
    },
    item: {
         padding: 10,
         fontSize: 18,
         height: 44,
    },
})