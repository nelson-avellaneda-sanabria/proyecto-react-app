import React, { useState, useEffect, useCallback } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator, Alert, ImageBackground } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

const ITEMS_POR_PAGINA = 6;

const InventarioScreen = () => {
  const navigation = useNavigation();
  const [productos, setProductos] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [loading, setLoading] = useState(true);

  const obtenerProductos = () => {
    setLoading(true);
    fetch("http://10.0.2.2/inventario_app/obtener_productos.php")
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
            fetch("http://10.0.2.2/inventario_app/eliminar_producto.php", {
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
    <ImageBackground source={require("../../assets/ROPA.jpg")} style={styles.background}>
      <View style={styles.overlay} />

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
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  container: {
    flex: 1,
    paddingTop: 80,
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
    backgroundColor: "#333",
    padding: 10,
    borderRadius: 10,
    margin: 5,
  },
  productName: {
    color: "#FFF",
    fontWeight: "bold",
    marginBottom: 5,
  },
  productDetails: {
    color: "#CCC",
  },
  editButton: {
    backgroundColor: "red",
    padding: 8,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  editButtonText: {
    color: "#FFF",
    fontWeight: "bold",
  },
  deleteButton: {
    backgroundColor: "#444",
    padding: 8,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 5,
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
    color:"#FFF"
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
