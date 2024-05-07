import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, Image, Pressable } from 'react-native';
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
      <Image
        source={require('./img/logo.png')}
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
      <Pressable style={styles.button} onPress={handleLogin}>
        <Text style={styles.text}>Iniciar sesión</Text>
      </Pressable>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:15,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#0A3978',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
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
