import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { auth, signInWithEmailAndPassword } from '../firebase'; // Importez l'objet d'authentification Firebase
import { useNavigation } from '@react-navigation/native'; // Importez le hook useNavigation

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigation = useNavigation();

  // Fonction de check de champ et de connexion
  const handleLogin = () => {
    if (email === '' || password === '') {
      setError('Veuillez remplir tous les champs'); // Vérification des champs vides
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Connexion réussie
          navigation.navigate('Home'); // Naviguer vers la page d'accueil après une connexion réussie
          // Ajoutez ici le code supplémentaire que vous souhaitez exécuter après une connexion réussie
        })
        .catch((error) => {
          // Erreur de connexion
          setError('Erreur de connexion'); // Affichage de l'erreur de connexion
          console.log('Erreur de connexion :', error);
        });
  };

  const handleRegister = () => {
    navigation.navigate('Register');
  };

  return (
      <View style={styles.container}>
        <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
        />
        <TextInput
            style={styles.input}
            placeholder="Mot de passe"
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry
        />
        <Button title="Se connecter" onPress={handleLogin} />

        {error !== '' && <Text style={styles.error}>{error}</Text>}
        <Button title="S'inscrire" onPress={handleRegister} />
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    width: '100%',
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});

export default Login;
