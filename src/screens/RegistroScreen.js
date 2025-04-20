import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Alert, ImageBackground, Image } from 'react-native';

const RegistroScreen = ({ navigation }) => {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [email, setEmail] = useState('');
    const [telefono, setTelefono] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = () => {
        if (!nombre || !apellido || !email || !telefono || !password) {
            Alert.alert('Error', 'Por favor completa todos los campos.');
            return;
        }

        fetch('http://10.0.2.2/inventario_app/registro.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre, apellido, correo: email, telefono, password }),
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    Alert.alert('Éxito', data.message, [{ text: 'OK', onPress: () => navigation.navigate('Login') }]);
                } else {
                    Alert.alert('Error', data.message);
                }
            })
            .catch(error => {
                console.error(error);
                Alert.alert('Error', 'Hubo un problema con la conexión.');
            });
    };

    return (
        <ImageBackground source={require('../../assets/ROPA.jpg')} style={styles.background}>
            <View style={styles.overlay}>
                <SafeAreaView style={styles.container}>
                    <ScrollView contentContainerStyle={styles.scrollContainer}>
                        <View style={styles.content}>
                            {/* Contenedor del logo en círculo con la imagen FONDO.JPG */}
                            <View style={styles.profileIcon}>
                                <Image source={require('../../assets/FONDO.jpg')} style={styles.logo} />
                            </View>

                            <Text style={styles.title}>Regístrate ahora</Text>

                            <TextInput
                                style={styles.input}
                                placeholder="Nombre"
                                placeholderTextColor="#999"
                                value={nombre}
                                onChangeText={setNombre}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Apellido"
                                placeholderTextColor="#999"
                                value={apellido}
                                onChangeText={setApellido}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Email"
                                placeholderTextColor="#999"
                                keyboardType="email-address"
                                value={email}
                                onChangeText={setEmail}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Teléfono"
                                placeholderTextColor="#999"
                                keyboardType="phone-pad"
                                value={telefono}
                                onChangeText={setTelefono}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Contraseña"
                                placeholderTextColor="#999"
                                secureTextEntry
                                value={password}
                                onChangeText={setPassword}
                            />

                            <TouchableOpacity style={styles.button} onPress={handleRegister}>
                                <Text style={styles.buttonText}>Registrar</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </SafeAreaView>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: 'cover',
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        width: '100%',
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        width: '90%',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        padding: 25,
        borderRadius: 15,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 8,
    },
    profileIcon: {
        width: 90,
        height: 90,
        borderRadius: 45,
        backgroundColor: '#444',
        marginBottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    logo: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        backgroundColor: '#f8f8f8',
        padding: 12,
        borderRadius: 10,
        marginBottom: 15,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    button: {
        backgroundColor: '#007bff',
        paddingVertical: 12,
        paddingHorizontal: 40,
        borderRadius: 25,
        elevation: 5,
        marginTop: 10,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },
});

export default RegistroScreen;
