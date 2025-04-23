// PagoScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PagoScreen = ({ navigation }) => {
  const [productos, setProductos] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const obtenerCarrito = async () => {
      const id_usuario = await AsyncStorage.getItem('id_usuario');
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
          const totalCalculado = data.productos.reduce((acc, item) => acc + parseFloat(item.precio), 0);
          setTotal(totalCalculado);
        }
      } catch (error) {
        console.error(error);
      }
    };

    obtenerCarrito();
  }, []);

  // Navegar al formulario de pago seleccionado
  const irAFormularioPago = (metodoPago) => {
    // Pasamos información de productos y total al formulario específico
    navigation.navigate(
      metodoPago === 'en casa' ? 'PagoEnCasa' : 'PagoNequi',
      { productos, total }
    );
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/FONDO.jpg')} style={styles.logo} />
      <Text style={styles.titulo}>Selecciona una opción de pago</Text>

      <TouchableOpacity style={styles.boton} onPress={() => irAFormularioPago('en casa')}>
        <Text style={styles.texto}>Pagar en casa</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.boton} onPress={() => irAFormularioPago('Nequi')}>
        <Text style={styles.texto}>Pagar con Nequi</Text>
      </TouchableOpacity>

      <Text style={styles.descripcion}>Productos: {productos.map(p => p.nombre).join(', ')}</Text>
      <Text style={styles.total}>Total: ${total.toFixed(2)}</Text>

      <TouchableOpacity
        style={[styles.boton, {backgroundColor: '#333'}]}
        onPress={() => navigation.navigate('')}>
        <Text style={styles.texto}>Ver mis pedidos</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', backgroundColor: '#FFF' },
  logo: { width: 150, height: 150, resizeMode: 'contain', alignSelf: 'center', marginBottom: 20 },
  titulo: { fontSize: 20, textAlign: 'center', marginBottom: 20 },
  boton: {
    backgroundColor: '#000',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: 'center',
  },
  texto: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
  descripcion: { marginTop: 20, textAlign: 'center' },
  total: { fontWeight: 'bold', textAlign: 'center', fontSize: 16, marginTop: 10 },
});

export default PagoScreen;