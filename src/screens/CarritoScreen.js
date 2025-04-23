import React, { useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, SafeAreaView, FlatList, Image
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CarritoScreen = ({ navigation }) => {
  const [productos, setProductos] = useState([]);
  const [total, setTotal] = useState(0);

  const cargarCarrito = async () => {
    const id_usuario = await AsyncStorage.getItem('id_usuario');
    if (!id_usuario) return;

    const formData = new URLSearchParams();
    formData.append('id_usuario', id_usuario);

    try {
      const response = await fetch('http://192.168.137.158/inventario_app/obtener_carrito.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formData.toString(),
      });
      const data = await response.json();

      if (data.success) {
        setProductos(data.productos);
        const suma = data.productos.reduce((acc, p) => acc + parseFloat(p.precio), 0);
        setTotal(suma);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', cargarCarrito);
    return unsubscribe;
  }, [navigation]);

  const eliminarProducto = async (id_producto) => {
    const id_usuario = await AsyncStorage.getItem('id_usuario');
    if (!id_usuario) return;

    const formData = new URLSearchParams();
    formData.append('id_usuario', id_usuario);
    formData.append('id_producto', id_producto);

    try {
      await fetch('http://192.168.137.158/inventario_app/eliminar_del_carrito.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formData.toString(),
      });
      cargarCarrito(); // Recargar carrito
    } catch (error) {
      console.error(error);
    }
  };

  const comprar = () => {
    navigation.navigate('Pago'); // Redirige a la pantalla de pago
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Image source={{ uri: item.imagen }} style={styles.imagen} />
      <View style={styles.info}>
        <Text style={styles.nombre}>{item.nombre}</Text>
        <Text style={styles.precio}>${item.precio}</Text>
      </View>
      <TouchableOpacity style={styles.eliminarBtn} onPress={() => eliminarProducto(item.id)}>
        <Text style={styles.eliminarTexto}>X</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>Carrito de Compras</Text>

      {productos.length === 0 ? (
        <Text style={styles.texto}>Tu carrito está vacío.</Text>
      ) : (
        <>
          <FlatList
            data={productos}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
            style={{ marginBottom: 10 }}
          />
          <Text style={styles.total}>Total: ${total.toFixed(2)}</Text>
          <TouchableOpacity style={styles.botonNegro} onPress={comprar}>
            <Text style={styles.botonTexto}>Comprar</Text>
          </TouchableOpacity>
        </>
      )}

      <TouchableOpacity style={styles.botonNegro} onPress={() => navigation.goBack()}>
        <Text style={styles.botonTexto}>Volver</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ECECEC', padding: 20 },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 40,
    marginBottom: 20,
    textAlign: 'center',
  },
  texto: { fontSize: 16, color: '#666', textAlign: 'center', marginBottom: 20 },
  item: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  imagen: { width: 80, height: 80, borderRadius: 8 },
  info: { marginLeft: 15, flex: 1 },
  nombre: { fontSize: 18, fontWeight: 'bold' },
  precio: { fontSize: 16, color: '#333' },
  eliminarBtn: {
    backgroundColor: '#000',
    padding: 8,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  eliminarTexto: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
  botonNegro: {
    backgroundColor: '#000',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  botonTexto: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
  total: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'right',
    marginTop: 10,
    marginBottom: 5,
    color: '#333',
  },
});

export default CarritoScreen;
