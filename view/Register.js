import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { createUserWithEmailAndPassword, auth } from '../firebase';

const Register = ({ navigation }) => {
  const [email, setEmail] = useState(''); // État pour stocker la valeur de l'email
  const [password, setPassword] = useState(''); // État pour stocker la valeur du mot de passe
  const [confirmPassword, setConfirmPassword] = useState(''); // État pour stocker la valeur de la confirmation du mot de passe
  const [error, setError] = useState(''); // État pour stocker les erreurs

    // Fonction de check de champ et d'inscription
  const handleRegister = () => {
    if (email === '' || password === '' || confirmPassword === '') {
      setError('Veuillez remplir tous les champs'); // Vérification si tous les champs sont remplis, sinon affiche une erreur
      return;
    }

    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas'); // Vérification si les mots de passe correspondent, sinon affiche une erreur
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          console.log('Utilisateur inscrit :', userCredential.user); // Affichage de l'utilisateur inscrit dans la console
          // Ajoutez ici le code supplémentaire que vous souhaitez exécuter après une inscription réussie
        })
        .catch((error) => {
          // Erreur d'inscription
          console.log('Erreur d\'inscription :', error); // Affichage de l'erreur d'inscription dans la console
        });
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
        <TextInput
            style={styles.input}
            placeholder="Confirmation de mot de passe"
            value={confirmPassword}
            onChangeText={(text) => setConfirmPassword(text)}
            secureTextEntry
        />
        <Button
            title="S'inscrire"
            onPress={handleRegister}
            color="#1565c0"
        />

        {error !== '' && <Text style={styles.error}>{error}</Text>}
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  input: {
    width: '80%',
    height: 40,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});

export default Register;
