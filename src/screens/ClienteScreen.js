import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image, ActivityIndicator, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';

const ClienteScreen = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [menuVisible, setMenuVisible] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    fetch("http://192.168.137.158/inventario_app/obtener_productos.php")
      .then(response => response.json())
      .then(data => {
        setProductos(data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error obteniendo productos:", error);
        setLoading(false);
      });
  }, []);

  const handleLogout = () => {
    Alert.alert(
      'Cerrar sesión',
      '¿Estás seguro de que deseas cerrar sesión?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Cerrar sesión',
          style: 'destructive',
          onPress: () => navigation.navigate('Login')
        },
      ],
      { cancelable: true }
    );
  };

  const verMas = (producto) => {
    navigation.navigate('DetalleProducto', { producto });
  };

  return (
    <View style={styles.container}>

      <TouchableOpacity style={styles.cartButton} onPress={() => navigation.navigate('Carrito')}>
        <FontAwesome name="shopping-cart" size={24} color="black" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.searchButton} onPress={() => navigation.navigate('Buscar')}>
        <FontAwesome name="search" size={24} color="black" />
      </TouchableOpacity>

      {/* Botón de menú ahora en el lado derecho */}
      <TouchableOpacity style={styles.menuButton} onPress={() => setMenuVisible(!menuVisible)}>
        <FontAwesome name="bars" size={30} color="black" />
      </TouchableOpacity>

      {/* Menú ahora aparece en el lado derecho */}
      {menuVisible && (
        <View style={styles.menu}>
          <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('')}>
            <Text style={styles.menuItemText}>Perfil</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('')}>
            <Text style={styles.menuItemText}>Mis Pedidos</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Contactanos')}>
            <Text style={styles.menuItemText}>Contáctanos</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Nosotros')}>
            <Text style={styles.menuItemText}>Nosotros</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItems} onPress={handleLogout}>
            <Text style={styles.menuItemTexts}>Cerrar Sesión</Text>
          </TouchableOpacity>
        </View>
      )}

      <Text style={styles.titulo}>Corpfreshh</Text>

      {/* Lista de productos */}
      {loading ? (
        <ActivityIndicator size="large" color="#000" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={productos}
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
          ListFooterComponent={
            <View style={styles.footer}>
              <Text style={styles.footerTexto}>© Corpfreshh 2025 - Todos los derechos reservados</Text>
            </View>
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ECECEC',
    paddingTop: 50,
  },
  // Cambiado: menú ahora a la derecha
  menuButton: {
    position: 'absolute',
    top: 55,
    right: 15,
    zIndex: 10,
  },
  // Cambiado: iconos ahora a la izquierda
  searchButton: {
    position: 'absolute',
    top: 55,
    left: 25,
    zIndex: 10,
  },
  cartButton: {
    position: 'absolute',
    top: 55,
    left: 60,
    zIndex: 10,
  },
  logoutButton: {
    position: 'absolute',
    top: 55,
    left: 105,
    zIndex: 10,
  },
  // Cambiado: menú ahora aparece a la derecha
  menu: {
    position: 'absolute',
    top: 100,
    right: 10,
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    elevation: 5,
    zIndex: 10,
  },
  menuItem: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#DDD',
  },
  menuItems: {
      paddingVertical: 8,
      borderBottomWidth: 1,
      borderBottomColor: 'red',
   },
  menuItemText: {
    fontSize: 16,
    fontWeight: '500',
  },
  menuItemTexts: {
      fontSize: 16,
      fontWeight: '500',
      color: 'red',
    },
  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#000',
  },
  lista: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  producto: {
    flex: 1,
    backgroundColor: '#FFF',
    margin: 10,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 5,
  },
  imagen: {
    width: 120,
    height: 120,
    marginBottom: 10,
    borderRadius: 8,
  },
  nombre: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000',
  },
  precio: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8,
  },
  boton: {
    backgroundColor: '#000',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
    elevation: 3,
  },
  botonTexto: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  footer: {
    marginTop: 20,
    alignItems: 'center',
  },
  footerTexto: {
    fontSize: 12,
    color: '#555',
  },
});

export default ClienteScreen;