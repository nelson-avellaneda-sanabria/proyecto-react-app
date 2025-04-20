import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ImageBackground } from 'react-native';

const InicioScreen = ({ navigation }) => {
    return (
        <ImageBackground source={require('../../assets/ROPA.jpg')} style={styles.background}>
            <SafeAreaView style={styles.container}>
                <View style={styles.overlay}>
                    <Text style={styles.logo}>Corpfresh</Text>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
                        <Text style={styles.buttonText}>Iniciar sesión</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: 'cover',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 30,
    },
    logo: {
        fontSize: 32,
        fontStyle: 'italic',
        fontWeight: '600',
        color: '#ffffff',
        marginBottom: 30,
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: { width: 1, height: 2 },
        textShadowRadius: 4,
    },
    button: {
        backgroundColor: '#ffffffcc',
        paddingVertical: 10,
        paddingHorizontal: 25,
        borderRadius: 18,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#1e1e1e',
    },
});

export default InicioScreen;
