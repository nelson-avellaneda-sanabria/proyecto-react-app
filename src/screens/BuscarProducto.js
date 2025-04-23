import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const BuscarScreen = () => {
  const [productos, setProductos] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [filtrados, setFiltrados] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    fetch("http://192.168.137158/inventario_app/obtener_productos.php")
      .then(response => response.json())
      .then(data => {
        setProductos(data);
        setFiltrados(data);
      })
      .catch(error => console.error("Error:", error));
  }, []);

  const buscarProducto = (texto) => {
    setBusqueda(texto);
    const resultados = productos.filter(p =>
      p.nombre.toLowerCase().includes(texto.toLowerCase())
    );
    setFiltrados(resultados);
  };

  const verMas = (producto) => {
    navigation.navigate('DetalleProducto', { producto });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Buscar Productos</Text>
      <TextInput
        style={styles.input}
        placeholder="Buscar por nombre..."
        value={busqueda}
        onChangeText={buscarProducto}
      />
      <FlatList
        data={filtrados}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.lista}
        renderItem={({ item }) => (
          <View style={styles.producto}>
            <Image source={{ uri: item.imagen }} style={styles.imagen} />
            <Text style={styles.nombre}>{item.nombre}</Text>
            <Text style={styles.precio}>${item.precio}</Text>
            <TouchableOpacity style={styles.boton} onPress={() => verMas(item)}>
              <Text style={styles.botonTexto}>Ver más</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 50, backgroundColor: '#ECECEC' },
  titulo: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
  input: {
    backgroundColor: '#FFF',
    marginHorizontal: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    fontSize: 16,
    marginBottom: 10,
    elevation: 2,
  },
  lista: { paddingHorizontal: 10 },
  producto: {
    flex: 1,
    backgroundColor: '#FFF',
    margin: 10,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 3,
  },
  imagen: { width: 120, height: 120, marginBottom: 10, borderRadius: 8 },
  nombre: { fontSize: 14, fontWeight: 'bold', textAlign: 'center' },
  precio: { fontSize: 15, fontWeight: 'bold', marginBottom: 8 },
  boton: {
    backgroundColor: '#000',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  botonTexto: { color: '#FFF', fontWeight: 'bold' },
});

export default BuscarScreen;
