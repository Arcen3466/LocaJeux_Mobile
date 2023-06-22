import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { auth,signInAnonymously,signInWithEmailAndPassword } from '../firebase'; // Importez l'objet d'authentification Firebase
import { useNavigation } from '@react-navigation/native'; // Importez le hook useNavigation

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Connexion réussie
        // console.log('Utilisateur connecté :', userCredential.user);        
        navigation.navigate('Home'); // Naviguer vers la page d'accueil après une connexion réussie
        // Ajoutez ici le code supplémentaire que vous souhaitez exécuter après une connexion réussie
      })
      .catch((error) => {
        // Erreur de connexion
        console.log('Erreur de connexion :', error);
      });
  };
  

  const testFirebaseConnection = () => {
    console.log('Tentative de connexion à Firebase...');
    signInAnonymously(auth)
      .then(() => {
        console.log('Connexion à Firebase réussie !');
        // Vous pouvez ajouter ici le code supplémentaire que vous souhaitez exécuter après la connexion réussie
      })
      .catch((error) => {
        console.log('Erreur de connexion à Firebase :', error);
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
        onChangeText={text =>setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        value={password}
        onChangeText={text =>setPassword(text)}
        secureTextEntry
      />
      <Button title="Se connecter" onPress={handleLogin} />
      <Button title="S'inscrire" onPress={handleRegister} />
      {/* <Button title="Tester la connexion Firebase" onPress={testFirebaseConnection} /> */}
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
});

export default Login;
