import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { initSupabase } from "@senevent/shared";

initSupabase(
  process.env.EXPO_PUBLIC_SUPABASE_URL,
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY
);

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.titre}>SénEvent Mobile</Text>
      <Text style={styles.sousTitre}>Événements à Dakar</Text>
      <Text style={styles.auteur}>Réalisé par Mouhamed Fall</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  titre: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1a3a5c",
  },
  sousTitre: {
    fontSize: 16,
    color: "#ea7d2b",
    marginTop: 8,
  },
  auteur: {
    fontSize: 12,
    color: "#999",
    marginTop: 20,
  },
});
