import { View, Text, ActivityIndicator, StyleSheet, Image } from "react-native";
import { useTheme } from "@/context/ThemeContext";

const InternetCheckingScreen = () => {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={[styles.card, { backgroundColor: theme.card }]}>
        <Image
          source={require("../assets/custom/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />

        <Text style={[styles.title, { color: theme.text }]}>
          Connecting...
        </Text>

        <Text style={[styles.subtitle, { color: theme.textLight }]}>
          Checking internet connection
        </Text>

        <ActivityIndicator
          size="large"
          color={theme.primary}
          style={{ marginTop: 20 }}
        />
      </View>
    </View>
  );
};

export default InternetCheckingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    padding: 30,
    borderRadius: 20,
    alignItems: "center",
    width: "80%",
    elevation: 5,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    marginTop: 10,
  },
  subtitle: {
    fontSize: 14,
    marginTop: 5,
  },
});