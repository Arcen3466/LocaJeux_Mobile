import React, { useEffect, useState } from 'react';
import { View, Text, Image, Button, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { firestore } from '../firebase';

const Home = () => {
  const [locations, setLocations] = useState([]);
  // const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    try {
      const locationsRef = firestore.collection('LOCATIONS');
      const snapshot = await locationsRef.get();   
      const data = snapshot.docs.map((doc) => doc.data()); 
      setLocations(data);
    } catch (error) {
      console.error('Erreur lors de la récupération des locations :', error);
    }
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
      <Text>Bonjour</Text>
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
