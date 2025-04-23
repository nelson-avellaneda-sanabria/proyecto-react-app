import React, { useState, useEffect } from "react";
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from "react-native";

const ProductosScreen = () => {
  const [productos, setProductos] = useState([]);
  const [pagina, setPagina] = useState(1);
  const [busqueda, setBusqueda] = useState("");
  const productosPorPagina = 10;

  useEffect(() => {
    fetch('http://192.168.137.158/inventario_app/buscar_productos.php')
      .then((response) => response.json())
      .then((data) => setProductos(data))
      .catch((error) => console.error("Error al obtener productos:", error));
  }, []);

  const productosFiltrados = productos.filter((producto) =>
    producto.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  const inicio = (pagina - 1) * productosPorPagina;
  const productosPaginados = productosFiltrados.slice(inicio, inicio + productosPorPagina);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar producto..."
        placeholderTextColor="#666"
        value={busqueda}
        onChangeText={setBusqueda}
      />

      <FlatList
        data={productosPaginados}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.productName}>{item.nombre}</Text>
            <Text style={styles.productStock}>Stock: {item.stock}</Text>
          </View>
        )}
      />

      <View style={styles.paginationContainer}>
        <TouchableOpacity
          onPress={() => setPagina(pagina - 1)}
          disabled={pagina === 1}
          style={[styles.paginationButton, pagina === 1 && styles.disabledButton]}
        >
          <Text style={styles.paginationText}>{"<"}</Text>
        </TouchableOpacity>

        <Text style={styles.paginationText}>{pagina}</Text>

        <TouchableOpacity
          onPress={() => setPagina(pagina + 1)}
          disabled={inicio + productosPorPagina >= productosFiltrados.length}
          style={[
            styles.paginationButton,
            inicio + productosPorPagina >= productosFiltrados.length && styles.disabledButton,
          ]}
        >
          <Text style={styles.paginationText}>{">"}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    alignItems: "center",
    paddingTop: 50,
    paddingHorizontal: 10,
  },
  searchInput: {
    width: "90%",
    backgroundColor: "#EEE",
    padding: 14,
    borderRadius: 10,
    fontSize: 16,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#CCC",
    color: "#000",
  },
  listContainer: {
    width: "100%",
    paddingBottom: 40,
  },
  card: {
    width: "45%",
    backgroundColor: "#F5F5F5",
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#AAA",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    marginBottom: 20,
    marginHorizontal: 5,
  },
  productName: {
    color: "#333",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 5,
  },
  productStock: {
    color: "#555",
    fontSize: 14,
    fontWeight: "500",
  },
  paginationContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    padding: 10,
    backgroundColor: "#EEE",
    borderRadius: 10,
  },
  paginationText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginHorizontal: 10,
  },
  paginationButton: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 5,
    backgroundColor: "#DDD",
    marginHorizontal: 5,
  },
  disabledButton: {
    backgroundColor: "#CCC",
  },
});

export default ProductosScreen;
