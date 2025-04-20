import React, { useState, useEffect } from "react";
import { View, Text, TextInput, FlatList, TouchableOpacity, ImageBackground, StyleSheet } from "react-native";

const ProductosScreen = () => {
  const [productos, setProductos] = useState([]);
  const [pagina, setPagina] = useState(1);
  const [busqueda, setBusqueda] = useState("");
  const productosPorPagina = 10;

  useEffect(() => {
    fetch('http://10.0.2.2/inventario_app/buscar_productos.php')
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
    <ImageBackground source={require("../../assets/ROPA.jpg")} style={styles.fondo}>
      <View style={styles.overlay} />
      <View style={styles.container}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar producto..."
          placeholderTextColor="#AAA"
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
            style={[styles.paginationButton, inicio + productosPorPagina >= productosFiltrados.length && styles.disabledButton]}
          >
            <Text style={styles.paginationText}>{">"}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  fondo: {
    flex: 1,
    resizeMode: "cover",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 50,
    paddingHorizontal: 10,
  },
  searchInput: {
    width: "90%",
    backgroundColor: "#333",
    padding: 14,
    borderRadius: 10,
    fontSize: 16,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#555",
    color: "#FFF",
  },
  listContainer: {
    width: "100%",
    paddingBottom: 40, // Aumenté el espacio abajo
  },
  card: {
    width: "45%", // Ajustado para que haya espacio
    backgroundColor: "#222",
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
    marginBottom: 20, // Más espacio entre filas
    marginHorizontal: 5, // Más espacio entre columnas
  },
  productName: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 5,
  },
  productStock: {
    color: "#DDD",
    fontSize: 14,
    fontWeight: "500",
  },
  paginationContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    padding: 10,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    borderRadius: 10,
  },
  paginationText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFF",
    marginHorizontal: 10,
  },
  paginationButton: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 5,
    backgroundColor: "#444",
    marginHorizontal: 5,
  },
  disabledButton: {
    backgroundColor: "#666",
  },
});

export default ProductosScreen;
