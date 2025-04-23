import React, { useState, useEffect, useCallback } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator, Alert, Image } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

const ITEMS_POR_PAGINA = 4;

const InventarioScreen = () => {
  const navigation = useNavigation();
  const [productos, setProductos] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [loading, setLoading] = useState(true);

  const obtenerProductos = () => {
    setLoading(true);
    fetch("http://192.168.137.158/inventario_app/obtener_productos.php")
      .then(response => response.json())
      .then(data => {
        setProductos(data);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  };

  useFocusEffect(
    useCallback(() => {
      obtenerProductos();
    }, [])
  );

  const eliminarProducto = (id) => {
    Alert.alert(
      "Confirmar eliminación",
      "¿Estás seguro que deseas eliminar este producto?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: () => {
            fetch("http://192.168.137.158/inventario_app/eliminar_producto.php", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ id }),
            })
              .then(response => response.text())
              .then(responseText => {
                Alert.alert("Éxito", responseText);
                obtenerProductos();
              })
              .catch(error => console.error(error));
          },
        },
      ]
    );
  };

  const totalPaginas = Math.ceil(productos.length / ITEMS_POR_PAGINA);
  const inicio = (paginaActual - 1) * ITEMS_POR_PAGINA;
  const productosPagina = productos.slice(inicio, inicio + ITEMS_POR_PAGINA);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.searchButton} onPress={() => navigation.navigate("Buscador")}>
        <Text style={styles.searchButtonText}>Buscar producto</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("EditorInventario", {
          id: '',
          nombre: '',
          stock: '',
          precio: ''
        })}
      >
        <Text style={styles.addButtonText}>Agregar producto</Text>
      </TouchableOpacity>

      <FlatList
        data={productosPagina}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <View style={styles.card}>
            {/* Imagen del producto */}
            <Image
              source={{ uri: item.imagen }}
              style={styles.productImage}
              resizeMode="cover"
            />

            <Text style={styles.productName}>{item.nombre}</Text>
            <Text style={styles.productDetails}>Stock: {item.stock}</Text>
            <Text style={styles.productDetails}>Precio: ${item.precio}</Text>
            <Text style={styles.productDetails}>Fecha: {item.fecha}</Text>

            <TouchableOpacity
              style={styles.editButton}
              onPress={() => navigation.navigate("EditorInventario", {
                id: item.id,
                nombre: item.nombre,
                stock: item.stock,
                precio: item.precio
              })}
            >
              <Text style={styles.editButtonText}>Editar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => eliminarProducto(item.id)}
            >
              <Text style={styles.deleteButtonText}>Eliminar</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <View style={styles.pagination}>
        <TouchableOpacity disabled={paginaActual === 1} onPress={() => setPaginaActual(paginaActual - 1)}>
          <Text style={[styles.paginationButton, paginaActual === 1 && styles.disabled]}>{'<'}</Text>
        </TouchableOpacity>

        <Text style={styles.paginationText}>{paginaActual} / {totalPaginas}</Text>

        <TouchableOpacity disabled={paginaActual === totalPaginas} onPress={() => setPaginaActual(paginaActual + 1)}>
          <Text style={[styles.paginationButton, paginaActual === totalPaginas && styles.disabled]}>{'>'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingTop: 30,
    paddingHorizontal: 10,
  },
  searchButton: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 10,
  },
  searchButtonText: {
    color: "#FFF",
    fontWeight: "bold",
  },
  addButton: {
    backgroundColor: "green",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 10,
  },
  addButtonText: {
    color: "#FFF",
    fontWeight: "bold",
  },
  listContainer: {
    paddingBottom: 20,
  },
  card: {
    flex: 1,
    backgroundColor: "#F3F3F3",
    padding: 10,
    borderRadius: 10,
    margin: 5,
    borderColor: "#CCC",
    borderWidth: 1,
    alignItems: "center",
  },
  productImage: {
    width: "100%",
    height: 100,
    borderRadius: 5,
    marginBottom: 10,
  },
  productName: {
    color: "#000",
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "center",
  },
  productDetails: {
    color: "#555",
    textAlign: "center",
  },
  editButton: {
    backgroundColor: "#C00000",
    padding: 8,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
    width: "100%",
  },
  editButtonText: {
    color: "#FFF",
    fontWeight: "bold",
  },
  deleteButton: {
    backgroundColor: "#C00000",
    padding: 8,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 5,
    width: "100%",
  },
  deleteButtonText: {
    color: "#FFF",
    fontWeight: "bold",
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
  },
  paginationButton: {
    fontSize: 18,
    paddingHorizontal: 10,
    color: "#007BFF",
  },
  paginationText: {
    fontSize: 16,
    fontWeight: "bold",
    marginHorizontal: 10,
    color: "#000",
  },
  disabled: {
    color: "#AAA",
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default InventarioScreen;
