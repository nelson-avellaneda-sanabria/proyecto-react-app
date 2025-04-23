import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Importación de pantallas
import InicioScreen from './src/screens/InicioScreen';
import LoginScreen from './src/screens/LoginScreen';
import RegistroScreen from './src/screens/RegistroScreen';
import InventarioScreen from './src/screens/InventarioScreen';
import EditorInventarioScreen from './src/screens/EditorInventarioScreen';
import BuscadorScreen from './src/screens/BuscadorScreen';
import ClienteScreen from './src/screens/ClienteScreen';
import CarritoScreen from './src/screens/CarritoScreen';
import ContactoScreen from './src/screens/ContactoScreen';
import NosotrosScreen from './src/screens/NosotrosScreen';
import OpcionesScreen from './src/screens/OpcionesScreen';
import DetalleProductoScreen from './src/screens/DetalleProductoScreen';
import Buscarproducto from './src/screens/BuscarProducto';
import PagoScreen from './src/screens/PagoScreen';
import PagoNequiScreen from './src/screens/PagoNequiScreen';
import PagoEnCasaScreen from './src/screens/PagoEnCasaScreen';

const Stack = createStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Inicio" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Inicio" component={InicioScreen} />
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Registro" component={RegistroScreen} />
                <Stack.Screen name="Inventario" component={InventarioScreen} />
                <Stack.Screen name="EditorInventario" component={EditorInventarioScreen} />
                <Stack.Screen name="Buscador" component={BuscadorScreen} />
                <Stack.Screen name="Cliente" component={ClienteScreen} />
                <Stack.Screen name="Carrito" component={CarritoScreen} />
                <Stack.Screen name="Contactanos" component={ContactoScreen} />
                <Stack.Screen name="Nosotros" component={NosotrosScreen} />
                <Stack.Screen name="Opciones" component={OpcionesScreen} />
                <Stack.Screen name="DetalleProducto" component={DetalleProductoScreen} />
                <Stack.Screen name="Buscar" component={Buscarproducto} />
                <Stack.Screen name="Pago" component={PagoScreen} />
                <Stack.Screen name="PagoNequi" component={PagoNequiScreen} />
                <Stack.Screen name="PagoEnCasa" component={PagoEnCasaScreen} />

            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;