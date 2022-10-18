import { View, Text, FlatList, StyleSheet } from 'react-native'
import React from 'react'

export default function SignTypeScreen({ navigation, route }) {
    const { id } = route.params;
    const signTypes = [
        {
            id: 1,
            label: 'Foto',
            event: () => {
                navigation.navigate('Photo', {
                    id: id
                });
            }
        },
        {
            id: 2,
            label: 'Firma',
            event: () => {
                navigation.navigate('Canvas', {
                    id: id
                });
            }
        }
    ];

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Seleccione el método de la firma</Text>
            <FlatList
                data={signTypes}
                renderItem={({ item }) => <Text style={styles.item} onPress={item.event}>{item.label}</Text>}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        padding: 15
    },
    title: {
        fontWeight: 'bold',
        fontSize: 35,
        textAlign: 'center'
    },
    item: {
        backgroundColor: '#ccc',
        margin: 15,
        padding: 25,
        textAlign: 'center',
        fontSize: 25
    }
})