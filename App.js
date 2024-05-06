import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, Image  } from 'react-native';
import HomeScreen from './pages/home';

export default function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    if (username === 'mibzar' || username === 'Mibzar' && password === '123123') {
      console.log('Usuario autenticado');
      setLoggedIn(true);
    } else {
      console.log('Credenciales incorrectas');
    }
  };
  if (loggedIn) {
    return <HomeScreen />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Grupo Garza Limon</Text>
      <Image
        source={require('./img/logo.png')} // Asegúrate de colocar la ruta correcta de tu imagen
        style={styles.image}
      />
      <Text style={styles.subtitle}>Test created by Mibzar Galarza</Text>
      <Text style={styles.label}>Usuario:</Text>
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={text => setUsername(text)}
        placeholder="Introduce tu usuario"
      />
      <Text style={styles.label}>Contraseña:</Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={text => setPassword(text)}
        secureTextEntry={true}
        placeholder="Introduce tu contraseña"
      />
      <Button title="Iniciar sesión" onPress={handleLogin} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 30
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 50,
    marginTop: 30
  },
});
