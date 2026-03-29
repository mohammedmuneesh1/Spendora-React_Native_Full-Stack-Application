import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal, FlatList, StyleSheet } from "react-native";
import { useTheme } from "@/context/ThemeContext";
import { THEMES } from "@/assets/styles/colors";
import { Ionicons } from "@expo/vector-icons";

const ThemeDropdown = () => {
  const { themeName, setThemeName, theme } = useTheme();
  const [visible, setVisible] = useState(false);

  const themeOptions = Object.keys(THEMES);

  const selectTheme = (name: any) => {
    setThemeName(name);
    setVisible(false);
  };

  return (
    <View>
      {/* Dropdown Button */}
      <TouchableOpacity
          style={[
    styles.button,
    {
      backgroundColor: theme.primary,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
  ]}
        onPress={() => setVisible(true)}
      >
        <Text style={styles.buttonText}>{themeName === "coffee" ? "Select Theme" : themeName}</Text>
          <Ionicons name="chevron-down" size={18} color={theme.white} />
      </TouchableOpacity>

      {/* Modal Dropdown */}
      <Modal visible={visible} transparent animationType="fade">
        <TouchableOpacity
          style={styles.overlay}
          onPress={() => setVisible(false)}
        >
          <View style={[styles.dropdown, { backgroundColor: theme.card }]}>
            <FlatList
              data={themeOptions}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.item}
                  onPress={() => selectTheme(item)}
                >
                  <Text style={{ color: theme.text }}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default ThemeDropdown;

const styles = StyleSheet.create({
  button: {
    padding: 12,
    borderRadius: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  dropdown: {
    width: 200,
    borderRadius: 10,
    padding: 10,
  },
  item: {
    padding: 12,
  },
});