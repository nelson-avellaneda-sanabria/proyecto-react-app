import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const OpcionesScreen = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            {/* Botón de Volver */}
            <TouchableOpacity style={styles.botonVolver} onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={24} color="white" />
                <Text style={styles.textoVolver}>Volver</Text>
            </TouchableOpacity>

            {/* Título */}
            <Text style={styles.titulo}>Opciones</Text>

            {/* Menú de opciones */}
            <View style={styles.menu}>
                <TouchableOpacity style={styles.opcion}>
                    <Ionicons name="person-outline" size={24} color="black" />
                    <Text style={styles.textoOpcion}>Perfil</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.opcion}>
                    <Ionicons name="settings-outline" size={24} color="black" />
                    <Text style={styles.textoOpcion}>Configuración</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.opcion}>
                    <Ionicons name="notifications-outline" size={24} color="black" />
                    <Text style={styles.textoOpcion}>Notificaciones</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.opcion}>
                    <Ionicons name="help-circle-outline" size={24} color="black" />
                    <Text style={styles.textoOpcion}>Ayuda</Text>
                </TouchableOpacity>
            </View>

            {/* Footer con derechos reservados */}
            <Text style={styles.footer}>© Corpfresh 2025 - Todos los derechos reservados</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white', // Fondo blanco
        paddingTop: 50,
        paddingHorizontal: 20,
    },
    botonVolver: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'black', // Botón negro
        padding: 12,
        borderRadius: 8,
        alignSelf: 'flex-start',
    },
    textoVolver: {
        color: 'white', // Texto blanco en el botón
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 8,
    },
    titulo: {
        fontSize: 28,
        fontWeight: 'bold',
        color: 'black', // Texto negro
        marginVertical: 20,
    },
    menu: {
        marginTop: 10,
    },
    opcion: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: 'black', // Separadores negros
    },
    textoOpcion: {
        fontSize: 18,
        color: 'black', // Texto negro
        marginLeft: 15,
    },
    footer: {
        position: 'absolute',
        bottom: 20,
        alignSelf: 'center',
        fontSize: 14,
        color: 'black', // Texto negro en el footer
    },
});

export default OpcionesScreen;
