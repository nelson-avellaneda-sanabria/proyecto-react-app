import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, SafeAreaView, ScrollView } from 'react-native';
import axios from 'axios';

const EditorInventarioScreen = ({ route, navigation }) => {
    const params = route?.params || {};

    const {
        id = '',
        nombre: nombreProducto = '',
        stock: stockProducto = 0,
        precio: precioProducto = 0,
        imagen: imagenProducto = '',
        descripcion: descripcionProducto = ''
    } = params;

    const [idProducto] = useState(id.toString());
    const [nombre, setNombre] = useState(nombreProducto);
    const [stock, setStock] = useState(stockProducto.toString());
    const [precio, setPrecio] = useState(precioProducto.toString());
    const [fecha, setFecha] = useState('');
    const [imagen, setImagen] = useState(imagenProducto);
    const [descripcion, setDescripcion] = useState(descripcionProducto);

    useEffect(() => {
        const currentDate = new Date().toISOString().split('T')[0];
        setFecha(currentDate);
    }, []);

    const guardarProducto = () => {
        if (nombre.trim() === '' || stock.trim() === '' || precio.trim() === '' || imagen.trim() === '' || descripcion.trim() === '') {
            Alert.alert('Error', 'Todos los campos deben estar completos');
            return;
        }

        axios.post('http://192.168.137.158/inventario_app/guardar_producto.php', {
            id: idProducto,
            nombre,
            stock: parseInt(stock),
            precio: parseFloat(precio),
            fecha,
            imagen,
            descripcion
        })
        .then(response => {
            const data = response.data;
            if (data.success) {
                Alert.alert('Éxito', data.message, [{ text: 'OK', onPress: () => navigation.goBack() }]);
            } else {
                Alert.alert('Error', data.message);
            }
        })
        .catch(error => {
            console.error(error);
            Alert.alert('Error', 'Hubo un problema al guardar el producto');
        });
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.title}>Agregar / Editar Producto</Text>

                <Text style={styles.label}>ID del Producto</Text>
                <TextInput style={[styles.input, styles.disabled]} value={idProducto} editable={false} />

                <Text style={styles.label}>Nombre del Producto</Text>
                <TextInput style={styles.input} value={nombre} onChangeText={setNombre} />

                <Text style={styles.label}>Stock</Text>
                <TextInput style={styles.input} value={stock} onChangeText={setStock} keyboardType="numeric" />

                <Text style={styles.label}>Precio ($)</Text>
                <TextInput style={styles.input} value={precio} onChangeText={setPrecio} keyboardType="numeric" />

                <Text style={styles.label}>Imagen (URL)</Text>
                <TextInput style={styles.input} value={imagen} onChangeText={setImagen} />

                <Text style={styles.label}>Descripción</Text>
                <TextInput
                    style={[styles.input, { height: 80, textAlignVertical: 'top' }]}
                    value={descripcion}
                    onChangeText={setDescripcion}
                    multiline
                    numberOfLines={4}
                />

                <Text style={styles.label}>Fecha de Modificación</Text>
                <TextInput style={[styles.input, styles.disabled]} value={fecha} editable={false} />

                <TouchableOpacity style={styles.boton} onPress={guardarProducto}>
                    <Text style={styles.botonTexto}>Guardar Cambios</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    container: {
        padding: 20,
        alignItems: 'center',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
        marginTop: 20,
        textAlign: 'center',
    },
    label: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
        alignSelf: "flex-start",
        marginBottom: 5,
    },
    input: {
        width: '100%',
        backgroundColor: '#FFF',
        padding: 12,
        borderRadius: 5,
        fontSize: 16,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#CCC',
    },
    disabled: {
        backgroundColor: '#d3d3d3',
    },
    boton: {
        backgroundColor: '#FF5733',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        marginTop: 10,
        width: '100%',
        alignItems: 'center',
    },
    botonTexto: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default EditorInventarioScreen;
