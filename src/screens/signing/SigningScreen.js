import { View, Text, Button, StyleSheet } from 'react-native'
import React, { useState } from 'react';

export default function SigningScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <Button
                title='Crear contrato'
                onPress={() =>  navigation.navigate('SelectTemplate')}
            />
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        height: 250,
        padding: 10,
    },
    canvas: {
        borderColor: 'black',
        borderWidth: 2,
        marginTop: 20,
        height: 'inherit'
    }
})