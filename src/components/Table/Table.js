import { View, Text, ScrollView, StyleSheet, Button, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Table, TableWrapper, Row } from 'react-native-table-component';

export default function TableComponent({ head, data, canEdit, canDelete, editEvent, deleteEvent, widthHeader }) {
    const [widthArr, setWidthArr] = useState([]);
    const [header, setHeader] = useState([]);
    const [body, setBody] = useState([]);

    useEffect(() => {
        setWidthArr([
            ...widthHeader,
            80
        ]);
        setHeader([
            ...head,
            'Opciones'
        ]);
        setBody(
            data.map(v => {
                return [
                    ...Object.values(v),
                    options(v.id)
                ];
            })
        );

    }, [head, data]);

    const options = (id) => {
        const edit = canEdit ? 
            <TouchableOpacity style={styles.button} onPress={() => editEvent(id)}>
                <View>
                    <Text style={styles.btn_text}>Editar</Text>
                </View>
            </TouchableOpacity> : null;
        const del = canDelete ?
            <TouchableOpacity title='Desactivar' style={styles.button} onPress={() => deleteEvent(id)}>
                <View>
                    <Text style={styles.btn_text}>Desactivar</Text>
                </View>
            </TouchableOpacity> : null;
        
        return <>
            {edit}
            {del}
        </>;
    }

    return (
        <ScrollView horizontal={true}>
            
            <View>
                <Table borderStyle={{ borderWidth: 2, borderColor: '#f4d6a7' }}>
                    <Row data={header} widthArr={widthArr} style={styles.header} />
                </Table>

                <ScrollView style={styles.dataWrapper}>
                    <Table borderStyle={{ borderWidth: 2, borderColor: '#f4d6a7' }}>

                        {
                            body.map((row, index) => (
                                <Row
                                    key={index}
                                    data={row}
                                    widthArr={widthArr}
                                    style={[styles.row, index%2 && {backgroundColor: '#F7F6E7'}]}
                                    textStyle={styles.textStyle}
                                />
                            ))
                        }

                    </Table>
                </ScrollView>
            </View>

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    dataWrapper: {
        marginTop: -1
    },
    row: {
        height: 40,
        backgroundColor: '#e7e6e1'
    },
    text: {
        textAlign: 'center',
        fontWeight: 100
    },
    header: {
        height: 50,
        backgroundColor: '#537791'
    },
    button: {
        alignItems: 'center',
        width: 70,
        height: 18,
        backgroundColor: '#537791',
        borderRadius: 2,
        fontSize: 8,
    },
    btn_text: {
        color: 'white'
    }
});