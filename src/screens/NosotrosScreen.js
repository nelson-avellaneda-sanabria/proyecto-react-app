import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const NosotrosScreen = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            {/* Botón de Volver */}
            <TouchableOpacity style={styles.botonVolver} onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={24} color="white" />
                <Text style={styles.textoVolver}>Volver</Text>
            </TouchableOpacity>

            <View style={styles.content}>
                <Text style={styles.titulo}>Sobre Nosotros</Text>

                <View style={styles.descripcionContainer}>
                    <Text style={styles.descripcion}>
                        En CorpFreshh, redefinimos la moda online. Fundada en 2024, nuestra misión
                        es brindarte ropa moderna, versátil y de alta calidad, diseñada para
                        potenciar tu estilo y confianza. 💎✨
                    </Text>
                    <Text style={styles.descripcion}>
                        Creemos que vestirse bien es una forma de expresión, por eso te ofrecemos
                        las últimas tendencias, con envíos rápidos y un servicio excepcional.
                        ¡Bienvenido a la nueva era del estilo! 🚀🔥
                    </Text>
                </View>
            </View>


            <Text style={styles.footer}>CorpFreshh 2025 - Todos los derechos reservados</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        paddingTop: 50,
        justifyContent: 'space-between',
    },
    botonVolver: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        top: 60,
        left: 20,
        backgroundColor: '#007AFF',
        padding: 12,
        borderRadius: 8,
        elevation: 3,
    },
    textoVolver: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 8,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '90%',
    },
    titulo: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#000000',
        marginBottom: 20,
        textAlign: 'center',
    },
    descripcionContainer: {
        backgroundColor: '#f5f5f5',
        padding: 20,
        borderRadius: 15,
        elevation: 5,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 5,
        width: '100%',
    },
    descripcion: {
        fontSize: 18,
        color: '#333',
        textAlign: 'center',
        marginBottom: 10,
        lineHeight: 24,
    },
    footer: {
        fontSize: 14,
        color: '#777',
        textAlign: 'center',
        marginBottom: 20,
    },
});

export default NosotrosScreen;
