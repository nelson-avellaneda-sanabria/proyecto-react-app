import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DetalleProductoScreen = ({ route, navigation }) => {
  const { producto } = route.params;

  const agregarAlCarrito = async () => {
    try {
      const id_usuario = await AsyncStorage.getItem('id_usuario');
      if (!id_usuario) {
        Alert.alert('Error', 'No se encontró el ID del usuario');
        return;
      }

      const formData = new FormData();
      formData.append('id_usuario', id_usuario);
      formData.append('id_producto', producto.id); // Asegúrate de tener `id` en producto

      const response = await fetch('http://192.168.137.158/inventario_app/agregar_carrito.php', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        Alert.alert('Éxito', `${producto.nombre} agregado al carrito.`);
      } else {
        Alert.alert('Error', data.message || 'No se pudo agregar al carrito.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Hubo un problema al conectar con el servidor.');
    }
  };

  return (
    <View style={styles.container}>
      {/* Botón Volver */}
      <TouchableOpacity style={styles.botonVolver} onPress={() => navigation.goBack()}>
        <Text style={styles.botonVolverTexto}>← Volver</Text>
      </TouchableOpacity>

      {/* Imagen del Producto */}
      <Image source={{ uri: producto.imagen }} style={styles.imagen} />

      {/* Nombre del Producto */}
      <Text style={styles.nombre}>{producto.nombre}</Text>

      {/* Precio */}
      <Text style={styles.precio}>${producto.precio}</Text>

      {/* Descripción */}
      <Text style={styles.descripcion}>
        {producto.descripcion || 'Sin descripción disponible.'}
      </Text>

      {/* Botón Agregar al Carrito */}
      <TouchableOpacity style={styles.boton} onPress={agregarAlCarrito}>
        <Text style={styles.botonTexto}>Agregar al Carrito</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F4F4F4',
    alignItems: 'center',
  },
  botonVolver: {
    position: 'absolute',
    top: 40,
    left: 20,
    backgroundColor: 'transparent',
    padding: 10,
  },
  botonVolverTexto: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  imagen: {
    width: 250,
    height: 250,
    borderRadius: 15,
    marginTop: 80,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  nombre: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  precio: {
    fontSize: 22,
    color: '#000',
    fontWeight: 'bold',
    marginVertical: 10,
  },
  descripcion: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  boton: {
    backgroundColor: '#000',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  botonTexto: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
  },
});

export default DetalleProductoScreen;
