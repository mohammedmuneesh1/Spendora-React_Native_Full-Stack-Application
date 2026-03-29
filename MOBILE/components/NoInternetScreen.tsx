import { View, Text, TouchableOpacity } from "react-native";

const NoInternetScreen = ({ onRetry }: any) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 30,
      }}
    >
      <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 10 }}>
        No Internet
      </Text>

      <Text style={{ textAlign: "center", marginBottom: 20 }}>
        Your internet connection seems to be offline.
        Please check your connection.
      </Text>

      <TouchableOpacity
        onPress={onRetry}
        style={{
          backgroundColor: "#4CAF50",
          paddingHorizontal: 20,
          paddingVertical: 12,
          borderRadius: 8,
        }}
      >
        <Text style={{ color: "white", fontWeight: "bold" }}>Retry</Text>
      </TouchableOpacity>
    </View>
  );
};

export default NoInternetScreen;