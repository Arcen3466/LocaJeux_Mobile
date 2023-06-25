import React, { useEffect, useState } from 'react';
import { View, Text, Image, Button, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { firestore, auth } from '../firebase';
import { useNavigation } from '@react-navigation/native'; // Importez le hook useNavigation

const Home = () => {
  // const [refreshing, setRefreshing] = useState(false);
  const [locations, setLocations] = useState([]); // État pour stocker les emplacements
  const navigation = useNavigation(); // Utilisation du hook useNavigation pour la navigation

  useEffect(() => {
    fetchLocations(); // Appel de la fonction fetchLocations au chargement du composant
  }, []);

  // Fonction pour récupérer les emplacements depuis Firestore
  const fetchLocations = async () => {
    try {
      const locationsRef = firestore.collection('LOCATIONS'); // Référence à la collection "LOCATIONS" dans Firestore
      const snapshot = await locationsRef.get(); // Obtention des documents de la collection
      const data = snapshot.docs.map((doc) => doc.data()); // Récupération des données des documents
      setLocations(data); // Mise à jour de l'état "locations" avec les données récupérées
    } catch (error) {
      console.error('Erreur lors de la récupération des locations :', error);
    }
  };

  // Fonction pour gérer la déconnexion de l'utilisateur
  const handleLogout = () => {
    auth.signOut() // Déconnexion de l'utilisateur
        .then(() => {
          console.log('Utilisateur déconnecté avec succès');
          navigation.navigate('Login'); // Naviguer vers la page de connexion après la déconnexion
          // Ajoutez ici le code supplémentaire que vous souhaitez exécuter après la déconnexion
        })
        .catch((error) => {
          console.error('Erreur lors de la déconnexion :', error);
        });
  };


  // const handleReservation = async (locationId) => {
  //   const locationRef = firestore.collection('LOCATIONS').doc(locationId);

  //   try {
  //     await locationRef.update({ disponible: false });

  //     setLocations((prevLocations) =>
  //       prevLocations.map((location) =>
  //         location.id === locationId ? { ...location, disponible: false } : location
  //       )
  //     );

  //     console.log('L\'article a été réservé avec succès');
  //   } catch (error) {
  //     console.error('Erreur lors de la réservation de l\'article :', error);
  //   }
  // };

  // const onRefresh = () => {
  //   setRefreshing(true);
  //   fetchLocations()
  //     .then(() => setRefreshing(false))
  //     .catch(() => setRefreshing(false));
  // };

  return (
      <ScrollView
          contentContainerStyle={styles.container}
          // refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        {locations.map((location) => (
            <View style={styles.locationCard} key={location.id}>
              <Image source={{ uri: location.photo }} style={styles.locationImage} />
              <Text style={styles.locationName}>{location.nom}</Text>
              <Text style={styles.locationDescription}>{location.description}</Text>
              <Text style={styles.locationDescription}>{location.localisation}</Text>
              <Text style={styles.locationPrice}>{location.prix} €</Text>
              {location.disponible && (
                  <Button
                      title="Réserver"
                      // onPress={() => handleReservation(location.id)}
                      color="#841584"
                  />
              )}
            </View>
        ))}
        <Button title="Déconnexion" onPress={handleLogout} color="#FF0000" />
      </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  locationCard: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
  },
  locationImage: {
    width: 200,
    height: 200,
    marginBottom: 10,
  },
  locationName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  locationDescription: {
    marginBottom: 5,
  },
  locationPrice: {
    marginBottom: 5,
    fontWeight: 'bold',
  },
});

export default Home;
