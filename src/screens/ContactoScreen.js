import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const ContactoScreen = () => {
    const navigation = useNavigation();

    const contactos = [
        { nombre: 'Nelson Avellaneda', telefono: '+57 315 8547 6587', cargo: 'Desarrollador Web' },
        { nombre: 'Jorge Barrero', telefono: '+57 321 4521 9854', cargo: 'Gerente General' },
        { nombre: 'Diego Pirazan', telefono: '+57 313 4215 7741', cargo: 'Gerente de Logística' },
        { nombre: 'Sebastian Arteaga', telefono: '+57 310 7102 5562', cargo: 'Gerente de Ventas' }
    ];

    const enviarCorreo = () => {
        Linking.openURL('mailto:nas061206@gmail.com?subject=Consulta&body=Hola, quisiera más información.');
    };

    const enviarWhatsApp = () => {
        Linking.openURL('https://wa.me/3133816381?text=Hola, quisiera más información.');
    };

    return (
        <View style={styles.container}>
            {/* Botón de Volver */}
            <TouchableOpacity style={styles.botonVolver} onPress={() => navigation.navigate('Cliente')}>
                <Ionicons name="arrow-back" size={24} color="white" />
                <Text style={styles.textoVolver}>Volver</Text>
            </TouchableOpacity>

            <Text style={styles.titulo}>Contáctanos</Text>

            <View style={styles.contactosContainer}>
                {contactos.map((contacto, index) => (
                    <View key={index} style={styles.contactoCard}>
                        <Text style={styles.nombre}>{contacto.nombre}</Text>
                        <Text style={styles.cargo}>{contacto.cargo}</Text>
                        <Text style={styles.telefono}>{contacto.telefono}</Text>
                    </View>
                ))}
            </View>

            <Text style={styles.subtitulo}>También puedes escribirnos:</Text>

            <View style={styles.botonesContainer}>
                <TouchableOpacity style={styles.boton} onPress={enviarCorreo}>
                    <FontAwesome name="envelope" size={24} color="#FF9800" />
                    <Text style={styles.botonTexto}>Correo</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.boton, styles.whatsapp]} onPress={enviarWhatsApp}>
                    <FontAwesome name="whatsapp" size={24} color="#4CAF50" />
                    <Text style={styles.botonTexto}>WhatsApp</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        paddingTop: 50,
    },
    botonVolver: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'black',
        padding: 12,
        borderRadius: 8,
        alignSelf: 'flex-start',
        marginLeft: 20,
    },
    textoVolver: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 8,
    },
    titulo: {
        fontSize: 28,
        fontWeight: 'bold',
        color: 'black',
        marginVertical: 20,
    },
    contactosContainer: {
        width: '90%',
        alignItems: 'center',
    },
    contactoCard: {
        backgroundColor: 'white',
        padding: 15,
        width: '100%',
        borderRadius: 10,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: 'black',
        alignItems: 'center',
    },
    nombre: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
    },
    cargo: {
        fontSize: 16,
        color: '#555',
    },
    telefono: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
        marginTop: 5,
    },
    subtitulo: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
        marginTop: 20,
        marginBottom: 10,
    },
    botonesContainer: {
        flexDirection: 'row',
        gap: 20,
    },
    boton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'black',
        padding: 12,
        borderRadius: 8,
        width: 130,
        justifyContent: 'center',
    },
    whatsapp: {
        backgroundColor: 'black',
    },
    botonTexto: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 8,
    },
});

export default ContactoScreen;
