// PagoEnCasaScreen.js
import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, TextInput,
  ScrollView, Alert, ActivityIndicator
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PagoEnCasaScreen = ({ route, navigation }) => {
  const { productos, total } = route.params;

  const [direccion, setDireccion] = useState('');
  const [telefono1, setTelefono1] = useState('');
  const [telefono2, setTelefono2] = useState('');
  const [cargando, setCargando] = useState(false);

  const validarFormulario = () => {
    if (!direccion.trim()) {
      Alert.alert('Error', 'La dirección es obligatoria');
      return false;
    }
    if (!telefono1.trim()) {
      Alert.alert('Error', 'Al menos un teléfono de contacto es obligatorio');
      return false;
    }
    return true;
  };

  const procesarPago = async () => {
    if (!validarFormulario()) return;

    setCargando(true);
    const id_usuario = await AsyncStorage.getItem('id_usuario');
    const descripcion = productos.map(p => p.nombre).join(', ');

    const formData = new URLSearchParams();
    formData.append('id_usuario', id_usuario);
    formData.append('descripcion', descripcion);
    formData.append('total', total);
    formData.append('metodo_pago', 'en casa');
    formData.append('direccion', direccion);
    formData.append('telefono1', telefono1);
    formData.append('telefono2', telefono2 || '');

    try {
      const response = await fetch('http://10.0.2.2/inventario_app/registrar_pago.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formData.toString(),
      });

      const responseText = await response.text();

      try {
        const data = JSON.parse(responseText);

        if (data.success) {
          Alert.alert(
            'Pago registrado',
            `Tu pedido #${data.id_pedido} ha sido registrado. Te contactaremos para coordinar la entrega y pago.`,
            [
              {
                text: 'Ver mis pedidos',
                onPress: () => navigation.navigate('MisPedidos')
              },
              {
                text: 'Volver al inicio',
                onPress: () => navigation.navigate('Inicio')
              }
            ]
          );
        } else {
          Alert.alert('Error', data.message || 'Hubo un problema al registrar el pago');
        }
      } catch (jsonError) {
        console.error('Error al parsear JSON:', jsonError, responseText);
        Alert.alert('Error', 'La respuesta del servidor no es válida');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      Alert.alert('Error de conexión', 'No se pudo contactar con el servidor');
    } finally {
      setCargando(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titulo}>Pago en Casa</Text>

      <View style={styles.infoContainer}>
        <Text style={styles.subtitulo}>Resumen de compra:</Text>
        <Text style={styles.texto}>Productos: {productos.map(p => p.nombre).join(', ')}</Text>
        <Text style={styles.total}>Total: ${total.toFixed(2)}</Text>
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.subtitulo}>Información de entrega:</Text>

        <Text style={styles.label}>Dirección de entrega*</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej: Calle 123 #45-67, Apto 101, Barrio"
          value={direccion}
          onChangeText={setDireccion}
          multiline
        />

        <Text style={styles.label}>Teléfono de contacto 1*</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej: 3001234567"
          value={telefono1}
          onChangeText={setTelefono1}
          keyboardType="phone-pad"
        />

        <Text style={styles.label}>Teléfono de contacto 2 (opcional)</Text>
        <TextInput
          style={styles.input}
          placeholder="Teléfono alternativo"
          value={telefono2}
          onChangeText={setTelefono2}
          keyboardType="phone-pad"
        />
      </View>

      <TouchableOpacity
        style={styles.botonNegro}
        onPress={procesarPago}
        disabled={cargando}
      >
        {cargando ? (
          <ActivityIndicator color="#FFF" />
        ) : (
          <Text style={styles.botonTexto}>Confirmar Pedido</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.botonNegro, {backgroundColor: '#333', marginTop: 10}]}
        onPress={() => navigation.goBack()}
        disabled={cargando}
      >
        <Text style={styles.botonTexto}>Cancelar</Text>
      </TouchableOpacity>

      <Text style={styles.nota}>
        * Al confirmar tu pedido, nos pondremos en contacto contigo para coordinar la entrega y el pago.
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF', padding: 20 },
  titulo: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginVertical: 20 },
  subtitulo: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  infoContainer: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20
  },
  formContainer: { marginBottom: 20 },
  texto: { fontSize: 16, marginBottom: 5 },
  total: { fontSize: 18, fontWeight: 'bold', color: '#333', marginTop: 5 },
  label: { fontSize: 16, marginBottom: 5, color: '#333' },
  input: {
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
    fontSize: 16
  },
  botonNegro: {
    backgroundColor: '#000',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50
  },
  botonTexto: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
  nota: { fontSize: 14, color: '#666', marginTop: 20, textAlign: 'center', fontStyle: 'italic' }
});

export default PagoEnCasaScreen;