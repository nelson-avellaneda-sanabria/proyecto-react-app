// PagoNequiScreen.js
import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, TextInput,
  Image, ScrollView, Alert, ActivityIndicator
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PagoNequiScreen = ({ route, navigation }) => {
  const { productos, total } = route.params;

  const [telefono, setTelefono] = useState('');
  const [referencia, setReferencia] = useState('');
  const [cargando, setCargando] = useState(false);
  const [codigoPago, setCodigoPago] = useState('');
  const [etapaPago, setEtapaPago] = useState(1); // 1: Formulario, 2: Confirmación

  // Genera un código de transacción aleatorio de 6 dígitos
  const generarCodigoAleatorio = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const validarFormulario = () => {
    if (!telefono.trim() || telefono.length < 10) {
      Alert.alert('Error', 'Ingresa un número de teléfono Nequi válido (10 dígitos)');
      return false;
    }
    return true;
  };

  const solicitarPago = async () => {
    if (!validarFormulario()) return;

    setCargando(true);
    // Simular la solicitud a la API de Nequi
    setTimeout(() => {
      const codigo = generarCodigoAleatorio();
      setCodigoPago(codigo);
      setEtapaPago(2);
      setCargando(false);
    }, 2000); // Simular tiempo de procesamiento
  };

  const confirmarPago = async () => {
    setCargando(true);
    const id_usuario = await AsyncStorage.getItem('id_usuario');
    const descripcion = productos.map(p => p.nombre).join(', ');

    // Preparar datos para el servidor
    const formData = new URLSearchParams();
    formData.append('id_usuario', id_usuario);
    formData.append('descripcion', descripcion);
    formData.append('total', total);
    formData.append('metodo_pago', 'Nequi');
    formData.append('telefono_nequi', telefono);
    formData.append('codigo_pago', codigoPago);
    formData.append('referencia', referencia);

    try {
      const response = await fetch('http://192.168.137.158/inventario_app/registrar_pago.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formData.toString(),
      });

      // Procesar respuesta
      const responseText = await response.text();

      try {
        const data = JSON.parse(responseText);

        if (data.success) {
          Alert.alert(
            'Pago Exitoso',
            `Tu pedido #${data.id_pedido} ha sido confirmado y pagado con Nequi.`,
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
          Alert.alert('Error', data.message || 'No se pudo procesar el pago');
          setEtapaPago(1); // Volver al formulario inicial
        }
      } catch (jsonError) {
        console.error('Error al parsear JSON:', jsonError, responseText);
        Alert.alert('Error', 'La respuesta del servidor no es válida');
        setEtapaPago(1);
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      Alert.alert('Error de conexión', 'No se pudo contactar con el servidor');
      setEtapaPago(1);
    } finally {
      setCargando(false);
    }
  };

  // Renderizar formulario inicial de pago Nequi
  const renderFormulario = () => (
    <View style={styles.formContainer}>
      <Text style={styles.subtitulo}>Datos de pago con Nequi:</Text>

      <Text style={styles.label}>Número de teléfono Nequi</Text>
      <TextInput
        style={styles.input}
        placeholder="Ejemplo: 3001234567"
        value={telefono}
        onChangeText={setTelefono}
        keyboardType="phone-pad"
        maxLength={10}
      />

      <Text style={styles.label}>Referencia (opcional)</Text>
      <TextInput
        style={styles.input}
        placeholder="Referencia de pago"
        value={referencia}
        onChangeText={setReferencia}
      />

      <TouchableOpacity
        style={styles.botonNequi}
        onPress={solicitarPago}
        disabled={cargando}
      >
        {cargando ? (
          <ActivityIndicator color="#FFF" />
        ) : (
          <>
            <Text style={styles.botonTexto}>Solicitar Pago Nequi</Text>
          </>
        )}
      </TouchableOpacity>
    </View>
  );

  // Renderizar pantalla de confirmación de pago
  const renderConfirmacion = () => (
    <View style={styles.confirmacionContainer}>
      <Text style={styles.subtitulo}>Confirma tu pago</Text>

      <View style={styles.codigoContainer}>
        <Text style={styles.codigoLabel}>Código de pago:</Text>
        <Text style={styles.codigoValor}>{codigoPago}</Text>
      </View>

      <Text style={styles.instrucciones}>
        Abre tu app de Nequi, autoriza el pago y luego presiona el botón "He pagado" a continuación.
      </Text>

      <TouchableOpacity
        style={styles.botonNequi}
        onPress={confirmarPago}
        disabled={cargando}
      >
        {cargando ? (
          <ActivityIndicator color="#FFF" />
        ) : (
          <Text style={styles.botonTexto}>He pagado</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.botonNegro, {backgroundColor: '#666', marginTop: 10}]}
        onPress={() => setEtapaPago(1)}
        disabled={cargando}
      >
        <Text style={styles.botonTexto}>Cancelar</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titulo}>Pago con Nequi</Text>

      <View style={styles.infoContainer}>
        <Image
          source={{ uri: 'https://logos-marcas.com/wp-content/uploads/2021/08/Nequi-Logo.png' }}
          style={styles.logoNequi}
          resizeMode="contain"
        />
        <Text style={styles.subtitulo}>Resumen de compra:</Text>
        <Text style={styles.texto}>Productos: {productos.map(p => p.nombre).join(', ')}</Text>
        <Text style={styles.total}>Total a pagar: ${total.toFixed(2)}</Text>
      </View>

      {etapaPago === 1 ? renderFormulario() : renderConfirmacion()}

      {etapaPago === 1 && (
        <TouchableOpacity
          style={[styles.botonNegro, {backgroundColor: '#333', marginTop: 10}]}
          onPress={() => navigation.goBack()}
          disabled={cargando}
        >
          <Text style={styles.botonTexto}>Cancelar</Text>
        </TouchableOpacity>
      )}

      <Text style={styles.nota}>
        * Este proceso simula una integración con Nequi. En una implementación real,
        se requeriría la integración con la API oficial de Nequi.
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
    marginBottom: 20,
    alignItems: 'center'
  },
  logoNequi: {
    width: 120,
    height: 60,
    marginBottom: 15
  },
  formContainer: { marginBottom: 20 },
  confirmacionContainer: {
    marginVertical: 20,
    alignItems: 'center'
  },
  codigoContainer: {
    backgroundColor: '#f0f8ff',
    padding: 15,
    borderRadius: 10,
    marginVertical: 20,
    alignItems: 'center',
    width: '100%'
  },
  codigoLabel: {
    fontSize: 16,
    color: '#333'
  },
  codigoValor: {
    fontSize: 32,
    fontWeight: 'bold',
    letterSpacing: 5,
    marginTop: 10,
    color: '#4b0082'
  },
  instrucciones: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 22
  },
  texto: { fontSize: 16, marginBottom: 5, textAlign: 'center' },
  total: { fontSize: 18, fontWeight: 'bold', color: '#333', marginTop: 5 },
  label: { fontSize: 16, marginBottom: 5, color: '#333' },
  input: {
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
    fontSize: 16
  },
  botonNequi: {
    backgroundColor: '#210049',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    height: 50
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

export default PagoNequiScreen;