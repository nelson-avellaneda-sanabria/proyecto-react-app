import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Alert, StyleSheet, ImageBackground, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // 👈 AGREGA ESTO

const LoginScreen = () => {
    const [correo, setCorreo] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();

    const handleLogin = async () => {
        try {
            const response = await fetch('http://192.168.137.158/inventario_app/login.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ correo, password }),
            });

            const data = await response.json();

            if (data.success) {
                Alert.alert("Éxito", data.message);

                // 🧠 Guarda el ID del usuario en AsyncStorage
                await AsyncStorage.setItem('id_usuario', data.id_usuario.toString());

                // Redirigir según el rol
                if (data.rol === "admin") {
                    navigation.navigate('Inventario');
                } else if (data.rol === "cliente") {
                    navigation.navigate('Cliente');
                } else {
                    Alert.alert("Error", "Rol no reconocido.");
                }

            } else {
                Alert.alert("Error", data.message);
            }
        } catch (error) {
            Alert.alert("Error", "No se pudo conectar al servidor.");
        }
    };

    return (
        <ImageBackground source={require('../../assets/ROPA.jpg')} style={styles.background}>
            <View style={styles.overlay}>
                <View style={styles.container}>
                    <View style={styles.profileIcon}>
                        <Image source={require('../../assets/FONDO.jpg')} style={styles.logo} />
                    </View>

                    <Text style={styles.title}>Iniciar Sesión</Text>
                    <TextInput
                        style={styles.input}
                        value={correo}
                        onChangeText={setCorreo}
                        placeholder="Correo electrónico"
                        autoCapitalize="none"
                        placeholderTextColor="#999"
                    />
                    <TextInput
                        style={styles.input}
                        value={password}
                        onChangeText={setPassword}
                        placeholder="Contraseña"
                        secureTextEntry
                        placeholderTextColor="#999"
                    />
                    <TouchableOpacity style={styles.button} onPress={handleLogin}>
                        <Text style={styles.buttonText}>Ingresar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.registerButton} onPress={() => navigation.navigate('Registro')}>
                        <Text style={styles.registerButtonText}>Registrarse</Text>
                    </TouchableOpacity>
                </View>
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
        overflow: 'hidden',
        marginBottom: 20,
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
    registerButton: {
        marginTop: 15,
    },
    registerButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#007bff',
    },
});

export default LoginScreen;
